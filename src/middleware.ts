import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const ref = url.searchParams.get('ref')
    
    // If there is no active referral token in the incoming URL request, just seamlessly continue native Next.js routing
    if (!ref) return NextResponse.next()

    // Otherwise, clone the standard runtime response context to explicitly inject the active tracking cookie
    const response = NextResponse.next()
    
    // Securely mint the referral mapping into the browser session matrix (valid for exactly 30 days)
    response.cookies.set('wonderade_referral_id', ref, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days mathematical expiration window
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // Completely shields the critical tracking parameter from malicious cross-site scripting (XSS) client extraction
    })

    return response
}

export const config = {
    // Only strictly engage the interceptor parser linearly on the core operational frontend pages
    matcher: ['/', '/v2', '/claim'],
}
