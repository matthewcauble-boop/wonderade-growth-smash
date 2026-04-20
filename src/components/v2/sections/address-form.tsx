"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLoadScript } from "@react-google-maps/api"
import { MapPin } from "lucide-react"

const libraries = ["places"];

export function AddressForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams ? searchParams.get("email") : ""
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressDetails, setAddressDetails] = useState({ street: "", city: "", state: "", zip: "" })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])

    // Prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: libraries as any,
        version: "weekly"
    });

    const fetchNewSuggestions = async (input: string) => {
        setInputValue(input);
        if (!input || !window.google) {
            setSuggestions([]);
            return;
        }
        try {
            const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places") as any;
            const response = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
                input,
                includedRegionCodes: ["us"]
            });
            setSuggestions(response.suggestions || []);
        } catch (err) {
            console.error("V3 Maps Native Error:", err);
        }
    };

    const handleSelect = async (placeId: string, description: string) => {
        setInputValue(description);
        setSuggestions([]);
        
        try {
            const { Place } = await window.google.maps.importLibrary("places") as any;
            const place = new Place({ id: placeId });
            await place.fetchFields({ fields: ["addressComponents"] });
            
            let city = "";
            let state = "";
            let streetNumber = "";
            let route = "";
            let zip = "";

            place.addressComponents?.forEach((component: any) => {
                const types = component.types;
                if (types.includes("locality")) city = component.longText;
                if (types.includes("administrative_area_level_1")) state = component.shortText;
                if (types.includes("street_number")) streetNumber = component.longText;
                if (types.includes("route")) route = component.longText;
                if (types.includes("postal_code")) zip = component.longText;
            });

            setAddressDetails({
                street: `${streetNumber} ${route}`.trim() || description.split(',')[0],
                city,
                state,
                zip
            });

        } catch (error) {
            console.error("V3 Geocoding Parsing Error: ", error);
        }
    };

    const confirmAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            setErrorMessage("Session expired. Please return to the homepage to claim your sample.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        
        try {
            const response = await fetch("/api/klaviyo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    address: addressDetails.street || inputValue, // Use formatted street, or raw input fallback
                    city: addressDetails.city,
                    state: addressDetails.state,
                    postalCode: addressDetails.zip
                })
            });

            if (!response.ok) throw new Error("Failed to update profile");
            
            setStatus("success");
            
            // Seamless Anti-Abuse Tracking Drop: Exactly 1 Year Expiration Native State Lock
            document.cookie = "wonderade_sample_claimed=true; max-age=31536000; path=/";
            
            // Completion redirects to the Step 3 Viral loop
            setTimeout(() => {
                router.push(`/share?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName)}`);
            }, 1000);

        } catch (err) {
            setStatus("error");
            setErrorMessage("We could not save your shipping details. Please try again.");
        }
    };

    if (!isMounted) return null;

    if (loadError) return <div className="text-center font-mono font-bold text-red-600">Maps Initialization Error</div>;
    // Loading state while script mounts silently
    if (!isLoaded) return <div className="p-8 text-center text-[#374191] font-mono animate-pulse">Initializing Secure Validation...</div>;

    return (
        <div className="flex flex-col border-4 border-[#374191] bg-white p-6 shadow-[12px_12px_0px_#374191] md:p-10 rounded-3xl w-full">
            <h2 className="mb-2 font-serif text-4xl text-[#374191]">Step 2: Shipping</h2>
            <p className="mb-8 font-mono text-sm uppercase text-[#374191]/60 tracking-widest font-bold">
                Where should we send your sample?
            </p>

            <form onSubmit={confirmAddress} className="flex flex-col gap-4">
                
                {/* Names */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden focus-within:-translate-y-0.5 transition-transform">
                        <input
                            required
                            type="text"
                            placeholder="FIRST NAME"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191]"
                        />
                    </div>
                    <div className="flex-1 flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden focus-within:-translate-y-0.5 transition-transform">
                        <input
                            required
                            type="text"
                            placeholder="LAST NAME"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191]"
                        />
                    </div>
                </div>

                {/* Autocomplete Street Bounds */}
                <div className="relative z-50">
                    <div className="flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden focus-within:-translate-y-0.5 transition-transform items-center px-4">
                        <MapPin className="text-[#374191]/50 w-5 h-5 mr-2" />
                        <input
                            value={inputValue}
                            onChange={(e) => fetchNewSuggestions(e.target.value)}
                            disabled={!isLoaded}
                            placeholder="START TYPING ADDRESS..."
                            className="w-full py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191] bg-transparent"
                        />
                    </div>
                    
                    {/* Autocomplete Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-[#374191] rounded-xl shadow-[4px_4px_0px_#374191] overflow-hidden">
                            {suggestions.map((suggest) => (
                                <li
                                    key={suggest.placePrediction.placeId}
                                    onClick={() => handleSelect(suggest.placePrediction.placeId, suggest.placePrediction.text.text)}
                                    className="cursor-pointer px-4 py-3 font-mono text-xs uppercase font-bold text-[#374191] hover:bg-[#F8F2D0] border-b border-[#374191]/10 last:border-none transition-colors"
                                >
                                    {suggest.placePrediction.text.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Explicit Parsed Details Grid (Unlocks when validated) */}
                <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${addressDetails.city ? "opacity-100 max-h-[500px]" : "opacity-50 max-h-[250px]"}`}>
                     <div className="flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden">
                        <input
                            required
                            readOnly={!!addressDetails.city}
                            type="text"
                            placeholder="CITY"
                            value={addressDetails.city}
                            onChange={(e) => setAddressDetails({...addressDetails, city: e.target.value})}
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191]"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden">
                            <input
                                required
                                readOnly={!!addressDetails.state}
                                type="text"
                                placeholder="ST"
                                value={addressDetails.state}
                                onChange={(e) => setAddressDetails({...addressDetails, state: e.target.value})}
                                maxLength={2}
                                className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191] text-center"
                            />
                        </div>
                        <div className="flex-[2] border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] rounded-xl overflow-hidden">
                            <input
                                required
                                readOnly={!!addressDetails.zip}
                                type="text"
                                placeholder="ZIP"
                                value={addressDetails.zip}
                                onChange={(e) => setAddressDetails({...addressDetails, zip: e.target.value})}
                                className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191]"
                            />
                        </div>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="mt-6 border-2 border-[#374191] bg-[#F57D14] shadow-[4px_4px_0px_#374191] px-6 py-4 rounded-xl font-mono text-lg font-bold uppercase tracking-widest text-[#374191] transition-colors hover:bg-[#F36318] hover:text-white disabled:opacity-80 flex items-center justify-center active:translate-y-[2px] active:shadow-[2px_2px_0px_#374191]"
                >
                    {status === "loading" ? (
                        <span className="animate-spin h-5 w-5 border-2 border-[#374191] border-t-transparent rounded-full"></span>
                    ) : status === "success" ? (
                        "SAMPLE CLAIMED!"
                    ) : (
                        "CONFIRM ADDRESS"
                    )}
                </button>

                {errorMessage && (
                    <p className="text-center font-mono text-sm uppercase tracking-wider text-red-500 font-bold animate-pulse mt-2">
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    )
}
