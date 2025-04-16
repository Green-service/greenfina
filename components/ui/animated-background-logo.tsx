"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function AnimatedBackgroundLogo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute opacity-[0.07]"
        style={{
          top: "50%",
          left: "50%",
          width: "80vw",
          height: "80vw",
          maxWidth: "1000px",
          maxHeight: "1000px",
        }}
        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
        animate={{
          opacity: 0.07,
          scale: [0.8, 0.85, 0.8],
          rotate: [0, 10, 0, -10, 0],
          x: "-50%",
          y: "-50%",
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Green Fina Logo Background"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Additional floating elements */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-green-500/5 blur-xl"
        style={{ top: "30%", left: "20%" }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-40 h-40 rounded-full bg-sky-500/5 blur-xl"
        style={{ bottom: "20%", right: "15%" }}
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
