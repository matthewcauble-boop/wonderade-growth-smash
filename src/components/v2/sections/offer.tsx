"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"

export function Offer() {
    const [isSubscription, setIsSubscription] = useState(true)

    return (
        <section id="checkout" className="w-full border-b-2 border-[#374191] bg-white py-20 px-4 md:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-8">

                {/* Checkout Card */}
                <div className="flex flex-col border-2 border-[#374191] bg-[#F8F2D0] p-6 shadow-[8px_8px_0px_#374191] md:p-8 rounded-3xl">
                    <div className="flex items-center justify-center bg-[#FBD02E] border-2 border-[#374191] px-3 py-1.5 shadow-[2px_2px_0px_#374191] mb-5 w-fit rounded-lg">
                        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#374191] flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F57D14] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F57D14]"></span>
                            </span>
                            Limited Spots Available
                        </span>
                    </div>

                    <h2 className="mb-2 font-serif text-4xl text-[#374191]">Claim Your Free Sample</h2>
                    <p className="mb-8 font-mono text-sm uppercase text-[#374191]/60 tracking-widest font-bold">Try Wonderade before you buy.</p>

                    <div className="mt-auto flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] focus-within:shadow-[2px_2px_0px_#374191] focus-within:-translate-y-0.5 transition-all rounded-xl overflow-hidden mb-4">
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 placeholder:font-normal text-[#374191]"
                        />
                        <button className="border-l-2 border-[#374191] bg-[#F57D14] px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#F36318] hover:text-white">
                            CLAIM
                        </button>
                    </div>

                    <div className="mt-2 min-h-[2rem]">
                        <p className="text-left font-mono text-xs uppercase tracking-wider text-[#374191]/60 font-bold">
                            No commitment. Just first access.
                        </p>
                    </div>
                </div>

                {/* Give $20, Get $20 Referral (Hidden for now) */}
                {/* 
                <div className="flex flex-col border-2 border-[#374191] bg-[#CCEFFC] p-6 shadow-[8px_8px_0px_#374191] md:p-8 rounded-3xl">
                    <div className="mb-6 flex justify-center gap-1 opacity-80 text-[#374191]">
                        <Hand size={64} strokeWidth={1} className="origin-bottom-right -rotate-12" />
                        <Hand size={64} strokeWidth={1} className="origin-bottom-left rotate-12 -scale-x-100" />
                    </div>
                    <h2 className="mb-4 text-center font-serif text-5xl leading-none md:text-6xl text-[#374191]">Give $20,<br />Get $20</h2>
                    <p className="mb-8 text-center font-mono text-sm uppercase leading-relaxed tracking-wider text-[#374191]/80 font-bold">
                        Invite another family to the growth protocol. They get $20 off their first order, you get $20 off your next box.
                    </p>

                    <div className="mt-auto flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] focus-within:shadow-[2px_2px_0px_#374191] focus-within:-translate-y-0.5 transition-all rounded-xl overflow-hidden">
                        <input
                            type="email"
                            placeholder="ENTER FRIEND'S EMAIL"
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 placeholder:font-normal text-[#374191]"
                        />
                        <button className="border-l-2 border-[#374191] bg-[#374191] px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#FBD02E] hover:text-[#374191]">
                            SEND
                        </button>
                    </div>
                </div>
                */}

            </div>
        </section>
    )
}
