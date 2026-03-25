"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"

export function Offer() {
    const [isSubscription, setIsSubscription] = useState(true)

    return (
        <section id="checkout" className="w-full border-b-2 border-[#374191] bg-white py-20 px-4 md:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

                {/* Checkout Card */}
                <div className="flex flex-col border-2 border-[#374191] bg-[#F8F2D0] p-6 shadow-[8px_8px_0px_#374191] md:p-8 rounded-3xl">
                    <h2 className="mb-2 font-serif text-4xl text-[#374191]">Variety 24-Pack</h2>
                    <p className="mb-8 font-mono text-sm uppercase text-[#374191]/60 tracking-widest font-bold">12x Major Orange, 12x Princess Punch</p>

                    <div className="mb-6 flex overflow-hidden border-2 border-[#374191] shadow-[4px_4px_0px_#374191] hover:shadow-none transition-shadow duration-300 rounded-xl">
                        <button
                            onClick={() => setIsSubscription(false)}
                            className={`flex-1 py-4 text-center font-mono text-sm font-bold uppercase tracking-widest transition-all ${!isSubscription ? "bg-[#ED0C7B] text-white" : "bg-white text-[#374191] hover:bg-[#CCEFFC]"}`}
                        >
                            One-Time ($50)
                        </button>
                        <button
                            onClick={() => setIsSubscription(true)}
                            className={`flex-1 border-l-2 border-[#374191] py-4 text-center font-mono text-sm font-bold uppercase tracking-widest transition-all ${isSubscription ? "bg-[#F57D14] text-white" : "bg-white text-[#374191] hover:bg-[#CCEFFC]"}`}
                        >
                            Subscribe ($30)
                        </button>
                    </div>

                    <div className="mb-8 flex items-end justify-between border-b-2 border-[#374191] pb-4">
                        <span className="font-mono text-lg uppercase tracking-widest font-bold text-[#374191]">Total</span>
                        <span className="font-serif text-6xl text-[#374191]">{isSubscription ? "$30" : "$50"}</span>
                    </div>

                    <button className="w-full py-6 text-xl tracking-widest bg-[#FBD02E] text-[#374191] border-2 border-[#374191] shadow-[4px_4px_0px_#374191] hover:bg-[#CCEFFC] hover:text-[#374191] hover:-translate-y-1 transition-all rounded-xl font-serif font-bold cursor-pointer">
                        {isSubscription ? "START GROWTH PROTOCOL" : "ADD TO CART"}
                    </button>
                    <div className="mt-4 min-h-[2rem]">
                        {isSubscription && (
                            <p className="text-center font-mono text-xs uppercase tracking-wider text-[#374191]/60 font-bold">
                                $30 for Trial Month. $50 Recurring.<br />Cancel Anytime.
                            </p>
                        )}
                    </div>
                </div>

                {/* Give $20, Get $20 Referral */}
                <div className="flex flex-col border-2 border-[#374191] bg-[#CCEFFC] p-6 shadow-[8px_8px_0px_#374191] md:p-8 rounded-3xl">
                    <div className="mb-6 flex justify-center gap-1 opacity-80 text-[#374191]">
                        {/* Hand-drawn style high-fives using Lucide icons */}
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

            </div>
        </section>
    )
}
