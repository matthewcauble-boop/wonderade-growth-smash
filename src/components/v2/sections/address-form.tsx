"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import usePlacesAutocomplete, { getGeocode, getZipCode } from "use-places-autocomplete"
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

    // Prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: libraries as any
    });

    const {
        ready,
        value,
        suggestions: { status: placesStatus, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "us" }
        },
        debounce: 300,
        initOnMount: isLoaded
    });

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();
        
        try {
            const results = await getGeocode({ address });
            const zip = await getZipCode(results[0], false);
            const addressComponents = results[0].address_components;
            
            let city = "";
            let state = "";
            let streetNumber = "";
            let route = "";

            addressComponents.forEach(component => {
                const types = component.types;
                if (types.includes("locality")) city = component.long_name;
                if (types.includes("administrative_area_level_1")) state = component.short_name;
                if (types.includes("street_number")) streetNumber = component.long_name;
                if (types.includes("route")) route = component.long_name;
            });

            setAddressDetails({
                street: `${streetNumber} ${route}`.trim() || address.split(',')[0],
                city,
                state,
                zip: zip || ""
            });

        } catch (error) {
            console.error("Geocoding Parsing Error: ", error);
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
            const response = await fetch("/api/omnisend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    address: addressDetails.street || value, // Use formatted street, or raw input fallback
                    city: addressDetails.city,
                    state: addressDetails.state,
                    postalCode: addressDetails.zip
                })
            });

            if (!response.ok) throw new Error("Failed to update profile");
            
            setStatus("success");
            
            // Completion redirects to a theoretical 'success' view or back to indexing.
            setTimeout(() => {
                router.push("/?claim=success");
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
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            disabled={!ready}
                            placeholder="START TYPING ADDRESS..."
                            className="w-full py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 text-[#374191] bg-transparent"
                        />
                    </div>
                    
                    {/* Autocomplete Suggestions Dropdown */}
                    {placesStatus === "OK" && (
                        <ul className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-[#374191] rounded-xl shadow-[4px_4px_0px_#374191] overflow-hidden">
                            {data.map(({ place_id, description }) => (
                                <li
                                    key={place_id}
                                    onClick={() => handleSelect(description)}
                                    className="cursor-pointer px-4 py-3 font-mono text-xs uppercase font-bold text-[#374191] hover:bg-[#F8F2D0] border-b border-[#374191]/10 last:border-none transition-colors"
                                >
                                    {description}
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
