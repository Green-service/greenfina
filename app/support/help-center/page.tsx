"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { HelpCircle, FileQuestion, MessageCircle, Phone, Mail, Search, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const faqCategories = [
  {
    title: "Getting Started",
    icon: <HelpCircle className="w-6 h-6" />,
    questions: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click the 'Sign Up' button in the top right corner. You'll need to provide your email, create a password, and verify your identity. We'll guide you through the process step by step."
      },
      {
        question: "What documents do I need to apply for a loan?",
        answer: "You'll need a valid ID, proof of income (payslips or bank statements), and proof of residence. Additional documents may be required depending on the loan type and amount."
      },
      {
        question: "How long does the loan approval process take?",
        answer: "Most loan applications are processed within 24-48 hours. Once approved, funds are typically disbursed within 1-2 business days."
      }
    ]
  },
  {
    title: "Account Management",
    icon: <FileQuestion className="w-6 h-6" />,
    questions: [
      {
        question: "How do I reset my password?",
        answer: "Click the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password securely."
      },
      {
        question: "Can I update my personal information?",
        answer: "Yes, you can update your personal information in the 'Account Settings' section. Some changes may require additional verification."
      },
      {
        question: "How do I link my bank account?",
        answer: "Go to 'Account Settings' > 'Bank Accounts' and follow the secure linking process. We use bank-level encryption to protect your information."
      }
    ]
  },
  {
    title: "Loans & Payments",
    icon: <MessageCircle className="w-6 h-6" />,
    questions: [
      {
        question: "What are the interest rates?",
        answer: "Interest rates vary based on loan type, amount, and your credit profile. You'll see the exact rate during the application process."
      },
      {
        question: "How do I make a payment?",
        answer: "You can make payments through your linked bank account, debit card, or at any of our partner locations. Automatic payments can also be set up."
      },
      {
        question: "What happens if I miss a payment?",
        answer: "We encourage you to contact us before missing a payment. We may be able to adjust your payment schedule. Late payments may incur fees and affect your credit score."
      }
    ]
  }
]

const supportChannels = [
  {
    title: "AI Chatbot",
    description: "Get instant help 24/7",
    icon: <MessageCircle className="w-6 h-6" />,
    image: "/images/ai.png"
  },
  {
    title: "Phone Support",
    description: "Available Monday to Friday, 8:00 AM - 8:00 PM",
    icon: <Phone className="w-6 h-6" />,
    contact: "+27 64 737 5926"
  },
  {
    title: "Email Support",
    description: "We respond within 24 hours",
    icon: <Mail className="w-6 h-6" />,
    contact: "greenservice.loan@gmail.com"
  },
  {
    title: "Office Location",
    description: "Visit us at our headquarters",
    icon: <MapPin className="w-6 h-6" />,
    contact: "Pretoria, Gauteng, South Africa"
  }
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  return (
    <FuturisticLayout
      title="Help Center"
      description="Find answers to your questions and get support"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white placeholder-white/50"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportChannels.map((channel, index) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-green-500 mb-4">{channel.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
              <p className="text-white/70 mb-4">{channel.description}</p>
              {channel.image && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={channel.image}
                    alt={channel.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {channel.contact && <p className="text-green-500">{channel.contact}</p>}
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-green-500">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faq.question}
                    className="border border-white/10 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === faq.question ? null : faq.question)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-green-500">
                        {expandedQuestion === faq.question ? "−" : "+"}
                      </span>
                    </button>
                    {expandedQuestion === faq.question && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 py-3 bg-white/5"
                      >
                        <p className="text-white/70">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FuturisticLayout>
  )
} 