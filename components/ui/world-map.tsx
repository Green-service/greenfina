"use client"

import { useRef } from "react"
import DottedMap from "dotted-map"
import { useTheme } from "next-themes"

interface MapProps {
  lineColor?: string
  focus?: "global" | "south-africa" | "gauteng"
}

export function WorldMap({
  lineColor = "#FACC15", // Yellow-500
  focus = "global",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Create the map without the problematic region parameter
  const map = new DottedMap({ height: 100, grid: "diagonal" })

  const { theme } = useTheme()

  const svgMap = map.getSVG({
    radius: 0.35, // Increased dot size
    color: "#FACC1540", // Yellow with transparency
    shape: "circle",
    backgroundColor: "transparent",
  })

  return (
    <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans">
      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZBQ0MxNTEwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-50"></div>

      {/* South Africa map outline */}
      <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none z-10">
        {/* Glow filter for futuristic effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* South Africa outline - simplified path */}
        <path
          d="M350,150 L400,140 L450,145 L500,160 L550,190 L580,230 L590,270 L570,310 L530,330 L480,340 L430,335 L380,320 L340,290 L310,250 L300,210 L320,170 L350,150"
          fill="none"
          stroke="#FACC1530"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* South Africa label */}
        <text
          x="400"
          y="240"
          textAnchor="middle"
          fill="#FACC15"
          fontSize="24"
          fontWeight="bold"
          filter="url(#textGlow)"
          className="font-mono tracking-wider"
        >
          SOUTH AFRICA
        </text>

        {/* Blinking dot for Gauteng/Johannesburg */}
        <circle cx="410" cy="210" r="5" fill="#FACC15" filter="url(#glow)">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Pulsing effect around dot */}
        <circle cx="410" cy="210" r="10" fill="none" stroke="#FACC15" strokeWidth="1" opacity="0.7">
          <animate attributeName="r" from="10" to="30" dur="2s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
