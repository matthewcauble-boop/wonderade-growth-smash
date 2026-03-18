import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative",
                className
            )}
            {...props}
        />
    )
)
Card.displayName = "Card"

export { Card }
