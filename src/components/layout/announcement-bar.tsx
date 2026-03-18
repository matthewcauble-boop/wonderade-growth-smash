import React from "react";

export function AnnouncementBar() {
    const text = "PROTEIN: 8G  //  FIBER: 4G  //  ELECTROLYTES: 100%  //  IMMUNITY: VITAMIN C + D  //  SUGAR: 0G ADDED  //  NO JUNK  //  REAL FRUIT  //  ";

    return (
        <div className="relative flex w-full overflow-hidden bg-black py-2.5 border-b-2 border-white">
            <div className="animate-marquee whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest text-white">
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest text-white py-2.5">
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
            </div>
        </div>
    );
}
