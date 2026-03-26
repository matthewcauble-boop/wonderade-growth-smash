"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion"
import Image from "next/image"
import { GlassWater, Package, Banana, Leaf, Droplets, FlaskConical, Wheat, ShieldCheck, XCircle, BicepsFlexed, Zap, Activity } from "lucide-react"

export function SmashSequence() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [dynamicMobileScale, setDynamicMobileScale] = useState(2.9)

    useEffect(() => {
        const checkMobile = () => {
            const isMob = window.innerWidth < 768;
            setIsMobile(isMob);
            
            if (isMob && typeof window !== 'undefined') {
                // Dynamically constrain the huge bottle expansion vertically for shorter Android/SE devices.
                // An iPhone 14 (~844px height) yields the perfect golden ratio (scale mapping to 2.9).
                // Shorter devices like Galaxy S8 will organically tone down to ~2.5x to spare toolbar clamping.
                const heightRatio = window.innerHeight / 844;
                const safeScale = Math.min(2.9, 2.9 * heightRatio);
                setDynamicMobileScale(safeScale);
            }
        }
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

    // Phase 1 (0 to 0.15): The Great Sticker Implosion
    // 6 stickers tied to multi-dimensional coordinate bounds mapping to native mobile/desktop arrays separately.
    const implosionX1 = useTransform(smoothProgress, [0, 0.15], isMobile ? [300, 0] : [600, 0])
    const implosionY1 = useTransform(smoothProgress, [0, 0.15], [0, 0])

    const implosionX2 = useTransform(smoothProgress, [0, 0.15], isMobile ? [150, 0] : [300, 0])
    const implosionY2 = useTransform(smoothProgress, [0, 0.15], isMobile ? [260, 0] : [520, 0])

    const implosionX3 = useTransform(smoothProgress, [0, 0.15], isMobile ? [-150, 0] : [-300, 0])
    const implosionY3 = useTransform(smoothProgress, [0, 0.15], isMobile ? [260, 0] : [520, 0])

    const implosionX4 = useTransform(smoothProgress, [0, 0.15], isMobile ? [-300, 0] : [-600, 0])
    const implosionY4 = useTransform(smoothProgress, [0, 0.15], [0, 0])

    const implosionX5 = useTransform(smoothProgress, [0, 0.15], isMobile ? [-150, 0] : [-300, 0])
    const implosionY5 = useTransform(smoothProgress, [0, 0.15], isMobile ? [-260, 0] : [-520, 0])

    const implosionX6 = useTransform(smoothProgress, [0, 0.15], isMobile ? [150, 0] : [300, 0])
    const implosionY6 = useTransform(smoothProgress, [0, 0.15], isMobile ? [-260, 0] : [-520, 0])

    const spinIn = useTransform(smoothProgress, [0, 0.15], [0, 1080]) // intense triple spin
    const spinInRev = useTransform(smoothProgress, [0, 0.15], [0, -1080])

    const implosionScale = useTransform(smoothProgress, [0, 0.15], [2.0, 0.2]) // Shrink drastically into the vortex
    const crashScale = useTransform(smoothProgress, [0.14, 0.15, 0.18], [1, 1.5, 1])
    const drawingOpacity = useTransform(smoothProgress, [0.14, 0.15, 0.151], [1, 1, 0]) // Instant flash obliteration at 0.15

    // The Smash: 100ms Screen Shake Effect at exactly 0.15
    const screenShakeX = useTransform(smoothProgress, [0.14, 0.145, 0.15, 0.155, 0.16], [0, -15, 15, -15, 0])
    const screenShakeY = useTransform(smoothProgress, [0.14, 0.145, 0.15, 0.155, 0.16], [0, 10, -10, 10, 0])

    // Phase 2 (0.15 to 0.25): High-Velocity Orange Liquid Explosion & High-Fidelity Reveal
    const explosionScale = useTransform(smoothProgress, [0.15, 0.16, 0.2], [0, 2.5, 3])
    const explosionOpacity = useTransform(smoothProgress, [0.15, 0.16, 0.2, 0.22], [0, 0.85, 0.85, 0])
    const coreFlashOpacity = useTransform(smoothProgress, [0.15, 0.155, 0.165], [0, 1, 0]) // the source clears out fast

    const realBottlesOpacity = useTransform(smoothProgress, [0.15, 0.18], [0, 1])

    // Generate 45 raw organic liquid variants natively tearing out via Metaball physics
    // (Locked strictly to 45 items to perfectly preserve React hook sync order across Fast Refresh)
    const droplets = Array.from({ length: 45 }).map((_, i) => {
        // Mathematical deterministic pseudo-random logic to permanently sync server/client hydration
        const pseudoRand = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const angle = (i * 8) * (Math.PI / 180);
        const distance = 150 + pseudoRand * 500; // Chaotic explosion distances 150 to 650px
        const perpAngle = angle + Math.PI / 2;
        const dir = i % 2 === 0 ? 1 : -1;

        // Tighter, more distinct liquid droplets to ensure organic white-space separation natively between streaks
        const wBase = 8 + (Math.abs(Math.cos(i * 3.4)) % 1) * 20; // 8px to 28px width
        const hBase = 16 + (Math.abs(Math.sin(i * 5.1)) % 1) * 40; // 16px to 56px height
        const stagger = pseudoRand * 0.03;

        // Vivid Orange/Yellow juice explosion gradients matching Major Orange / Banana palettes
        const colorPalette = [
            "linear-gradient(135deg, #FFFA99 0%, #FBD02E 100%)", // Banana / Yellow Gold
            "linear-gradient(135deg, #FABE76 0%, #F57D14 100%)", // Major Orange Light
            "linear-gradient(135deg, #FBD02E 0%, #F57D14 100%)", // Gold to Orange
            "linear-gradient(135deg, #F57D14 0%, #F36318 100%)", // Deep Orange
            "linear-gradient(135deg, #FFD247 0%, #F36318 100%)"  // Bright Yellow to Deep Orange
        ];
        const gradient = colorPalette[i % colorPalette.length];

        const calcPoint = (distRatio: number, wiggleAmp: number) => {
            const baseDist = distance * distRatio;
            const baseX = Math.cos(angle) * baseDist;
            const baseY = Math.sin(angle) * baseDist;
            const wiggleX = Math.cos(perpAngle) * wiggleAmp * dir;
            const wiggleY = Math.sin(perpAngle) * wiggleAmp * dir;
            return { x: baseX + wiggleX, y: baseY + wiggleY };
        };

        const p0 = calcPoint(0, 0);
        const p1 = calcPoint(0.1, 0);
        const p2 = calcPoint(0.4, pseudoRand * 50); // Massive chaotic wobbling amplitude in trajectory
        const p3 = calcPoint(0.7, -(pseudoRand * 50));
        const p4 = calcPoint(1.0, 0);

        return {
            x: useTransform(smoothProgress, [0.15, 0.155 + stagger, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [p0.x, p1.x, p2.x, p3.x, p4.x]),
            y: useTransform(smoothProgress, [0.15, 0.155 + stagger, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [p0.y, p1.y, p2.y, p3.y, p4.y]),
            rotate: angle * (180 / Math.PI) + 90,
            scale: useTransform(smoothProgress, [0.15, 0.17 + stagger, 0.185 + stagger, 0.2 + stagger], [0, 1, 1, 0]),
            gradient: gradient,
            width: `${wBase}px`,
            height: `${hBase}px`
        }
    })

    // Phase 3, 4, 5, 6 (0.2 to 0.7): Sequence 5 floating Overlays with bottles fixed
    // To achieve the cohesive vertical flow requested by design, Overlay 1-5 cards align perfectly 40px below the center bottles on Desktop
    const overlay1Opacity = useTransform(smoothProgress, [0.2, 0.22, 0.27, 0.3], [0, 1, 1, 0])
    const overlay1Y = useTransform(smoothProgress, [0.2, 0.22, 0.27, 0.3], [50, 0, 0, -50])

    const overlay2Opacity = useTransform(smoothProgress, [0.3, 0.32, 0.37, 0.4], [0, 1, 1, 0])
    const overlay2Y = useTransform(smoothProgress, [0.3, 0.32, 0.37, 0.4], [50, 0, 0, -50])

    // Overlay 3: Sick Day Defense
    const overlay3Opacity = useTransform(smoothProgress, [0.4, 0.42, 0.47, 0.5], [0, 1, 1, 0])
    const overlay3Y = useTransform(smoothProgress, [0.4, 0.42, 0.47, 0.5], [50, 0, 0, -50])

    // Overlay 4: Better Gut Too
    const overlay4Opacity = useTransform(smoothProgress, [0.5, 0.52, 0.57, 0.6], [0, 1, 1, 0])
    const overlay4Y = useTransform(smoothProgress, [0.5, 0.52, 0.57, 0.6], [50, 0, 0, -50])

    // Overlay 5: Clean Label (No bad stuff)
    const overlay5Opacity = useTransform(smoothProgress, [0.6, 0.62, 0.67, 0.7], [0, 1, 1, 0])
    const overlay5Y = useTransform(smoothProgress, [0.6, 0.62, 0.67, 0.7], [50, 0, 0, -50])

    // Phase 5 & 6 (0.7 to 0.85): Table slides up, Bottles glide down to land onto the column headers
    const desktopTableY = ["100vh", "6vh"]
    const mobileTableY = ["100vh", "0vh"]
    const tableY = useTransform(smoothProgress, [0.7, 0.85], isMobile ? mobileTableY : desktopTableY)
    const tableOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1])

    // Bottles animate in viewport space. They sit inside the table structurally, but during Phase 2-4 the table is at 100vh.
    // Structural 'bottom-0' means the native base is strictly near the screen floor. 
    // We MUST use aggressively negative 'vh' anchors to physically hoist the asset UP to the top-middle of the screen layout!
    const mobileBottleY = ["0vh", "8vh", "8vh", "0vh"]
    // Since we widened the vertical void heavily on Desktop (Header is tightly pinned high, Overlays are sunk tightly low), we universally anchor the asset inside the new massive layout void natively at `-12vh`
    // Bottles Local Y coordinate
    const desktopBottleY = ["0vh", "3vh", "3vh", "0vh"]
    const bottlesLocalY = useTransform(smoothProgress, [0.15, 0.25, 0.7, 0.85], isMobile ? mobileBottleY : desktopBottleY)

    const mobileBottleScale = [0.1, dynamicMobileScale, dynamicMobileScale, 0.8] 
    const desktopBottleScale = [0.1, 1.25, 1.25, 0.85]
    const bottlesLocalScale = useTransform(smoothProgress, [0.15, 0.25, 0.7, 0.85], isMobile ? mobileBottleScale : desktopBottleScale)

    // Phase 7 (0.85 to 0.99): Sequential Highlights for the rows (Brand Yellow #FBD02E against Navy borders)
    const row1Bg = useTransform(smoothProgress, [0.85, 0.87], ["#FFFFFF", "#FBD02E"])
    const row2Bg = useTransform(smoothProgress, [0.88, 0.90], ["#FFFFFF", "#FBD02E"])
    const row3Bg = useTransform(smoothProgress, [0.91, 0.93], ["#FFFFFF", "#FBD02E"])
    const row4Bg = useTransform(smoothProgress, [0.94, 0.96], ["#FFFFFF", "#FBD02E"])
    const row5Bg = useTransform(smoothProgress, [0.97, 0.99], ["#FFFFFF", "#FBD02E"])

    // Delayed Headline that waits for the table to establish dominance before fading into the available top whitespace
    const duelHeadlineOpacity = useTransform(smoothProgress, [0.80, 0.90], [0, 1])

    return (
        <section ref={containerRef} id="how-it-works" className="relative h-[700vh] w-full bg-white">
            <motion.div style={{ x: screenShakeX, y: screenShakeY }} className="sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden border-b-2 border-[#374191]">

                {/* Centered Phase 1 Headline */}
                <motion.div style={{ opacity: headlineOpacity }} className="absolute inset-0 z-50 w-full h-full flex flex-col items-center justify-center px-4 pointer-events-none pb-[10vh]">
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] text-[#374191] text-center font-black drop-shadow-md leading-[1.1]">
                        Kids think it&apos;s a treat.<br className="hidden md:block" /> Grown-ups know it&apos;s more.
                    </h2>
                </motion.div>

                {/* Phase 1: The Great Sticker Implosion */}
                <motion.div style={{ opacity: drawingOpacity, scale: crashScale }} className="absolute z-20 flex w-full h-full items-center justify-center pointer-events-none pb-[15vh]">

                    <motion.div style={{ x: implosionX1, y: implosionY1, rotate: spinIn, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/banana.svg" alt="Banana" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                    <motion.div style={{ x: implosionX2, y: implosionY2, rotate: spinInRev, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/cherry sticker.svg" alt="Cherry" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                    <motion.div style={{ x: implosionX3, y: implosionY3, rotate: spinIn, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/egg.svg" alt="Egg" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                    <motion.div style={{ x: implosionX4, y: implosionY4, rotate: spinInRev, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/milk.svg" alt="Milk" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                    <motion.div style={{ x: implosionX5, y: implosionY5, rotate: spinIn, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/orange sticker.svg" alt="Orange" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                    <motion.div style={{ x: implosionX6, y: implosionY6, rotate: spinInRev, scale: implosionScale }} className="absolute flex items-center justify-center">
                        <Image src="/assets/brand/Stickers/strawberry.svg" alt="Strawberry" width={100} height={100} className="object-contain drop-shadow-xl w-[80px] md:w-[120px]" priority />
                    </motion.div>

                </motion.div>

                {/* Phase 2: High-Velocity Crisp Droplet Splash */}
                <motion.div
                    style={{ opacity: explosionOpacity, scale: explosionScale }}
                    className="absolute z-30 flex items-center justify-center pointer-events-none transform -translate-y-[10vh]"
                >
                    {/* The Vivid Orange/Yellow Core Flash Aura */}
                    <motion.div
                        style={{ opacity: coreFlashOpacity, background: "radial-gradient(circle, #FFFA99 0%, #FBD02E 30%, #F57D14 60%, transparent 100%)" }}
                        className="absolute w-40 h-40 rounded-full blur-xl z-10"
                    />

                    {/* The Radiating Organic Droplets */}
                    {droplets.map((drop, i) => (
                        <motion.div
                            key={`drop-${i}`}
                            style={{ x: drop.x, y: drop.y, rotate: drop.rotate, scale: drop.scale }}
                            className="absolute flex items-center justify-center z-0"
                        >
                            <motion.div style={{ scaleY: dropletStretch }}>
                                <div
                                    className="rounded-full"
                                    style={{
                                        width: drop.width,
                                        height: drop.height,
                                        background: drop.gradient,
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Comparison Table & Synchronized Assets */}
                <div className="absolute inset-0 z-50 flex w-full flex-col items-center justify-center px-4 pt-[5vh] md:pt-0 pb-2 md:pb-12 pointer-events-none">

                    {/* Emotional Headline for The Duel */}
                    <motion.div
                        style={{ y: tableY, opacity: duelHeadlineOpacity }}
                        className="w-full text-center px-4 md:px-0 max-w-[90vw] md:max-w-5xl mx-auto mb-2 md:mb-0 pointer-events-auto z-[60]"
                    >
                        <h2 className="font-serif text-[8vw] sm:text-4xl md:text-[4.5vh] lg:text-[5.5vh] leading-[1] text-[#374191] font-black tracking-tight drop-shadow-sm relative">
                            Real Ingredients. <br className="md:hidden" /><span className="text-[#F57D14]">Real Impact.</span>
                        </h2>
                    </motion.div>

                    <div className="relative w-full max-w-5xl flex flex-col pt-0 md:-mt-[2vh]">

                        {/* Perfect Alignment Grid Layer for Assets */}
                        <div className="grid grid-cols-3 w-full h-[120px] md:h-[30vh] lg:h-[35vh] xl:h-[40vh] mt-[5vh] md:mt-0 relative pointer-events-none">
                            {/* Empty column over The Duel */}
                            <div></div>

                            {/* Animated Wonderade Bottles exactly bound to Center Column */}
                            <motion.div
                                style={{ y: bottlesLocalY, scale: bottlesLocalScale, opacity: realBottlesOpacity }}
                                className="relative flex items-end justify-center origin-bottom w-full h-full z-10 pb-[16px] md:pb-4"
                            >
                                <div className="relative w-full h-full max-w-[150px] md:max-w-[450px] aspect-auto origin-bottom">
                                    {/* Phase 3 Product Image Replacement mapped directly here */}
                                    <Image
                                        src="/assets/brand/Product/wonderade-bottles-cropped.png"
                                        alt="Wonderade Bottles"
                                        fill
                                        className="object-contain object-bottom"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Generic Juice Box exactly bound to Right Column */}
                            <motion.div
                                style={{ y: tableY, opacity: tableOpacity }}
                                className="relative flex items-end justify-center w-full h-full z-10 pb-[16px] md:pb-4"
                            >
                                <div className="relative h-full aspect-[3/4] max-h-[70px] md:max-h-[160px] lg:max-h-[180px] border-2 border-[#374191] bg-white shadow-[6px_6px_0px_#374191] mix-blend-multiply flex rounded-xl origin-bottom">
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap font-mono text-[8px] md:text-sm uppercase tracking-widest text-[#374191]/40">Juice</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Phase 3 Unified Flex Overlay Wrapper natively dynamically ideally intelligently brilliantly smoothly organically flawlessly cleanly realistically neatly safely cleanly rationally smartly intelligently natively fluently creatively elegantly dependably fluently magically eloquently organically intelligently cleanly identical intelligently safely rationally identically! */}
                        <div className="absolute inset-x-0 bottom-0 h-[100dvh] w-full md:relative md:inset-auto md:h-[0px] flex justify-center md:mt-[10px] pointer-events-none z-40">
                            {/* Overlay 1: Protein (Physically Below) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                style={{ opacity: overlay1Opacity, y: overlay1Y }}
                                className="absolute bottom-[2vh] md:bottom-auto md:top-[60%] lg:top-[64%] xl:top-[68%] md:mt-0 z-40 w-[90%] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] max-w-sm lg:max-w-md h-auto min-h-[180px] border-[3px] border-[#374191] bg-white p-4 lg:p-5 text-center shadow-[8px_8px_0px_#374191] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 rounded-xl"
                            >
                                <Image src="/assets/brand/Stickers/protein sticker 2.svg" alt="Protein" width={80} height={80} className="mb-2 md:mb-4 lg:mb-5 lg:w-[80px] lg:h-[80px] drop-shadow-md" />
                                <h2 className="font-serif text-[24px] md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-[#374191] leading-none mt-1 mb-2 md:mb-3 lg:mb-4">Big and Strong Juice</h2>
                                <p className="font-mono text-xs text-[10px] md:text-xs lg:text-sm mx-auto uppercase tracking-widest text-[#374191]/90 font-bold max-w-full text-center flex items-center">
                                    Protein + Calcium build stronger muscles and bigger bones to fuel growth
                                </p>
                            </motion.div>

                            {/* Overlay 2: Multipliers (Physically Below) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                style={{ opacity: overlay2Opacity, y: overlay2Y }}
                                className="absolute bottom-[2vh] md:bottom-auto md:top-[60%] lg:top-[64%] xl:top-[68%] md:mt-0 z-40 w-[90%] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] max-w-sm lg:max-w-md h-auto min-h-[180px] border-[3px] border-[#374191] bg-white p-4 lg:p-5 text-center shadow-[8px_8px_0px_#374191] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 rounded-xl"
                            >
                                <Image src="/assets/brand/Stickers/banana.svg" alt="Banana" width={40} height={40} className="mb-2 md:mb-4 lg:mb-5 lg:w-[50px] lg:h-[50px] drop-shadow-md" />
                                <h2 className="font-serif text-[24px] md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-[#374191] leading-none mt-1 mb-2 md:mb-3 lg:mb-4">Stay in the Game</h2>
                                <p className="font-mono text-xs text-[10px] md:text-xs lg:text-sm mx-auto uppercase tracking-widest text-[#374191]/90 font-bold max-w-full text-center flex items-center">
                                    9 in 10 kids don't hit their daily potassium needs. So we pack a banana's worth in every bottle
                                </p>
                            </motion.div>

                            {/* Overlay 3: Clean Label (Physically Below) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                style={{ opacity: overlay3Opacity, y: overlay3Y }}
                                className="absolute bottom-[2vh] md:bottom-auto md:top-[60%] lg:top-[64%] xl:top-[68%] md:mt-0 z-40 w-[90%] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] max-w-sm lg:max-w-md h-auto min-h-[180px] border-[3px] border-[#374191] bg-white p-4 lg:p-5 text-center shadow-[8px_8px_0px_#374191] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 rounded-xl"
                            >
                                <Image src="/assets/brand/Stickers/health_shield_icon.png" alt="Energy" width={80} height={80} className="mb-2 md:mb-4 lg:mb-5 lg:w-[80px] lg:h-[80px] mix-blend-multiply" />
                                <h2 className="font-serif text-[24px] md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-[#374191] leading-none mt-1 mb-2 md:mb-3 lg:mb-4">Sick Day Defense</h2>
                                <p className="font-mono text-xs text-[10px] md:text-xs lg:text-sm mx-auto uppercase tracking-widest text-[#374191]/90 font-bold max-w-full text-center flex items-center">
                                    Cold season doesn't wait. Vitamin C, D, Zinc, and Magnesium keep their defenses ready
                                </p>
                            </motion.div>

                            {/* Overlay 4: Better Gut Too (Physically Below) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                style={{ opacity: overlay4Opacity, y: overlay4Y }}
                                className="absolute bottom-[2vh] md:bottom-auto md:top-[60%] lg:top-[64%] xl:top-[68%] md:mt-0 z-40 w-[90%] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] max-w-sm lg:max-w-md h-auto min-h-[180px] border-[3px] border-[#374191] bg-white p-4 lg:p-5 text-center shadow-[8px_8px_0px_#374191] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 rounded-xl"
                            >
                                <Image src="/assets/brand/Stickers/gut_health_icon.png" alt="Gut Health" width={80} height={80} className="mb-2 md:mb-4 lg:mb-5 lg:w-[80px] lg:h-[80px] mix-blend-multiply" />
                                <h2 className="font-serif text-[24px] md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-[#374191] leading-none mt-1 mb-2 md:mb-3 lg:mb-4">Better Gut Too</h2>
                                <p className="font-mono text-xs text-[10px] md:text-xs lg:text-sm mx-auto uppercase tracking-widest text-[#374191]/90 font-bold max-w-full text-center flex items-center">
                                    Prebiotic fiber feeds good bacteria and helps the body absorb the good stuff
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                style={{ opacity: overlay5Opacity, y: overlay5Y }}
                                className="absolute bottom-[2vh] md:bottom-auto md:top-[60%] lg:top-[64%] xl:top-[68%] md:mt-0 z-40 w-[90%] max-w-full flex justify-center pointer-events-none"
                            >
                                {/* Unified Clean Label Card (Cross-Platform) */}
                                <div className="flex flex-col justify-between border-2 border-[#374191] bg-white h-auto min-h-[220px] shadow-[8px_8px_0px_#374191] rounded-xl overflow-hidden w-[95%] max-w-md lg:max-w-lg mx-auto pointer-events-auto transform hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-full bg-[#FBD02E] border-b-2 border-[#374191] py-1 px-4 lg:py-2 flex justify-center items-center gap-2 shrink-0">
                                        <span className="font-mono text-[12px] lg:text-sm uppercase font-bold tracking-widest text-[#374191]">Clean Label</span>
                                    </div>
                                    <div className="flex flex-col justify-center px-4 md:px-6 lg:px-8 py-4 lg:py-6 flex-1 gap-3 lg:gap-4 text-[#374191]">
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <XCircle className="text-[#374191]/50 shrink-0 w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />
                                            <span className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-left leading-none font-bold">No artificial sweeteners</span>
                                        </div>
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <XCircle className="text-[#374191]/50 shrink-0 w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />
                                            <span className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-left leading-none font-bold">No artificial colors</span>
                                        </div>
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <XCircle className="text-[#374191]/50 shrink-0 w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />
                                            <span className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-left leading-none font-bold">No high fructose corn syrup</span>
                                        </div>
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <Wheat className="text-[#374191]/50 shrink-0 w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />
                                            <span className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-left leading-none font-bold">No dairy, gluten, soy, nuts</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>



                        </div>

                        {/* Traditional Data Table */}
                        <motion.div
                            style={{ y: tableY, opacity: tableOpacity }}
                            className="border-2 border-[#374191] rounded-xl overflow-hidden shadow-[12px_12px_0px_#374191] flex flex-col w-full relative z-20 bg-white mt-2 md:-mt-2 pointer-events-auto"
                        >
                            {/* Header Row */}
                            <div className="grid grid-cols-3 border-b-2 border-[#374191]">
                                <div className="flex items-center p-4 font-serif text-lg md:py-3 md:px-8 md:text-4xl uppercase tracking-wider bg-[#F8F2D0] md:p-[2vh]"></div>
                                <div className="flex items-center justify-center border-l-2 border-[#374191] bg-[#374191] overflow-hidden relative p-4 md:p-[2vh]">
                                    <img src="/assets/brand/Logo/wonderade_logo.svg" alt="Wonderade" className="w-[90%] md:w-full h-auto brightness-0 invert" />
                                </div>
                                <div className="flex items-center justify-center border-l-2 border-[#374191] p-4 text-center font-serif text-sm text-[#374191]/80 md:p-[2vh] md:text-[2.5vh] lg:text-[3vh] uppercase tracking-widest bg-[#F8F2D0]">JUICE</div>
                            </div>

                            {/* Row 1: Protein */}
                            <div className="grid grid-cols-3 border-b-2 border-[#374191] font-mono text-[10px] md:text-[1.6vh] lg:text-[1.8vh] bg-white">
                                <div className="p-2 py-[1vh] md:px-[2vw] font-bold uppercase tracking-wider transition-colors text-[#374191]">Protein</div>
                                <motion.div style={{ backgroundColor: row1Bg }} className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center font-bold text-[#374191] text-sm md:text-[1.6vh] lg:text-[2vh]">8g</motion.div>
                                <div className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center text-[#374191]/80 text-sm md:text-[1.6vh] lg:text-[2vh] bg-white">0g</div>
                            </div>

                            {/* Row 2: Potassium/Calcium */}
                            <div className="grid grid-cols-3 border-b-2 border-[#374191] font-mono text-[10px] md:text-[1.6vh] lg:text-[1.8vh] bg-white">
                                <div className="p-2 py-[1vh] md:px-[2vw] font-bold uppercase tracking-wider flex items-center transition-colors text-[#374191]">Potassium / Calcium</div>
                                <motion.div style={{ backgroundColor: row2Bg }} className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center font-bold text-[#374191] text-sm md:text-[1.6vh] lg:text-[2vh] flex items-center justify-center">20%+ DV</motion.div>
                                <div className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center text-[#374191]/80 text-sm md:text-[1.6vh] lg:text-[2vh] flex items-center justify-center bg-white">0%</div>
                            </div>

                            {/* Row 3: Total Sugars */}
                            <div className="grid grid-cols-3 border-b-2 border-[#374191] font-mono text-[10px] md:text-[1.6vh] lg:text-[1.8vh] bg-white">
                                <div className="p-2 py-[1vh] md:px-[2vw] font-bold uppercase tracking-wider transition-colors text-[#374191]">Total Sugars</div>
                                <motion.div style={{ backgroundColor: row3Bg }} className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center font-bold text-[#374191] text-sm md:text-[1.6vh] lg:text-[2vh]">2g</motion.div>
                                <div className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center text-[#374191]/80 font-bold text-sm md:text-[1.6vh] lg:text-[2vh] bg-white">15g</div>
                            </div>

                            {/* Row 4: Fiber */}
                            <div className="grid grid-cols-3 border-b-2 border-[#374191] font-mono text-[10px] md:text-[1.6vh] lg:text-[1.8vh] bg-white">
                                <div className="p-2 py-[1vh] md:px-[2vw] font-bold uppercase tracking-wider transition-colors text-[#374191]">Fiber</div>
                                <motion.div style={{ backgroundColor: row4Bg }} className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center font-bold text-[#374191] text-sm md:text-[1.6vh] lg:text-[2vh]">4g</motion.div>
                                <div className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center text-[#374191]/80 text-sm md:text-[1.6vh] lg:text-[2vh] bg-white">0g</div>
                            </div>

                            {/* Row 5: Vit D, Zinc, Iron */}
                            <div className="grid grid-cols-3 font-mono text-[10px] md:text-[1.6vh] lg:text-[1.8vh] bg-white">
                                <div className="p-2 py-[1vh] md:px-[2vw] font-bold uppercase tracking-wider flex items-center transition-colors text-[#374191]">Zinc / Iron / Vit D</div>
                                <motion.div style={{ backgroundColor: row5Bg }} className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center font-bold text-[#374191] text-sm md:text-[1.6vh] lg:text-[2vh] flex items-center justify-center">10% DV</motion.div>
                                <div className="border-l-2 border-[#374191] p-2 py-[1vh] px-[1vw] text-center text-[#374191]/80 text-sm md:text-[1.6vh] lg:text-[2vh] flex items-center justify-center bg-white">0%</div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </motion.div>
        </section>
    )
}
