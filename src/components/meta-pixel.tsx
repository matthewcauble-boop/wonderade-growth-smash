"use client"

import Script from "next/script"

// Meta pixel, gated on NEXT_PUBLIC_META_PIXEL_ID so builds and previews without it stay tracker-free.
// The claim form fires Lead with an eventID; the /api/klaviyo route sends the same event server-side
// (Conversions API) with the same id so Meta deduplicates the pair.
export function MetaPixel() {
    const id = process.env.NEXT_PUBLIC_META_PIXEL_ID
    if (!id) return null
    return (
        <>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');fbq('track','PageView');`}
            </Script>
            <noscript>
                <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} />
            </noscript>
        </>
    )
}

type Fbq = (...args: unknown[]) => void

export function trackMeta(event: string, params: Record<string, unknown> = {}, eventId?: string) {
    if (typeof window === "undefined") return
    const fbq = (window as unknown as { fbq?: Fbq }).fbq
    if (!fbq) return
    fbq("track", event, params, eventId ? { eventID: eventId } : undefined)
}
