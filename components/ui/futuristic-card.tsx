import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FuturisticCardProps {
  title: string
  description: string
  icon?: ReactNode
  className?: string
}

export function FuturisticCard({ title, description, icon, className = "" }: FuturisticCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="relative z-10">
        {icon && <div className="mb-4 text-green-500">{icon}</div>}
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-white/70">{description}</p>
      </div>
    </motion.div>
  )
} 