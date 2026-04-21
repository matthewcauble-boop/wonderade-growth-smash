"use client"

import { useState } from "react"
import Link from "next/link"

export default function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !message) return

        setStatus("sending")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            })
            if (!res.ok) throw new Error("Failed")
            setStatus("sent")
            setName("")
            setEmail("")
            setMessage("")
        } catch {
            setStatus("error")
        }
    }

    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b-2 border-[#374191] bg-white">
                <div className="flex h-16 items-center justify-between px-4 md:px-8">
                    <Link href="/" className="font-sans text-2xl font-black text-[#374191] uppercase tracking-tight">
                        Wonderade
                    </Link>
                    <Link href="/" className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191] hover:text-[#FBD02E] transition-colors">
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <h1 className="font-sans text-3xl md:text-4xl font-black text-[#374191] uppercase tracking-tight mb-2">
                        Get in Touch
                    </h1>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#374191]/60 font-bold mb-8">
                        Questions about Wonderade? We read every message.
                    </p>

                    {status === "sent" ? (
                        <div className="border-2 border-[#374191] rounded-xl p-8 bg-[#FBD02E]/10 text-center">
                            <div className="text-4xl mb-4">&#9733;</div>
                            <h2 className="font-sans text-xl font-black text-[#374191] uppercase mb-2">Message Sent</h2>
                            <p className="font-mono text-xs uppercase tracking-widest text-[#374191]/70 font-bold">
                                We will get back to you soon.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-[#374191]/60 font-bold block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border-2 border-[#374191] rounded-xl px-4 py-3 font-mono text-sm text-[#374191] outline-none focus:shadow-[4px_4px_0px_#374191] focus:-translate-y-0.5 transition-all placeholder:text-[#374191]/30"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-[#374191]/60 font-bold block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border-2 border-[#374191] rounded-xl px-4 py-3 font-mono text-sm text-[#374191] outline-none focus:shadow-[4px_4px_0px_#374191] focus:-translate-y-0.5 transition-all placeholder:text-[#374191]/30"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-[#374191]/60 font-bold block mb-1">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full border-2 border-[#374191] rounded-xl px-4 py-3 font-mono text-sm text-[#374191] outline-none focus:shadow-[4px_4px_0px_#374191] focus:-translate-y-0.5 transition-all resize-none placeholder:text-[#374191]/30"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full border-2 border-[#374191] bg-[#F57D14] text-white font-mono text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-[6px_6px_0px_#374191] hover:shadow-[3px_3px_0px_#374191] hover:-translate-y-0.5 active:shadow-none active:translate-y-0 transition-all disabled:opacity-70"
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>

                            {status === "error" && (
                                <p className="font-mono text-[10px] uppercase tracking-wider text-red-500 font-bold text-center">
                                    Something went wrong. Try again or email matt@wonderade.us directly.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </main>
    )
}
