import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-white">
            <div className="mx-auto grid min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] max-w-screen-2xl grid-cols-1 md:grid-cols-2 px-4 pt-10 pb-16 md:p-0 md:gap-8">

                {/* Left Column wrapper using `contents` on mobile so children can be ordered freely */}
                <div className="contents md:flex md:flex-col md:justify-center md:px-8 lg:px-12 xl:px-16">

                    {/* Group 1: Badge & Headline (Mobile Order 1) */}
                    <div className="order-1 md:order-none flex flex-col items-start">
                        <div className="mb-4 md:mb-6 flex items-center">
                            {/* <div className="inline-flex items-center justify-center bg-[#CCFF00] border border-black px-3 py-1.5 md:px-4 md:py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200">
                                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-black">Founding Family Pre-Order</span>
                            </div> */}
                        </div>

                        <h1 className="mb-2 md:mb-4 font-sans text-[8vw] md:text-4xl lg:text-[4rem] xl:text-[4.5rem] font-black uppercase leading-[1.05] tracking-tight text-black lg:mb-6">
                            The juice you wish you had when <span className="text-[#FF5C00]">you were growing up.</span>
                        </h1>
                    </div>

                    {/* Group 2: Subhead tightly coupled under headline (Mobile Order 2) */}
                    <div className="order-2 md:order-none relative z-10 flex flex-col pt-2 md:pt-4">
                        <p className="mb-6 md:mb-10 max-w-lg font-sans text-lg md:text-xl leading-relaxed text-black/90 font-medium font-condensed">
                            Every sip builds stronger muscles, bigger bones, and a sharper brain. No added sugar. No fake stuff. Finally.
                        </p>
                    </div>

                    {/* Group 4: Pricing Box & CTA (Mobile Order 4) */}
                    <div className="order-4 md:order-none relative z-10 flex flex-col pt-4 md:pt-0 pb-8 md:pb-0">
                        <div className="w-full md:max-w-[420px] bg-white border-2 border-black p-5 sm:p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FF5C00] mb-2 leading-tight">Be one of the first families.</h3>
                            <p className="font-sans text-xs sm:text-sm text-black/70 font-semibold mb-6 leading-relaxed">We&apos;re releasing our first batch to a small group of founding families before anyone else. Reserve your spot and we&apos;ll ship you the first case off the line.</p>
                            
                            <div className="flex items-center justify-center bg-[#CCFF00] border border-black px-3 py-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-5 w-fit">
                                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]"></span>
                                    </span>
                                    Limited Spots Available
                                </span>
                            </div>
                            
                            <Button
                                asChild
                                className="h-auto w-full rounded-full bg-[#FF5C00] px-4 py-4 sm:py-5 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#E65300] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all mb-3"
                            >
                                <Link href="#checkout" className="flex justify-center focus:outline-none focus:ring-2 focus:ring-black">
                                    <span className="text-sm sm:text-base md:text-lg font-black tracking-widest uppercase text-white text-center">
                                        Claim My First Batch
                                    </span>
                                </Link>
                            </Button>
                            
                            <p className="text-center font-sans text-[10px] sm:text-xs font-bold text-black/50 uppercase tracking-widest">
                                No commitment. Just first access.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Right Column: Product Image (Mobile Order 3) */}
                <div className="hero-right-col order-3 md:order-none py-8 md:py-0">
                    {/* Dark Rounded Backdrop */}
                    {/* <div className="absolute inset-4 md:inset-6 lg:inset-8 rounded-[2.5rem] bg-black" /> */}

                    {/* Centering layer: hero-right-inner activates on desktop via globals.css */}
                    <div className="hero-right-inner relative z-10 flex flex-col items-center mx-auto w-full max-w-[300px] md:max-w-[380px] xl:max-w-[460px] px-4 md:px-0">
                        {/* Product Image */}
                        <div className="relative aspect-[4/5] w-full">
                            <Image
                                src="/wonderade-bottles.png"
                                alt="Major Orange and Princess Punch Wonderade Bottles"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                priority
                            />
                        </div>

                        {/* Pediatricians' Choice White Card — overlaps image bottom slightly */}
                        {/* <div className="-mt-6 md:-mt-8 flex w-full items-center gap-2 md:gap-4 rounded-2xl md:rounded-3xl bg-white p-3 md:p-4 lg:p-5 shadow-xl border-2 border-black">
                            <div className="flex flex-col items-center justify-center whitespace-nowrap px-2 md:px-4 font-serif text-sm md:text-lg lg:text-xl font-bold italic leading-tight text-black border-r-2 border-black/10">
                                <span className="text-[#FF5C00]">Pediatricians&apos;</span>
                                <span>Choice</span>
                            </div>
                            <p className="font-sans text-[10px] md:text-xs lg:text-sm font-semibold text-black/80 pr-1 md:pr-2">
                                1,500+ pediatricians share this on FrontrowMD without compensation.
                            </p>
                        </div> */}
                    </div>
                </div>

            </div>
        </section>
    )
}
