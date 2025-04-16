"use client"

import { motion } from "framer-motion"
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip-preview"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-[#040404] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-emerald-500/[0.03]" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Animated glow spots */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-green-500/5 blur-3xl"
        style={{ top: "20%", left: "10%" }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"
        style={{ bottom: "10%", right: "10%" }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
              What Our Customers Say
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Hear from people who have transformed their financial lives with Green Fina
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* AnimatedTooltipPreview component */}
          <div className="flex flex-row items-center justify-center w-full">
            <AnimatedTooltipPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
