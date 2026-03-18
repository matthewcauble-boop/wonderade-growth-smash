"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

interface LiquidScrubPlayerProps {
    videoSrc: string
}

export function LiquidScrubPlayer({ videoSrc }: LiquidScrubPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    // 1. Setup Scroll Tracking on the 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // 2. Ensure Video Metadata is loaded before scrubbing to prevent jumps
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedMetadata = () => {
            setIsLoaded(true)
        }

        // If it's already loaded (e.g., from cache), set true immediately
        if (video.readyState >= 1) {
            setIsLoaded(true)
        } else {
            video.addEventListener("loadedmetadata", handleLoadedMetadata)
        }

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }
    }, [])

    // 3. Map Scroll Progress (0 to 1) to Video Current Time
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const video = videoRef.current
        if (!video || !isLoaded || isNaN(video.duration)) return

        // Calculate target time based on scroll percentage and total video duration
        const targetTime = latest * video.duration

        // Use requestAnimationFrame for smoother scrubbing if needed, or set directly
        video.currentTime = targetTime
    })

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full bg-black">
            {/* Sticky Container holds the video perfectly in the viewport while scrolling the 300vh parent */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 
                  Video Settings:
                  - muted, playsInline: Required for programmatic playback/scrubbing on mobile
                  - preload="auto": Ensures metadata is ready
                  - object-cover: Fills the screen flawlessly
                */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="h-full w-full object-cover pointer-events-none"
                    muted
                    playsInline
                    preload="auto"
                />

                {/* Optional Loading State / Brutalist Overlay */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white font-mono text-xl uppercase tracking-widest z-10">
                        Loading Sequence...
                    </div>
                )}
            </div>
        </section>
    )
}
