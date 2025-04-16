"use client"
import { WorldMap } from "@/components/ui/world-map"

export function WorldMapDemo() {
  return (
    <div className="py-40 bg-gradient-to-b from-[#030303] to-[#050505] w-full relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent opacity-40"></div>

      <div className="relative z-10">
        <WorldMap
          focus="south-africa"
          lineColor="#FACC15" // Yellow-500
        />
      </div>

      {/* Futuristic decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="h-1 w-40 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>
    </div>
  )
}
