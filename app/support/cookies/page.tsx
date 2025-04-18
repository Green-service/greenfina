"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { Cookie, Settings, Shield, Clock } from "lucide-react"

const sections = [
  {
    title: "What Are Cookies",
    icon: <Cookie className="w-6 h-6" />,
    content: `Cookies are small text files that:
    • Are stored on your device
    • Help us remember your preferences
    • Enable certain website features
    • Improve your browsing experience
    • Collect anonymous usage data`
  },
  {
    title: "Types of Cookies",
    icon: <Settings className="w-6 h-6" />,
    content: `We use different types of cookies:
    • Essential cookies for basic functionality
    • Performance cookies for analytics
    • Functionality cookies for preferences
    • Targeting cookies for personalized content
    • Third-party cookies for external services`
  },
  {
    title: "Cookie Management",
    icon: <Shield className="w-6 h-6" />,
    content: `You can control cookies through:
    • Your browser settings
    • Our cookie consent banner
    • Privacy settings in your account
    • Third-party opt-out tools
    • Device-specific controls`
  },
  {
    title: "Cookie Duration",
    icon: <Clock className="w-6 h-6" />,
    content: `Our cookies may be:
    • Session cookies (temporary)
    • Persistent cookies (long-term)
    • First-party cookies (our domain)
    • Third-party cookies (external)
    • Secure cookies (HTTPS only)`
  }
]

export default function CookiePolicyPage() {
  return (
    <FuturisticLayout
      title="Cookie Policy"
      description="Understanding how we use cookies"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Introduction
          </h2>
          <p className="text-white/70">
            This Cookie Policy explains how Green Fina uses cookies and similar technologies to recognize
            you when you visit our website. It explains what these technologies are and why we use them,
            as well as your rights to control our use of them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-green-500 mb-4">{section.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <div className="text-white/70 whitespace-pre-line">{section.content}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Your Choices
          </h2>
          <p className="text-white/70">
            You can choose to have your computer warn you each time a cookie is being sent, or you can
            choose to turn off all cookies. You do this through your browser settings. Each browser is
            a little different, so look at your browser's Help menu to learn the correct way to modify
            your cookies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-white/70">
            If you have any questions about our Cookie Policy, please contact us at:
            <br />
            Email: privacy@greenfina.com
            <br />
            Phone: +27 21 123 4567
          </p>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 