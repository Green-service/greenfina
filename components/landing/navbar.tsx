"use client"

import * as React from "react"
import Link from "next/link"
import { Users, PieChart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AuthModal } from "@/components/ui/auth-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false)
  const [authModalView, setAuthModalView] = React.useState<"signIn" | "signUp">("signIn")
  const [activeTab, setActiveTab] = React.useState("Features")

  const navItems = [
    { name: "Features", url: "#features", icon: PieChart },
    { name: "Testimonials", url: "#testimonials", icon: Users },
  ]

  const Logo = (
    <div className="flex items-center space-x-2">
      <div className="relative w-12 h-12">
        <Image src="/images/logo.png" alt="Green Fina Logo" width={48} height={48} className="object-contain" />
      </div>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-green-400 mr-1 futuristic-text">Green</span>
        <span className="text-2xl font-bold text-green-400 futuristic-text">Fina</span>
      </div>
    </div>
  )

  return (
    <>
      <div className="fixed z-50 top-6 left-0 right-0 flex justify-center pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.8,
          }}
        >
          <motion.div
            className="flex items-center justify-between gap-6 bg-sky-500/10 backdrop-blur-md py-2 px-6 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10"
            animate={{
              y: [0, -5, 0, -3, 0],
              rotate: [0, 0.5, 0, -0.5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <Link href="/" className="flex-shrink-0">
              {Logo}
            </Link>

            <div className="hidden md:flex items-center justify-center gap-2 mx-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "relative cursor-pointer text-sm font-medium px-3 py-1.5 rounded-full transition-colors",
                      "text-white/70 hover:text-green-400",
                      isActive && "text-green-400",
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-green-500/10 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-500 rounded-t-full">
                          <div className="absolute w-12 h-6 bg-green-500/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-green-500/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-green-500/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center justify-center px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-sm font-medium"
                onClick={() => {
                  setAuthModalView("signIn")
                  setIsAuthModalOpen(true)
                }}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                variant="default"
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-4"
                onClick={() => {
                  setAuthModalView("signUp")
                  setIsAuthModalOpen(true)
                }}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-sky-500/10 backdrop-blur-md pt-20 md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="flex items-center gap-3 text-lg font-medium text-white/70 hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-4" />
            <Button
              variant="ghost"
              className="flex items-center w-full justify-start gap-3 text-lg font-medium text-white/70 hover:text-green-400 transition-colors"
              onClick={() => {
                setIsMenuOpen(false)
                setAuthModalView("signIn")
                setIsAuthModalOpen(true)
              }}
            >
              Sign In
            </Button>
            <Button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
              onClick={() => {
                setIsMenuOpen(false)
                setAuthModalView("signUp")
                setIsAuthModalOpen(true)
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialView={authModalView} />
    </>
  )
}
