"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

/**
 * The "alive" hero product: pick a flavor -> the carton does one full 360
 * with motion blur and a swoosh, settles front-facing with a bounce, and the
 * title, tagline and ambient theme morph to match.
 *
 * Canonical packaging only (carton-*.png = the approved BIG & STRONG JUICE
 * DRINK renders). The spin is the real PNG on a 3D-rotating card, so the
 * label always stays exact.
 */

type FlavorId = "mo" | "pp"

const FLAVORS: Record<
    FlavorId,
    {
        name: string
        tagline: string
        carton: string
        accent: string     // headline color
        tint: string       // section wash
        chipRing: string
        /** the label character, overlaid + animated so the print "wakes up" */
        character: { src: string; left: string; top: string; width: string }
        doodles: { src: string; className: string; float: number }[]
    }
> = {
    mo: {
        name: "MAJOR ORANGE",
        tagline: "Classic orange juice vibes. Zero junk.",
        carton: "/assets/brand/Product/carton-major-orange.png",
        accent: "#F57D14",
        tint: "#E9F7F6",
        chipRing: "#F57D14",
        character: { src: "/characters/major-orange.png", left: "6.5%", top: "49.5%", width: "62%" },
        doodles: [
            { src: "/assets/brand/Stickers/orange.svg", className: "left-[6%] top-[12%] w-14 md:w-20 -rotate-12", float: 5.5 },
            { src: "/assets/brand/Stickers/orange sticker.svg", className: "right-[8%] top-[30%] w-12 md:w-16 rotate-6", float: 7 },
            { src: "/assets/brand/Stickers/shimmer.svg", className: "left-[14%] bottom-[24%] w-8 md:w-10", float: 4.5 },
            { src: "/assets/brand/Stickers/green-leaves.svg", className: "right-[12%] bottom-[14%] w-12 md:w-16 rotate-12", float: 6 },
        ],
    },
    pp: {
        name: "PRINCESS PUNCH",
        tagline: "Real fruit punch power. Zero junk.",
        carton: "/assets/brand/Product/carton-princess-punch.png",
        accent: "#ED1E7A",
        tint: "#FDEEF4",
        chipRing: "#ED1E7A",
        character: { src: "/characters/princess-punch.png", left: "25%", top: "37%", width: "46%" },
        doodles: [
            { src: "/assets/brand/Stickers/strawberry.svg", className: "left-[7%] top-[14%] w-12 md:w-16 -rotate-6", float: 6 },
            { src: "/assets/brand/Stickers/cherry sticker.svg", className: "right-[7%] top-[26%] w-12 md:w-16 rotate-12", float: 5 },
            { src: "/assets/brand/Stickers/shimmer.svg", className: "right-[16%] bottom-[30%] w-8 md:w-10", float: 4.5 },
            { src: "/assets/brand/Stickers/strawberry.svg", className: "left-[16%] bottom-[12%] w-9 md:w-12 rotate-6", float: 7 },
        ],
    },
}

const ORDER: FlavorId[] = ["mo", "pp"]

/** Tiny synthesized swoosh -- filtered noise sweep, no asset, ~0.35s. */
function playSwoosh() {
    try {
        type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }
        const Ctx = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext
        if (!Ctx) return
        const ctx = new Ctx()
        const dur = 0.35
        const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
        const src = ctx.createBufferSource()
        src.buffer = buffer
        const filter = ctx.createBiquadFilter()
        filter.type = "bandpass"
        filter.Q.value = 1.2
        filter.frequency.setValueAtTime(300, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + dur * 0.7)
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
        src.connect(filter).connect(gain).connect(ctx.destination)
        src.start()
        src.onended = () => ctx.close()
    } catch {
        /* audio is a garnish, never an error */
    }
}

export function FlavorShowcase() {
    const [flavor, setFlavor] = useState<FlavorId>("mo")
    const [interacted, setInteracted] = useState(false)
    const reduceMotion = useReducedMotion()
    const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null)

    const select = useCallback(
        (id: FlavorId, viaUser: boolean) => {
            setFlavor((prev) => {
                if (prev === id) return prev
                if (viaUser) playSwoosh()
                return id
            })
            if (viaUser) setInteracted(true)
        },
        []
    )

    /* attract mode: auto-cycle until the first real interaction */
    useEffect(() => {
        if (interacted || reduceMotion) return
        idleTimer.current = setInterval(() => {
            setFlavor((prev) => (prev === "mo" ? "pp" : "mo"))
        }, 7000)
        return () => {
            if (idleTimer.current) clearInterval(idleTimer.current)
        }
    }, [interacted, reduceMotion])

    const f = FLAVORS[flavor]

    return (
        <motion.div
            className="relative w-full h-full rounded-3xl"
            animate={{ backgroundColor: f.tint }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* giant flavor name BEHIND the carton — the carton overlaps it.
                Both names stay mounted (crossfade only): AnimatePresence
                mode="wait" drops the enter phase when attract-mode swaps
                interrupt each other on a throttled tab. */}
            <div className="absolute inset-x-0 top-[6%] md:top-[8%] z-0 pointer-events-none select-none">
                {ORDER.map((id) => {
                    const fl = FLAVORS[id]
                    const active = id === flavor
                    return (
                        <motion.div
                            key={id}
                            className="absolute inset-x-0 text-center leading-[0.85]"
                            initial={false}
                            animate={{ opacity: active ? 0.9 : 0, scale: active ? 1 : 0.94 }}
                            transition={{ duration: 0.45, delay: active && !reduceMotion ? 0.25 : 0 }}
                        >
                            {fl.name.split(" ").map((word) => (
                                <div
                                    key={word}
                                    className="font-sans font-black uppercase tracking-tight text-[clamp(3.2rem,8.5vw,8rem)]"
                                    style={{ color: fl.accent }}
                                >
                                    {word}
                                </div>
                            ))}
                        </motion.div>
                    )
                })}
            </div>
            {/* ambient doodles, themed per flavor */}
            <AnimatePresence mode="sync">
                {f.doodles.map((d, i) => (
                    <motion.div
                        key={`${flavor}-${d.src}-${i}`}
                        className={`pointer-events-none absolute ${d.className}`}
                        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                        animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: d.float, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={d.src} alt="" className="w-full h-auto" draggable={false} />
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* the carton: keyed by flavor so each selection replays the spin.
                Absolutely layered over the giant name; taller than the panel
                so it pops past the rounded edges. */}
            <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ perspective: 1200 }}>
                <AnimatePresence mode="popLayout">
                    {/* exact image aspect so overlay % maps 1:1 onto artwork
                        (object-contain letterboxing would silently shift the character) */}
                    <motion.div
                        key={flavor}
                        className="relative h-[100%] md:h-[106%]"
                        initial={reduceMotion ? { opacity: 0 } : { rotateY: 0, opacity: 1 }}
                        animate={
                            reduceMotion
                                ? { opacity: 1 }
                                : {
                                      rotateY: [0, 360],
                                      filter: ["blur(0px)", "blur(7px)", "blur(0px)"],
                                      y: [0, 0, -12, 0],
                                      transition: {
                                          rotateY: { duration: 0.85, ease: [0.5, 0, 0.15, 1] },
                                          filter: { duration: 0.85, times: [0, 0.5, 1] },
                                          y: { duration: 1.15, times: [0, 0.74, 0.87, 1] },
                                      },
                                  }
                        }
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        style={{ transformStyle: "preserve-3d", aspectRatio: flavor === "mo" ? "601/1024" : "612/1024" }}
                    >
                        {/* gentle idle float after the spin settles */}
                        <motion.div
                            className="relative w-full h-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                        >
                            <Image
                                src={f.carton}
                                alt={`Wonderade ${f.name} box`}
                                fill
                                priority
                                className="object-contain drop-shadow-[0_18px_24px_rgba(55,65,145,0.25)]"
                            />
                            {/* the label character, alive: covers its printed self and moves */}
                            <motion.div
                                className="absolute pointer-events-none"
                                style={{ left: f.character.left, top: f.character.top, width: f.character.width }}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: [0.7, 1.12, 1] }}
                                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.95, times: [0, 0.7, 1] }}
                            >
                                <motion.div
                                    animate={
                                        reduceMotion
                                            ? {}
                                            : {
                                                  rotate: [0, -1.5, 1.5, -1, 0],
                                                  y: ["0%", "-2.5%", "0%", "-1.5%", "0%"],
                                                  scale: [1, 1.03, 1, 1.045, 1],
                                              }
                                    }
                                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
                                    className="origin-bottom"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={f.character.src}
                                        alt=""
                                        className="w-full h-auto drop-shadow-[0_4px_6px_rgba(55,65,145,0.35)]"
                                        draggable={false}
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* tagline, tucked at the panel's bottom edge (always-mounted crossfade) */}
            <div className="absolute inset-x-0 bottom-[4.5rem] md:bottom-[5.5rem] z-20 pointer-events-none">
                {ORDER.map((id) => {
                    const fl = FLAVORS[id]
                    const active = id === flavor
                    return (
                        <motion.div
                            key={id}
                            className="absolute inset-x-0 text-center px-4"
                            initial={false}
                            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                            transition={{ duration: 0.3, delay: active && !reduceMotion ? 0.35 : 0 }}
                        >
                            <span className="inline-block bg-white/85 backdrop-blur-sm rounded-full px-4 py-1.5 border-2 border-[#374191] shadow-[3px_3px_0px_#374191] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#374191]">
                                {fl.tagline}
                            </span>
                        </motion.div>
                    )
                })}
            </div>

            {/* flavor picker chips, floating over the stage */}
            <div className="absolute inset-x-0 bottom-4 md:bottom-5 z-20 flex items-center justify-center gap-3">
                {ORDER.map((id) => {
                    const fl = FLAVORS[id]
                    const active = id === flavor
                    return (
                        <motion.button
                            key={id}
                            type="button"
                            aria-label={`Choose ${fl.name}`}
                            aria-pressed={active}
                            onClick={() => select(id, true)}
                            onMouseEnter={() => select(id, true)}
                            whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
                            whileTap={{ scale: 0.94 }}
                            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#374191] flex items-center justify-center transition-shadow"
                            style={{
                                boxShadow: active
                                    ? `0 0 0 3px ${fl.chipRing}, 3px 3px 0px #374191`
                                    : "3px 3px 0px #374191",
                            }}
                        >
                            <div className="relative w-8 h-11 md:w-9 md:h-12">
                                <Image src={fl.carton} alt="" fill className="object-contain" />
                            </div>
                        </motion.button>
                    )
                })}
            </div>
        </motion.div>
    )
}
