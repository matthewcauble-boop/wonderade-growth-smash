import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-[9999] w-full border-b border-black bg-white">
            <div className="flex h-20 items-center justify-between pl-4 md:pl-8">
                <div className="flex items-center gap-6 lg:gap-8">
                    <Link href="/" className="flex items-center h-[40px] sm:h-[48px] md:h-[76px] shrink-0 mr-12 md:mr-[120px] lg:mr-[150px]">
                        <img src="/wonderade-logo.svg" alt="Wonderade Logo" className="w-auto h-full object-contain object-left scale-150 origin-left" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 lg:gap-10 font-mono text-xs lg:text-sm font-bold uppercase tracking-widest text-black/80">
                        <Link href="#how-it-works" className="hover:text-[#FF5C00] transition-colors">How it works</Link>
                        <Link href="#flavors" className="hover:text-[#FF5C00] transition-colors">Flavors</Link>
                        <Link href="#compare" className="hover:text-[#FF5C00] transition-colors">Compare</Link>
                    </nav>
                </div>

                <Button asChild className="px-3 md:px-6 py-0 shrink-0 whitespace-nowrap text-[11px] sm:text-xs md:text-base tracking-normal md:tracking-widest shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-none active:translate-x-0 active:translate-y-0 border-l border-b-0 border-t-0 border-r-0 h-full !border-l-black rounded-none">
                    <Link href="#checkout" className="font-bold">
                        BUY NOW
                    </Link>
                </Button>
            </div>
        </header>
    )
}
