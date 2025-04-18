"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { Handshake, Building2, Globe, Users } from "lucide-react"

const partners = [
  {
    title: "Financial Institutions",
    description: "Partnering with leading banks and financial institutions to expand our reach",
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Technology Providers",
    description: "Collaborating with tech innovators to enhance our platform capabilities",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Community Organizations",
    description: "Working with local organizations to promote financial inclusion",
    icon: <Users className="w-6 h-6" />
  }
]

const partnershipBenefits = [
  {
    title: "Expanded Reach",
    description: "Access to new markets and customer segments"
  },
  {
    title: "Innovation",
    description: "Collaborative development of cutting-edge solutions"
  },
  {
    title: "Resources",
    description: "Shared expertise and technical capabilities"
  },
  {
    title: "Impact",
    description: "Greater potential for positive social change"
  }
]

export default function PartnersPage() {
  return (
    <FuturisticLayout
      title="Partners"
      description="Building the future of finance through strategic partnerships"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Our Partnership Approach
          </h2>
          <p className="text-white/70">
            At Green Fina, we believe in the power of collaboration. Our partnerships
            are built on mutual trust, shared values, and a common vision for the
            future of finance. We work with organizations that share our commitment
            to innovation, sustainability, and financial inclusion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Partner Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <FuturisticCard
                  title={partner.title}
                  description={partner.description}
                  icon={partner.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Partnership Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="text-green-500 mb-4">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Become a Partner
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Interested in partnering with Green Fina? We're always looking for
            organizations that share our vision for the future of finance.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-lg hover:opacity-90 transition-opacity">
            Contact Our Partnership Team
          </button>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 