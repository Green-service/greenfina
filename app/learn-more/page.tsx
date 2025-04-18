"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Shield, PiggyBank, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthModal } from "@/components/ui/auth-modal"

export default function LearnMorePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)
  const [authModalView, setAuthModalView] = React.useState<"signIn" | "signUp">("signUp")

  const features = [
    {
      title: "39.99% Interest Returns",
      description: "Experience exceptional returns on your investments with our proven track record of 39.99% annual interest rates.",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Stokvel Integration",
      description: "Join our community-driven stokvel system where members pool resources and share benefits in a transparent, secure environment.",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Secure Investments",
      description: "Your investments are protected by state-of-the-art security measures and regulatory compliance.",
      icon: Shield,
      color: "text-purple-400",
    },
    {
      title: "Smart Savings",
      description: "Automated savings plans that help you grow your wealth while maintaining financial flexibility.",
      icon: PiggyBank,
      color: "text-yellow-400",
    },
    {
      title: "Market Analysis",
      description: "Access real-time market insights and expert analysis to make informed investment decisions.",
      icon: LineChart,
      color: "text-red-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-white pt-20 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-sky-500/10 backdrop-blur-md" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover Green Fina
          </motion.h1>
          <motion.p 
            className="text-xl text-center text-white/80 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your gateway to sustainable wealth creation through innovative financial solutions
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-sky-500/10 rounded-2xl blur-xl group-hover:bg-sky-500/20 transition-all duration-300" />
              <motion.div 
                className="relative p-6 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm"
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                  borderColor: "rgba(16, 185, 129, 0.5)",
                }}
              >
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="container mx-auto px-4 py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of successful investors who have already discovered the power of Green Fina
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg relative overflow-hidden"
            onClick={() => {
              setAuthModalView("signUp")
              setIsAuthModalOpen(true)
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10">Get Started Now</span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={authModalView} 
      />
    </div>
  )
} 