"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Floating particle component for background effect
function FloatingParticle({
  size = 4,
  color = "green",
  delay = 0,
  duration = 20,
  x = 0,
  y = 0,
}: {
  size?: number
  color?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: `${color}-500`,
        opacity: 0.4,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.4, 0.2, 0.4, 0],
        x: [0, 20, -30, 10, 0],
        y: [0, -30, -10, -20, 0],
        scale: [1, 1.2, 0.8, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  )
}

// Animated line component
function AnimatedLine({
  startX = 20,
  startY = 20,
  endX = 80,
  endY = 80,
  color = "rgba(16, 185, 129, 0.2)",
  delay = 0,
  duration = 8,
}: {
  startX?: number
  startY?: number
  endX?: number
  endY?: number
  color?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: 1,
        height: 1,
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <svg
        style={{
          position: "absolute",
          width: `${Math.abs(endX - startX)}%`,
          height: `${Math.abs(endY - startY)}%`,
          left: startX > endX ? `${endX - startX}%` : 0,
          top: startY > endY ? `${endY - startY}%` : 0,
        }}
      >
        <motion.line
          x1={startX > endX ? "100%" : "0%"}
          y1={startY > endY ? "100%" : "0%"}
          x2={startX > endX ? "0%" : "100%"}
          y2={startY > endY ? "0%" : "100%"}
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  animationType = "default",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  animationType?: "default" | "pulse" | "orbit" | "bounce"
}) {
  // Different animation patterns
  const animations = {
    default: {
      initial: { opacity: 0, y: -150, rotate: rotate - 15 },
      animate: { opacity: 1, y: 0, rotate },
      transition: {
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      },
      childAnimate: { y: [0, 15, 0] },
      childTransition: {
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    pulse: {
      initial: { opacity: 0, scale: 0.8, rotate: rotate - 15 },
      animate: { opacity: 1, scale: 1, rotate },
      transition: {
        duration: 2,
        delay,
        ease: "easeOut",
      },
      childAnimate: {
        scale: [1, 1.05, 0.95, 1],
        opacity: [0.8, 1, 0.9, 0.8],
      },
      childTransition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    orbit: {
      initial: { opacity: 0, x: -100, rotate: rotate - 30 },
      animate: { opacity: 1, x: 0, rotate },
      transition: {
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
      childAnimate: {
        x: [0, 30, 0, -30, 0],
        y: [0, 15, 30, 15, 0],
        rotate: [0, 10, 0, -10, 0],
      },
      childTransition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    bounce: {
      initial: { opacity: 0, y: 100, rotate: rotate + 15 },
      animate: { opacity: 1, y: 0, rotate },
      transition: {
        duration: 1.8,
        delay,
        ease: "backOut",
      },
      childAnimate: {
        y: [0, -20, 0],
        scale: [1, 0.95, 1],
      },
      childTransition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const animation = animations[animationType]

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={animation.childAnimate}
        transition={animation.childTransition}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// Animated text that reveals character by character
function AnimatedText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  children,
}: {
  badge?: string
  title1?: string
  title2?: string
  description?: string
  children?: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    size: Math.random() * 6 + 2,
    color: Math.random() > 0.7 ? "emerald" : "green",
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  // Generate random connecting lines
  const lines = [
    { startX: 20, startY: 30, endX: 40, endY: 60, delay: 2, duration: 12 },
    { startX: 80, startY: 20, endX: 60, endY: 40, delay: 5, duration: 15 },
    { startX: 30, startY: 70, endX: 50, endY: 50, delay: 8, duration: 10 },
  ]

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.05] via-transparent to-sky-500/[0.05] blur-3xl" />

      {/* Particle background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <FloatingParticle
              key={i}
              size={particle.size}
              color={particle.color}
              delay={particle.delay}
              duration={particle.duration}
              x={particle.x}
              y={particle.y}
            />
          ))}

          {lines.map((line, i) => (
            <AnimatedLine
              key={i}
              startX={line.startX}
              startY={line.startY}
              endX={line.endX}
              endY={line.endY}
              delay={line.delay}
              duration={line.duration}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-green-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          animationType="orbit"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-sky-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          animationType="pulse"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-green-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          animationType="bounce"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-sky-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          animationType="default"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: ["rgba(16, 185, 129, 0.5)", "rgba(16, 185, 129, 0.8)", "rgba(16, 185, 129, 0.5)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="h-2 w-2 rounded-full bg-green-500/50"
              />
              <span className="text-sm text-white/60 tracking-wide">{badge}</span>
            </motion.div>
          )}

          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              <AnimatedText
                text={title1}
                delay={0.5}
                className="block text-white font-bold" // Changed from gradient to solid white
              />
              <AnimatedText
                text={title2}
                delay={1.2}
                className="block text-green-400" // Changed from gradient to solid green
              />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <p className="text-base sm:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 2.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />

        {/* Animated scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"
          style={{ height: "200%", top: "-100%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  )
}

export { HeroGeometric }
