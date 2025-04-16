"use client"

import { BarChart3, CreditCard, DollarSign, Lock, MessageSquare, PiggyBank, Shield, Users } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const features = [
    {
      icon: CreditCard,
      title: "Quick Loan Applications",
      description: "Apply for loans in minutes with our streamlined application process.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Your financial data is protected with bank-level security and encryption.",
    },
    {
      icon: BarChart3,
      title: "Financial Analytics",
      description: "Track your financial health with detailed analytics and insights.",
    },
    {
      icon: Users,
      title: "Stokvela Groups",
      description: "Create or join community savings groups to achieve your financial goals together.",
    },
    {
      icon: MessageSquare,
      title: "AI Financial Advisor",
      description: "Get personalized financial advice from our AI-powered assistant.",
    },
    {
      icon: PiggyBank,
      title: "Savings Goals",
      description: "Set and track savings goals with automated contributions.",
    },
    {
      icon: Lock,
      title: "Identity Verification",
      description: "Secure identity verification process to protect your account.",
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Enjoy competitive interest rates on loans and savings products.",
    },
  ]

  return (
    <section id="features" className="py-20 relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/greenfina-building.png"
          alt="Green Fina Building"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Powerful Financial Features
          </h2>
          <p className="text-lg text-white/60">Everything you need to manage your finances in one place.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-sm hover:bg-black/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
