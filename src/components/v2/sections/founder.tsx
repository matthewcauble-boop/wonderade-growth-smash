import Image from "next/image"

export function Founder() {
    return (
        <section className="w-full border-b-2 border-[#374191] bg-[#CCEFFC] py-16 md:py-24 px-4 overflow-hidden">
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* Founder photo */}
                <div className="mx-auto w-full max-w-sm md:max-w-md">
                    <div className="overflow-hidden rounded-2xl border-[3px] border-[#374191] bg-white shadow-[10px_10px_0px_#374191]">
                        <Image
                            src="/assets/brand/Founder/founder-cartoon.jpg"
                            alt="Matt Cauble, founder of Wonderade, holding his daughter"
                            width={1200}
                            height={1489}
                            className="h-auto w-full"
                            sizes="(max-width: 768px) 90vw, 28rem"
                        />
                    </div>
                </div>

                {/* Founder story */}
                <div className="text-center md:text-left">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F57D14] md:text-sm">
                        Why we made this
                    </span>
                    <h2 className="mb-6 mt-3 font-serif text-3xl font-bold leading-[1.05] tracking-tight text-[#374191] md:text-5xl">
                        I built Wonderade for my own kids first.
                    </h2>
                    <div className="space-y-4 text-base font-medium leading-relaxed text-[#374191]/90 md:text-lg">
                        <p>
                            I became a dad after launching Soylent and Kin, two drinks that made good
                            nutrition fun and easy. So naturally I wanted to make something delicious for
                            my kids that could help them grow big and strong.
                        </p>
                        <p>
                            Growing up is life&apos;s biggest workout. It requires a different kind of fuel.
                            So we built Wonderade with a simple purpose: Each bottle of Wonderade pairs
                            crave-worthy taste and balanced nutrition to power strong bodies and curious minds.
                        </p>
                    </div>
                    <div className="mt-8">
                        <div
                            className="text-3xl text-[#374191] md:text-4xl"
                            style={{ fontFamily: "var(--font-baloo), 'Baloo 2', cursive" }}
                        >
                            — Matt
                        </div>
                        <div className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/70 md:text-sm">
                            Matt Cauble · Founder &amp; Dad
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
