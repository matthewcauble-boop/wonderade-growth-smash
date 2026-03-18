"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"

export function Offer() {
    const [isSubscription, setIsSubscription] = useState(true)

    return (
        <section id="checkout" className="w-full border-b border-black bg-white py-20 px-4 md:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

                {/* Checkout Card */}
                <div className="flex flex-col border border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] md:p-8">
                    <h2 className="mb-2 font-serif text-4xl">Variety 24-Pack</h2>
                    <p className="mb-8 font-mono text-sm uppercase text-black/50 tracking-widest">12x Major Orange, 12x Princess Punch</p>

                    <div className="mb-6 flex overflow-hidden border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300">
                        <button
                            onClick={() => setIsSubscription(false)}
                            className={`flex-1 py-4 text-center font-mono text-sm font-bold uppercase tracking-widest transition-all ${!isSubscription ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}
                        >
                            One-Time ($50)
                        </button>
                        <button
                            onClick={() => setIsSubscription(true)}
                            className={`flex-1 border-l border-black py-4 text-center font-mono text-sm font-bold uppercase tracking-widest transition-all ${isSubscription ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}
                        >
                            Subscribe ($30)
                        </button>
                    </div>

                    <div className="mb-8 flex items-end justify-between border-b border-black pb-4">
                        <span className="font-mono text-lg uppercase tracking-widest font-bold">Total</span>
                        <span className="font-serif text-6xl">{isSubscription ? "$30" : "$50"}</span>
                    </div>

                    <Button className="w-full py-6 text-xl tracking-widest">
                        {isSubscription ? "START GROWTH PROTOCOL" : "ADD TO CART"}
                    </Button>
                    <div className="mt-4 min-h-[2rem]">
                        {isSubscription && (
                            <p className="text-center font-mono text-xs uppercase tracking-wider text-black/50">
                                $30 for Trial Month. $50 Recurring.<br />Cancel Anytime.
                            </p>
                        )}
                    </div>
                </div>

                {/* Give $20, Get $20 Referral */}
                <div className="flex flex-col border border-black bg-[#FFFBEA] p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] md:p-8">
                    <div className="mb-6 flex justify-center gap-1 opacity-80">
                        {/* Hand-drawn style high-fives using Lucide icons */}
                        <Hand size={64} strokeWidth={1} className="origin-bottom-right -rotate-12" />
                        <Hand size={64} strokeWidth={1} className="origin-bottom-left rotate-12 -scale-x-100" />
                    </div>
                    <h2 className="mb-4 text-center font-serif text-5xl leading-none md:text-6xl">Give $20,<br />Get $20</h2>
                    <p className="mb-8 text-center font-mono text-sm uppercase leading-relaxed tracking-wider text-black/70">
                        Invite another family to the growth protocol. They get $20 off their first order, you get $20 off your next box.
                    </p>

                    <div className="mt-auto flex border border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] focus-within:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-shadow">
                        <input
                            type="email"
                            placeholder="ENTER FRIEND'S EMAIL"
                            className="w-full px-4 py-4 font-mono text-sm font-bold uppercase tracking-widest outline-none placeholder:text-black/30 placeholder:font-normal"
                        />
                        <button className="border-l border-black bg-black px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
                            SEND
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}
