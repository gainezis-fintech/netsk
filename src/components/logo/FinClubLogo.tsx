import * as React from "react"
import { cn } from "@/lib/utils"

export function FinClubLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 28"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("font-sans", className)}
      {...props}
    >
      <text 
        x="0" 
        y="22" 
        fontFamily="Arial, sans-serif" 
        fontSize="28" 
        fontWeight="bold" 
        fill="#2A3D95"
      >
        Fin
      </text>
      <circle cx="43" cy="5" r="5" fill="#2A3D95" />
      <text 
        x="58" 
        y="22" 
        fontFamily="Arial, sans-serif" 
        fontSize="28" 
        fontWeight="bold" 
        fill="#E85A4F"
      >
        Club
      </text>
    </svg>
  );
}
