"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { Shield, Lock, Eye, FileText } from "lucide-react"

const sections = [
  {
    title: "Information We Collect",
    icon: <FileText className="w-6 h-6" />,
    content: `We collect information that you provide directly to us, including:
    • Personal identification information
    • Financial information
    • Contact information
    • Transaction history
    • Communication preferences`
  },
  {
    title: "How We Use Your Information",
    icon: <Eye className="w-6 h-6" />,
    content: `We use the collected information for:
    • Processing your transactions
    • Providing customer support
    • Sending important updates
    • Improving our services
    • Complying with legal obligations`
  },
  {
    title: "Data Security",
    icon: <Lock className="w-6 h-6" />,
    content: `We implement appropriate security measures to protect your information:
    • Encryption of sensitive data
    • Regular security audits
    • Access controls
    • Secure data storage
    • Employee training`
  },
  {
    title: "Your Rights",
    icon: <Shield className="w-6 h-6" />,
    content: `You have the right to:
    • Access your personal data
    • Request data correction
    • Request data deletion
    • Opt-out of marketing
    • File a complaint`
  }
]

export default function PrivacyPolicyPage() {
  return (
    <FuturisticLayout
      title="Privacy Policy"
      description="How we protect and handle your data"
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
            At Green Fina, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our services. Please read this
            privacy policy carefully. If you do not agree with the terms of this privacy policy,
            please do not access the site.
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
            Contact Us
          </h2>
          <p className="text-white/70">
            If you have any questions about this Privacy Policy, please contact us at:
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