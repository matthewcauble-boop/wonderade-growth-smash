"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Copy, Share2 } from "lucide-react"

export function ShareCard() {
    const searchParams = useSearchParams();
    const email = searchParams ? searchParams.get("email") : null;
    const name = searchParams ? searchParams.get("name") : null;
    
    const [copied, setCopied] = useState(false);
    const [uniqueLink, setUniqueLink] = useState("https://wonderade.us");

    useEffect(() => {
        // We dynamically encode the user's email into a base64 pseudo-token on the client
        // This generates a guaranteed 'unique-looking' link automatically without needing a heavy database hook yet.
        const token = email ? btoa(email.toLowerCase()) : "FWD25";
        setUniqueLink(`https://wonderade.us/?ref=${token}`);
    }, [email]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(uniqueLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error("Clipboard blocked natively", err);
        }
    };

    return (
        <div className="flex flex-col border-4 border-[#374191] bg-white p-6 md:p-12 shadow-[12px_12px_0px_#374191] rounded-3xl w-full text-center relative overflow-hidden">
            
            {/* Visual Confetti / Decorative Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FBD02E] rounded-full mix-blend-multiply opacity-50 blur-xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#E0643A] rounded-full mix-blend-multiply opacity-30 blur-lg animate-bounce" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-[#489958] w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#374191] shadow-[4px_4px_0px_#374191] mb-6">
                    <Check className="w-10 h-10 text-white" strokeWidth={4} />
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl text-[#374191] mb-10">
                    Sample Secured!
                </h1>

                <div className="w-full bg-[#F8F2D0] border-2 border-[#374191] rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_#374191] flex flex-col items-center">
                    <span className="flex items-center gap-2 font-mono text-[#F57D14] font-bold text-lg mb-2">
                        <Share2 className="w-5 h-5" /> SPREAD THE HEALTH
                    </span>
                    <h2 className="font-serif text-3xl text-[#374191] mb-2 leading-tight">
                        Give 3 Families a Free Sample.
                    </h2>
                    <p className="font-mono text-xs md:text-sm uppercase text-[#374191]/60 font-bold mb-6">
                        Copy your unique link below and drop it in the group chat. If three friends claim a sample we'll send you a free gift when we launch.
                    </p>

                    <div className="flex flex-col sm:flex-row w-full gap-3">
                        <div className="flex-grow flex border-2 border-[#374191] bg-white rounded-xl overflow-hidden shadow-[2px_2px_0px_#374191]">
                            <input 
                                readOnly
                                value={uniqueLink}
                                className="w-full px-4 py-4 font-mono text-[10px] md:text-xs text-[#374191] font-bold outline-none cursor-text truncate"
                            />
                        </div>
                        <button 
                            onClick={handleCopy}
                            className={`flex shrink-0 items-center justify-center gap-2 border-2 border-[#374191] px-6 py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-all shadow-[2px_2px_0px_#374191] active:translate-y-[1px] active:shadow-[1px_1px_0px_#374191] min-w-[140px]
                            ${copied ? 'bg-[#489958] text-white' : 'bg-[#FBD02E] text-[#374191] hover:bg-[#374191] hover:text-white'}`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" /> COPIED!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" /> COPY LINK
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <button 
                    onClick={() => window.location.href = "/"}
                    className="mt-8 font-mono text-xs uppercase tracking-widest text-[#374191]/50 hover:text-[#374191] font-bold flex items-center gap-1 transition-colors"
                >
                    Back to homepage
                </button>
            </div>
        </div>
    )
}
