import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AnimatedBackgroundLogo } from "@/components/ui/animated-background-logo"

interface FuturisticLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function FuturisticLayout({ children, title, description }: FuturisticLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="relative">
        <AnimatedBackgroundLogo />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent mb-4"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-white/70 mb-8"
              >
                {description}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 