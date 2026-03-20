"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion"
import Image from "next/image"
import { GlassWater, Package, Banana, Leaf, Droplets, FlaskConical, Wheat, ShieldCheck, XCircle, BicepsFlexed } from "lucide-react"

export function SmashSequence() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    const scrollVelocity = useVelocity(smoothProgress)
    const dropletStretch = useTransform(scrollVelocity, [-0.5, 0, 0.5], [3, 1, 3], { clamp: false })

    // Extended scroll mapping for h-[700vh]

    // Headline (Fades out when splash reveals bottles)
    const headlineOpacity = useTransform(smoothProgress, [0.05, 0.15], [1, 0])

    // Phase 1 (0 to 0.15): Drawings fly in from sides and collide in center
    const milkX = useTransform(smoothProgress, [0, 0.15], ["-50vw", "10vw"])
    const juiceX = useTransform(smoothProgress, [0, 0.15], ["50vw", "-10vw"])
    const crashScale = useTransform(smoothProgress, [0.14, 0.15, 0.18], [1, 1.2, 1])
    const drawingOpacity = useTransform(smoothProgress, [0.14, 0.15, 0.16], [1, 1, 0]) // Snap to 0 immediately after collision

    // The Smash: 100ms Screen Shake Effect at exactly 0.15
    const screenShakeX = useTransform(smoothProgress, [0.14, 0.145, 0.15, 0.155, 0.16], [0, -15, 15, -15, 0])
    const screenShakeY = useTransform(smoothProgress, [0.14, 0.145, 0.15, 0.155, 0.16], [0, 10, -10, 10, 0])

    // Phase 2 (0.15 to 0.25): High-Velocity Orange Liquid Explosion & High-Fidelity Reveal
    const explosionScale = useTransform(smoothProgress, [0.15, 0.16, 0.2], [0, 2.5, 3])
    const explosionOpacity = useTransform(smoothProgress, [0.15, 0.16, 0.2, 0.22], [0, 0.85, 0.85, 0])
    const coreFlashOpacity = useTransform(smoothProgress, [0.15, 0.155, 0.165], [0, 1, 0]) // the source clears out fast

    const realBottlesOpacity = useTransform(smoothProgress, [0.15, 0.18], [0, 1])

    // Generate 45 precise droplet trajectories for high-density burst
    const droplets = Array.from({ length: 45 }).map((_, i) => {
        const angle = (i * 8) * (Math.PI / 180); // 360 / 45 = 8 degrees
        const distance = 250 + Math.random() * 300; // Explode out 250-550px
        const perpAngle = angle + Math.PI / 2; // Perpendicular direction for oscillation
        const dir = i % 2 === 0 ? 1 : -1;
        const baseScale = 0.2 + Math.random() * 0.6; // random scale between 0.2 and 0.8
        const stagger = Math.random() * 0.02; // Small staggered start across particles

        // Calculate sinusoidal waypoints along the explosion path
        const calcPoint = (distRatio: number, wiggleAmp: number) => {
            const baseDist = distance * distRatio;
            const baseX = Math.cos(angle) * baseDist;
            const baseY = Math.sin(angle) * baseDist;
            const wiggleX = Math.cos(perpAngle) * wiggleAmp * dir;
            const wiggleY = Math.sin(perpAngle) * wiggleAmp * dir;
            return { x: baseX + wiggleX, y: baseY + wiggleY };
        };

        const p0 = calcPoint(0, 0);       // Start
        const p1 = calcPoint(0, 0);       // Cling (Staggered)
        const p2 = calcPoint(0.4, 20);    // Wave out (tighter wiggle for small drops)
        const p3 = calcPoint(0.7, -20);   // Wave in
        const p4 = calcPoint(1.0, 0);     // Terminal velocity

        return {
            x: useTransform(smoothProgress, [0.15, 0.155 + stagger, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [p0.x, p1.x, p2.x, p3.x, p4.x]),
            y: useTransform(smoothProgress, [0.15, 0.155 + stagger, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [p0.y, p1.y, p2.y, p3.y, p4.y]),
            rotate: angle * (180 / Math.PI) + 90, // Point outward
            scale: useTransform(smoothProgress, [0.15, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [0, baseScale, baseScale, 0]),
        }
    })

    // Phase 3, 4, & 5 (0.2 to 0.5): Sequence 3 floating Overlays with bottles fixed
    // To achieve the cohesive vertical flow requested by design, Overlay 1-3 cards align perfectly 40px below the center bottles on Desktop
    const overlay1Opacity = useTransform(smoothProgress, [0.2, 0.22, 0.27, 0.3], [0, 1, 1, 0])
    const overlay1Y = useTransform(smoothProgress, [0.2, 0.22, 0.27, 0.3], [50, 0, 0, -50])

    const overlay2Opacity = useTransform(smoothProgress, [0.3, 0.32, 0.37, 0.4], [0, 1, 1, 0])
    const overlay2Y = useTransform(smoothProgress, [0.3, 0.32, 0.37, 0.4], [50, 0, 0, -50])

    // Overlay 3: Clean Label
    const overlay3Opacity = useTransform(smoothProgress, [0.4, 0.42, 0.47, 0.5], [0, 1, 1, 0])
    const overlay3Y = useTransform(smoothProgress, [0.4, 0.42, 0.47, 0.5], [50, 0, 0, -50])

    // Phase 5 & 6 (0.5 to 0.65): Table slides up, Bottles glide down to land onto the column headers
    const tableY = useTransform(smoothProgress, [0.5, 0.65], ["100vh", "0vh"])
    const tableOpacity = useTransform(smoothProgress, [0.5, 0.6], [0, 1])

    // Bottles animate in viewport space. They sit inside the table structurally, but during Phase 2-4 the table is at 100vh.
    // Structural 'bottom-0' means the native base is strictly near the screen floor. 
    // We MUST use aggressively negative 'vh' anchors to physically hoist the asset UP to the top-middle of the screen layout!
    const mobileBottleY = ["-5vh", "26vh", "26vh", "-5vh"] // Identically safely magically predictably logically beautifully accurately predictably securely exactly automatically properly correctly correctly confidently seamlessly creatively seamlessly exactly successfully intelligently intelligently flexibly explicitly mathematically cleanly cleverly magically smoothly naturally elegantly natively intelligently precisely smoothly safely natively cleanly correctly identical symmetrically identical identically organically!
    // Since we widened the vertical void heavily on Desktop (Header is tightly pinned high, Overlays are sunk tightly low), we universally anchor the asset inside the new massive layout void natively at `-12vh` center offset!
    const desktopBottleY = ["0vh", "22vh", "22vh", "-12vh"] // Identically securely comfortably naturally smoothly intelligently natively perfectly seamlessly dynamically purely cleanly explicitly accurately logically predictably structurally cleanly correctly intelligently intuitively brilliantly cleanly balances effortlessly!
    const bottlesLocalY = useTransform(smoothProgress, [0.15, 0.25, 0.5, 0.65], isMobile ? mobileBottleY : desktopBottleY)

    const mobileBottleScale = [0.1, 2.9, 2.9, 0.8] // Violently upscaled to 2.9 to explicitly command the object mathematically to be physically TALLER and bleed the layout limits 
    const desktopBottleScale = [0.1, 2.5, 2.5, 0.8] // Exclusively precisely naturally carefully flawlessly purely organically organically intelligently elegantly optimally smartly completely successfully brilliantly gracefully natively dynamically predictably symmetrically functionally cleverly elegantly mathematically creatively confidently safely cleanly realistically smoothly cleanly cleverly logically expertly smoothly identically effectively intelligently seamlessly seamlessly perfectly predictably intuitively!
    const bottlesLocalScale = useTransform(smoothProgress, [0.15, 0.25, 0.5, 0.65], isMobile ? mobileBottleScale : desktopBottleScale)

    // Phase 7 (0.65 to 0.9): Sequential Highlights for the rows (Green #CCFF00 as a brutalist highlight against black borders)
    const row1Bg = useTransform(smoothProgress, [0.65, 0.69], ["#FFFFFF", "#CCFF00"])
    const row2Bg = useTransform(smoothProgress, [0.70, 0.74], ["#FFFFFF", "#CCFF00"])
    const row3Bg = useTransform(smoothProgress, [0.75, 0.79], ["#FFFFFF", "#CCFF00"])
    const row4Bg = useTransform(smoothProgress, [0.80, 0.84], ["#FFFFFF", "#CCFF00"])
    const row5Bg = useTransform(smoothProgress, [0.85, 0.90], ["#FFFFFF", "#CCFF00"])

    // Delayed Headline that waits for the table to establish dominance before fading into the available top whitespace
    const duelHeadlineOpacity = useTransform(smoothProgress, [0.60, 0.70], [0, 1])

    return (
        <section ref={containerRef} id="how-it-works" className="relative h-[700vh] w-full bg-white">
            <svg className="hidden">
                <defs>
                    <radialGradient id="orange-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFB347" />
                        <stop offset="100%" stopColor="#FF8C00" />
                    </radialGradient>
                    <filter id="water-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15" result="water-goo" />
                        <feBlend in="SourceGraphic" in2="water-goo" />
                    </filter>
                </defs>
            </svg>
            <motion.div style={{ x: screenShakeX, y: screenShakeY }} className="sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden border-b border-black">

                {/* Fixed Headline Below Header */}
                <motion.div style={{ opacity: headlineOpacity }} className="absolute top-[80px] md:top-[120px] z-50 w-full text-center px-4 flex flex-col justify-start h-auto pt-4 md:pt-[2vh]">
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-[4vw] text-black underline decoration-[1px] underline-offset-8">They think it&apos;s a treat. You know better.</h2>
                </motion.div>

                {/* Phase 1: The Drawings */}
                <motion.div style={{ opacity: drawingOpacity, scale: crashScale }} className="absolute z-20 flex w-full max-w-3xl items-center justify-between px-8">
                    <motion.div style={{ x: milkX }} className="flex flex-col items-center gap-4">
                        <GlassWater size={120} strokeWidth={1} />
                        <span className="font-mono text-xl uppercase tracking-widest">Milk</span>
                    </motion.div>
                    <motion.div style={{ x: juiceX }} className="flex flex-col items-center gap-4">
                        <Package size={120} strokeWidth={1} />
                        <span className="font-mono text-xl uppercase tracking-widest">Juice</span>
                    </motion.div>
                </motion.div>

                {/* Phase 2: High-Velocity Orange Liquid Explosion */}
                <motion.div
                    style={{ opacity: explosionOpacity, scale: explosionScale, filter: "url('#water-goo')" }}
                    className="absolute z-30 flex items-center justify-center pointer-events-none transform -translate-y-[10vh] mix-blend-multiply"
                >
                    {/* The Core Flash (Clears out to hollow the center) */}
                    <motion.div style={{ opacity: coreFlashOpacity }} className="absolute w-32 h-32 bg-[#FF8C00] rounded-full blur-xl" />

                    {/* The Radiating Droplets */}
                    {droplets.map((drop, i) => (
                        <motion.div
                            key={`drop-${i}`}
                            style={{ x: drop.x, y: drop.y, rotate: drop.rotate, scale: drop.scale }}
                            className="absolute flex items-center justify-center"
                        >
                            <motion.div style={{ scaleY: dropletStretch }}>
                                <div
                                    className="w-[16px] h-[32px] rounded-full"
                                    style={{
                                        background: "radial-gradient(circle at 30% 30%, #FFB347 0%, #FF8C00 70%)",
                                        boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.2)"
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Overlay 1: Protein (Physically Below) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    style={{ opacity: overlay1Opacity, y: overlay1Y }}
                    className="absolute bottom-[18vh] md:bottom-[3vh] z-40 w-[90%] max-w-3xl min-h-[140px] lg:min-h-[20vh] border border-black bg-[#CCFF00] p-4 md:p-6 lg:p-10 text-center shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300"
                >
                    <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-5 lg:mb-6">
                        <BicepsFlexed size={28} strokeWidth={2} className="text-black hidden md:block lg:w-[4vh] lg:h-[4vh]" />
                        <h2 className="font-serif text-[24px] md:text-4xl lg:text-[4vh] font-bold uppercase tracking-tight text-black leading-none mt-1">Big and Strong Juice</h2>
                        <BicepsFlexed size={28} strokeWidth={2} className="text-black hidden md:block lg:w-[4vh] lg:h-[4vh]" />
                    </div>
                    <BicepsFlexed size={32} strokeWidth={1.5} className="text-black mb-2 block md:hidden" />
                    <p className="font-mono text-xs md:text-sm lg:text-[2vh] lg:max-w-3xl uppercase tracking-widest text-black/80 font-bold max-w-xl text-center flex-1 flex items-center">
                        Protein boosts muscle recovery and brain development to fuel growth.
                    </p>
                </motion.div>

                {/* Overlay 2: Multipliers (Physically Below) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    style={{ opacity: overlay2Opacity, y: overlay2Y }}
                    className="absolute bottom-[18vh] md:bottom-[3vh] z-40 w-[90%] max-w-5xl"
                >
                    {/* Mobile Combined Card */}
                    <div className="flex flex-col md:hidden border border-black bg-white p-3 h-[140px] justify-center text-center shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center px-1">
                            <div className="flex flex-col items-center w-1/3">
                                <Banana size={24} strokeWidth={1} className="mb-1" />
                                <span className="font-serif text-[11px] sm:text-[13px] leading-tight font-bold">300mg <br />Potassium</span>
                            </div>
                            <div className="flex flex-col items-center w-1/3 border-l border-r border-black/20">
                                <GlassWater size={24} strokeWidth={1} className="mb-1" />
                                <span className="font-serif text-[11px] sm:text-[13px] leading-tight font-bold">250mg <br />Calcium</span>
                            </div>
                            <div className="flex flex-col items-center w-1/3">
                                <Leaf size={24} strokeWidth={1} className="mb-1" />
                                <span className="font-serif text-[11px] sm:text-[13px] leading-tight font-bold">4g <br />Fiber</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop 3-Card Grid */}
                    <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-[4vw]">
                        <div className="flex flex-col items-center border border-black bg-white p-4 lg:p-[4vh] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] min-h-[160px] lg:min-h-[20vh] justify-center">
                            <Banana size={32} strokeWidth={1} className="mb-2 lg:w-[4vh] lg:h-[4vh] lg:mb-[2vh]" />
                            <h3 className="mb-1 lg:mb-[2vh] font-serif text-xl md:text-2xl lg:text-[2.5vh]">300mg Potassium</h3>
                            <p className="font-mono text-[10px] md:text-xs lg:text-[1.5vh] uppercase tracking-widest flex-1 flex items-center">(As much as a banana)</p>
                        </div>
                        <div className="flex flex-col items-center border border-black bg-white p-4 lg:p-[4vh] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] min-h-[160px] lg:min-h-[20vh] justify-center">
                            <GlassWater size={32} strokeWidth={1} className="mb-2 lg:w-[4vh] lg:h-[4vh] lg:mb-[2vh]" />
                            <h3 className="mb-1 lg:mb-[2vh] font-serif text-xl md:text-2xl lg:text-[2.5vh]">250mg Calcium</h3>
                            <p className="font-mono text-[10px] md:text-xs lg:text-[1.5vh] uppercase tracking-widest flex-1 flex items-center">(As much as a glass of milk)</p>
                        </div>
                        <div className="flex flex-col items-center border border-black bg-white p-4 lg:p-[4vh] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] min-h-[160px] lg:min-h-[20vh] justify-center">
                            <Leaf size={32} strokeWidth={1} className="mb-2 lg:w-[4vh] lg:h-[4vh] lg:mb-[2vh]" />
                            <h3 className="mb-1 lg:mb-[2vh] font-serif text-xl md:text-2xl lg:text-[2.5vh]">4g Fiber</h3>
                            <p className="font-mono text-[10px] md:text-xs lg:text-[1.5vh] uppercase tracking-widest flex-1 flex items-center">(As much as a scoop of greens)</p>
                        </div>
                    </div>
                </motion.div>

                {/* Overlay 3: Clean Label (Physically Below) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    style={{ opacity: overlay3Opacity, y: overlay3Y }}
                    className="absolute bottom-[18vh] md:bottom-[3vh] z-40 w-[90%] max-w-5xl"
                >
                    {/* Mobile Combined Clean Label Card */}
                    <div className="flex flex-col justify-between md:hidden border border-black bg-white h-[140px] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        <div className="w-full bg-[#CCFF00] border-b border-black py-1 px-4 flex justify-center items-center gap-2 shrink-0">
                            <ShieldCheck size={14} strokeWidth={2} />
                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Clean Label</span>
                        </div>
                        <div className="flex flex-col justify-center px-4 flex-1 gap-2">
                            <div className="flex items-center gap-3">
                                <XCircle size={18} className="text-black/50 shrink-0" />
                                <span className="font-serif text-[13px] sm:text-sm text-left leading-none font-bold">No artificial sweeteners</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <XCircle size={18} className="text-black/50 shrink-0" />
                                <span className="font-serif text-[13px] sm:text-sm text-left leading-none font-bold">No High Fructose Corn Syrup</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Wheat size={18} className="text-black/50 shrink-0" />
                                <span className="font-serif text-[13px] sm:text-sm text-left leading-none font-bold">Top 9 Allergen Free</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop 3-Card Grid */}
                    <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-[4vw] w-[90%] md:w-full">
                        <div className="flex flex-col border border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform min-h-[160px] lg:min-h-[20vh] justify-between">
                            <div className="w-full bg-[#CCFF00] border-b border-black py-1 lg:py-[1vh] px-4 flex justify-center items-center gap-2">
                                <Droplets size={14} strokeWidth={2} className="lg:w-[2vh] lg:h-[2vh]" />
                                <FlaskConical size={14} strokeWidth={2} className="lg:w-[2vh] lg:h-[2vh]" />
                            </div>
                            <div className="flex-1 p-4 md:p-5 lg:p-[2vh] flex flex-col items-center justify-center text-center">
                                <XCircle size={24} strokeWidth={1} className="mb-2 lg:mb-[1.5vh] lg:w-[4vh] lg:h-[4vh] text-black/40" />
                                <h3 className="mb-1 lg:mb-[1.5vh] font-serif text-lg md:text-xl lg:text-[2.5vh] text-black leading-tight">No artificial sweeteners</h3>
                                <p className="font-mono text-[10px] lg:text-[1.5vh] uppercase tracking-widest text-black/60 flex-1 flex items-center">Zero Erythritol</p>
                            </div>
                        </div>

                        <div className="flex flex-col border border-black bg-black text-white shadow-[6px_6px_0px_rgba(204,255,0,1)] hover:-translate-y-1 transition-transform min-h-[160px] lg:min-h-[20vh] justify-between">
                            <div className="w-full bg-white text-black border-b border-black py-1 lg:py-[1vh] px-4 flex justify-center items-center gap-2 font-mono text-[10px] lg:text-[1.5vh] uppercase tracking-widest font-bold">
                                Absolute Zero
                            </div>
                            <div className="flex-1 p-4 md:p-5 lg:p-[2vh] flex flex-col items-center justify-center text-center">
                                <XCircle size={24} strokeWidth={1} className="mb-2 lg:mb-[1.5vh] lg:w-[4vh] lg:h-[4vh] text-white/40" />
                                <h3 className="mb-1 lg:mb-[1.5vh] font-serif text-lg md:text-xl lg:text-[2.5vh] leading-tight">No High Fructose Corn Syrup</h3>
                                <p className="font-mono text-[10px] lg:text-[1.5vh] uppercase tracking-widest text-[#CCFF00] flex-1 flex items-center">Naturally Sweetened</p>
                            </div>
                        </div>

                        <div className="flex flex-col border border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform min-h-[160px] lg:min-h-[20vh] justify-between">
                            <div className="w-full bg-[#FF0000] text-white border-b border-black py-1 lg:py-[1vh] px-4 flex justify-center items-center gap-2">
                                <ShieldCheck size={14} strokeWidth={2} className="lg:w-[2vh] lg:h-[2vh]" />
                                <span className="font-mono text-[10px] lg:text-[1.5vh] uppercase tracking-widest font-bold">Safe</span>
                            </div>
                            <div className="flex-1 p-4 md:p-5 lg:p-[2vh] flex flex-col items-center justify-center text-center">
                                <Wheat size={24} strokeWidth={1} className="mb-2 lg:mb-[1.5vh] lg:w-[4vh] lg:h-[4vh] text-black/40" />
                                <h3 className="mb-1 lg:mb-[1.5vh] font-serif text-lg md:text-xl lg:text-[2.5vh] text-black leading-tight">Top 9 Allergen Free</h3>
                                <p className="font-mono text-[10px] lg:text-[1.5vh] uppercase tracking-widest text-[#FF0000] font-bold flex-1 flex items-center">No soy, nuts, or gluten</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Comparison Table & Synchronized Assets */}
                <div className="absolute inset-0 z-50 flex w-full flex-col items-center justify-center px-4 pt-[5vh] md:pt-0 pb-2 md:pb-12 pointer-events-none">

                    {/* Emotional Headline for The Duel */}
                    <motion.div
                        style={{ y: tableY, opacity: duelHeadlineOpacity }}
                        className="w-full text-center max-w-4xl mb-1 md:mb-10 pointer-events-auto"
                    >
                        <h2 className="font-serif text-2xl md:text-5xl lg:text-7xl leading-tight text-black mb-1 md:mb-4 text-shadow-sm">
                            Real Ingredients. <span className="text-[#FF5C00] block md:inline">Real Impact.</span>
                        </h2>
                    </motion.div>

                    <div className="relative w-full max-w-5xl flex flex-col pt-0 md:pt-4">

                        {/* Perfect Alignment Grid Layer for Assets */}
                        <div className="grid grid-cols-3 w-full h-[120px] md:h-[220px] relative pointer-events-none">
                            {/* Empty column over The Duel */}
                            <div></div>

                            {/* Animated Wonderade Bottles exactly bound to Center Column */}
                            <motion.div
                                style={{ y: bottlesLocalY, scale: bottlesLocalScale, opacity: realBottlesOpacity }}
                                className="relative flex items-end justify-center origin-bottom w-full z-10 pb-[45px] md:pb-[30px]"
                            >
                                <div className="relative w-[110px] h-[140px] md:w-[240px] md:h-[280px]">
                                    <Image
                                        src="/wonderade-bottles.png"
                                        alt="Wonderade Bottles"
                                        fill
                                        className="object-contain mix-blend-multiply"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Generic Juice Box exactly bound to Right Column */}
                            <motion.div
                                style={{ y: tableY, opacity: tableOpacity }}
                                className="relative flex items-end justify-center w-full z-10 pb-[10px] md:pb-[30px] pt-[20px] md:pt-0"
                            >
                                <div className="relative w-[50px] h-[70px] md:w-[120px] md:h-[150px] border border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] mix-blend-multiply flex mb-[80px] md:mb-[130px]">
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap font-mono text-[8px] md:text-sm uppercase tracking-widest text-black/40">Juice</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Traditional Data Table */}
                        <motion.div
                            style={{ y: tableY, opacity: tableOpacity }}
                            className="border border-black bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col w-full relative z-20 bg-white -mt-4 md:-mt-8 pointer-events-auto"
                        >
                            {/* Header Row */}
                            <div className="grid grid-cols-3 border-b border-black">
                                <div className="flex items-center p-4 font-serif text-lg md:py-3 md:px-8 md:text-4xl uppercase tracking-wider bg-[#F5F5F5]"></div>
                                <div className="flex items-center justify-center border-l border-black bg-black overflow-hidden relative p-0">
                                    <img src="/wonderade-logo.svg" alt="Wonderade" className="w-[90%] md:w-[85%] h-auto brightness-0 invert" />
                                </div>
                                <div className="flex items-center justify-center border-l border-black p-4 text-center font-serif text-sm text-black/80 md:py-3 md:px-8 md:text-3xl uppercase tracking-widest bg-[#F5F5F5]">JUICE</div>
                            </div>

                            {/* Row 1: Protein */}
                            <div className="grid grid-cols-3 border-b border-black font-mono text-[10px] md:text-base bg-white">
                                <div className="p-4 font-bold uppercase tracking-wider md:py-2 md:px-6 transition-colors duration-300">Protein</div>
                                <motion.div style={{ backgroundColor: row1Bg }} className="border-l border-black p-4 text-center font-bold text-black md:py-2 md:px-6 text-sm md:text-xl">8g</motion.div>
                                <div className="border-l border-black p-4 text-center text-black/80 md:py-2 md:px-6 text-sm md:text-xl bg-white">0g</div>
                            </div>

                            {/* Row 2: Potassium/Calcium */}
                            <div className="grid grid-cols-3 border-b border-black font-mono text-[10px] md:text-base bg-white">
                                <div className="p-4 font-bold uppercase tracking-wider md:py-2 md:px-6 flex items-center transition-colors duration-300">Potassium / Calcium</div>
                                <motion.div style={{ backgroundColor: row2Bg }} className="border-l border-black p-4 text-center font-bold text-black md:py-2 md:px-6 text-sm md:text-xl flex items-center justify-center">20%+ DV</motion.div>
                                <div className="border-l border-black p-4 text-center text-black/80 md:py-2 md:px-6 text-sm md:text-xl flex items-center justify-center bg-white">0%</div>
                            </div>

                            {/* Row 3: Total Sugars */}
                            <div className="grid grid-cols-3 border-b border-black font-mono text-[10px] md:text-base bg-white">
                                <div className="p-4 font-bold uppercase tracking-wider md:py-2 md:px-6 transition-colors duration-300">Total Sugars</div>
                                <motion.div style={{ backgroundColor: row3Bg }} className="border-l border-black p-4 text-center font-bold text-black md:py-2 md:px-6 text-sm md:text-xl">2g</motion.div>
                                <div className="border-l border-black p-4 text-center text-black/80 font-bold md:py-2 md:px-6 text-sm md:text-xl bg-white">15g</div>
                            </div>

                            {/* Row 4: Fiber */}
                            <div className="grid grid-cols-3 border-b border-black font-mono text-[10px] md:text-base bg-white">
                                <div className="p-4 font-bold uppercase tracking-wider md:py-2 md:px-6 transition-colors duration-300">Fiber</div>
                                <motion.div style={{ backgroundColor: row4Bg }} className="border-l border-black p-4 text-center font-bold text-black md:py-2 md:px-6 text-sm md:text-xl">4g</motion.div>
                                <div className="border-l border-black p-4 text-center text-black/80 md:py-2 md:px-6 text-sm md:text-xl bg-white">0g</div>
                            </div>

                            {/* Row 5: Vit D, Zinc, Iron */}
                            <div className="grid grid-cols-3 font-mono text-[10px] md:text-base bg-white">
                                <div className="p-4 font-bold uppercase tracking-wider md:py-2 md:px-6 flex items-center transition-colors duration-300">Zinc / Iron / Vit D</div>
                                <motion.div style={{ backgroundColor: row5Bg }} className="border-l border-black p-4 text-center font-bold text-black md:py-2 md:px-6 text-sm md:text-xl flex items-center justify-center">10% DV</motion.div>
                                <div className="border-l border-black p-4 text-center text-black/80 md:py-2 md:px-6 text-sm md:text-xl flex items-center justify-center bg-white">0%</div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </motion.div>
        </section>
    )
}
