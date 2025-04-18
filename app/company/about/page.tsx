"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { Users, Target, Globe, Award } from "lucide-react"

const stats = [
  {
    title: "Active Users",
    value: "1M+",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Loan Applications",
    value: "500K+",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Countries",
    value: "50+",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Awards",
    value: "25+",
    icon: <Award className="w-6 h-6" />
  }
]

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to create better financial solutions."
  },
  {
    title: "Integrity",
    description: "We operate with transparency and honesty in all our dealings."
  },
  {
    title: "Inclusion",
    description: "We believe in making financial services accessible to everyone."
  },
  {
    title: "Impact",
    description: "We measure success by the positive change we bring to people's lives."
  }
]

export default function AboutPage() {
  return (
    <FuturisticLayout
      title="About Green Fina"
      description="Building the future of inclusive finance"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-green-500 mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/70">{stat.title}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Our Story
          </h2>
          <p className="text-white/70">
            Green Fina was founded with a vision to revolutionize the financial landscape
            by making financial services more accessible, transparent, and user-friendly.
            Our journey began in 2020, and since then, we've been committed to
            empowering individuals and businesses with innovative financial solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 