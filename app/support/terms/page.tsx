"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { ScrollText, Scale, AlertCircle, FileCheck } from "lucide-react"

const sections = [
  {
    title: "Acceptance of Terms",
    icon: <FileCheck className="w-6 h-6" />,
    content: `By accessing and using Green Fina's services, you agree to:
    • Be bound by these Terms of Service
    • Comply with all applicable laws and regulations
    • Provide accurate and complete information
    • Maintain the security of your account
    • Accept our right to modify these terms`
  },
  {
    title: "Service Usage",
    icon: <Scale className="w-6 h-6" />,
    content: `Our services are provided for:
    • Personal and business financial management
    • Digital banking transactions
    • Investment opportunities
    • Financial education resources
    • Customer support services`
  },
  {
    title: "User Responsibilities",
    icon: <ScrollText className="w-6 h-6" />,
    content: `As a user, you must:
    • Maintain accurate account information
    • Protect your login credentials
    • Report unauthorized access
    • Comply with transaction limits
    • Pay all applicable fees`
  },
  {
    title: "Limitations",
    icon: <AlertCircle className="w-6 h-6" />,
    content: `Please be aware of:
    • Service availability limitations
    • Transaction processing times
    • Fee structures and changes
    • Account restrictions
    • Liability limitations`
  }
]

export default function TermsPage() {
  return (
    <FuturisticLayout
      title="Terms of Service"
      description="Understanding your rights and responsibilities"
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
            Welcome to Green Fina. These Terms of Service govern your use of our platform and services.
            By using our services, you agree to these terms. Please read them carefully before proceeding.
            If you do not agree to these terms, please do not use our services.
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
            Changes to Terms
          </h2>
          <p className="text-white/70">
            We reserve the right to modify these terms at any time. We will notify users of any material
            changes through our platform or via email. Your continued use of our services after such
            modifications constitutes your acceptance of the updated terms.
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
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@greenfina.com
            <br />
            Phone: +27 21 123 4567
          </p>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 