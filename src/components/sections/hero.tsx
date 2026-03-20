import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-white">
            <div className="mx-auto grid min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] max-w-screen-2xl grid-cols-1 md:grid-cols-2 px-4 pt-10 pb-16 md:p-0 md:gap-8">

                {/* Left Column wrapper using `contents` on mobile so children can be ordered freely */}
                <div className="contents md:flex md:flex-col md:justify-center md:px-8 lg:px-12 xl:px-16">

                    {/* Group 1: Stars & Headline (Mobile Order 1) */}
                    <div className="order-1 md:order-none flex flex-col">
                        <div className="mb-4 md:mb-6 flex items-center gap-2">
                            <div className="flex text-[#FF5C00]">
                                {/* SVG Stars */}
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-sans text-[10px] sm:text-xs md:text-sm font-bold text-black/80">
                                <span className="text-[#FF5C00]">4.8</span> stars from <span className="text-[#FF5C00]">85,000</span> reviews | <span className="text-[#FF5C00]">1,000,000+</span> members
                            </p>
                        </div>

                        <h1 className="mb-6 font-sans text-[8vw] md:text-4xl lg:text-[4rem] xl:text-[4.5rem] font-black uppercase leading-[1.05] tracking-tight text-black lg:mb-8">
                            Kids love juice, we made it <span className="text-[#FF5C00]">good for them.</span>
                        </h1>
                    </div>

                    {/* Group 3: Subhead & CTA (Mobile Order 3) */}
                    <div className="order-3 md:order-none relative z-10 flex flex-col pt-6 md:pt-0">
                        <p className="mb-8 md:mb-10 max-w-lg font-sans text-lg md:text-xl leading-relaxed text-black/90 font-medium font-condensed">
                            8g Protein. 4g Fiber. 0g Added Sugar. Electrolytes + Immunity. The ultimate nutritional shortcut for growing bodies.
                        </p>
                        <div className="flex justify-center md:justify-start w-full md:w-auto mb-6 md:mb-4">
                            <Button
                                asChild
                                className="h-auto w-[90%] md:w-auto rounded-full bg-[#FF5C00] px-4 py-5 sm:px-10 sm:py-6 lg:px-8 lg:py-6 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] whitespace-normal hover:bg-[#E65300] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                <Link href="#checkout" className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black">
                                    <span className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold tracking-tight text-white leading-tight text-center">
                                        Save 40% + Free Shipping
                                    </span>
                                </Link>
                            </Button>
                        </div>

                        <div className="flex justify-center md:justify-start items-center gap-2 text-black/80 mb-8 md:mb-0">
                            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-sans text-xs md:text-sm font-semibold">30-Day Guarantee</span>
                            <span className="flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full border border-black/30 font-serif text-[10px]">i</span>
                        </div>
                    </div>

                </div>

                {/* Right Column: Product Image (Mobile Order 2) */}
                <div className="hero-right-col order-2 md:order-none py-8 md:py-0">
                    {/* Dark Rounded Backdrop */}
                    <div className="absolute inset-4 md:inset-6 lg:inset-8 rounded-[2.5rem] bg-black" />

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
                        <div className="-mt-6 md:-mt-8 flex w-full items-center gap-2 md:gap-4 rounded-2xl md:rounded-3xl bg-white p-3 md:p-4 lg:p-5 shadow-xl border-2 border-black">
                            <div className="flex flex-col items-center justify-center whitespace-nowrap px-2 md:px-4 font-serif text-sm md:text-lg lg:text-xl font-bold italic leading-tight text-black border-r-2 border-black/10">
                                <span className="text-[#FF5C00]">Pediatricians&apos;</span>
                                <span>Choice</span>
                            </div>
                            <p className="font-sans text-[10px] md:text-xs lg:text-sm font-semibold text-black/80 pr-1 md:pr-2">
                                1,500+ pediatricians share this on FrontrowMD without compensation.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
