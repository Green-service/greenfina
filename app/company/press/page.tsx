"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"
import Link from "next/link"

const pressReleases = [
  {
    title: "Green Fina Raises $50M Series B Funding",
    date: "March 1, 2024",
    excerpt: "Investment will accelerate expansion of financial services across Africa",
    source: "TechCrunch",
    link: "#"
  },
  {
    title: "Green Fina Launches New Mobile Banking App",
    date: "February 15, 2024",
    excerpt: "Revolutionary app brings banking services to underserved communities",
    source: "Financial Times",
    link: "#"
  },
  {
    title: "Green Fina Partners with Major African Banks",
    date: "January 30, 2024",
    excerpt: "Strategic partnerships to expand financial inclusion",
    source: "Bloomberg",
    link: "#"
  }
]

const mediaCoverage = [
  {
    title: "The Future of Fintech in Africa",
    publication: "Forbes",
    date: "March 10, 2024",
    excerpt: "How Green Fina is leading the digital banking revolution",
    link: "#"
  },
  {
    title: "Breaking Barriers in Financial Inclusion",
    publication: "The Economist",
    date: "March 5, 2024",
    excerpt: "Green Fina's innovative approach to serving unbanked populations",
    link: "#"
  },
  {
    title: "Sustainable Banking Practices",
    publication: "Financial Times",
    date: "February 28, 2024",
    excerpt: "Green Fina sets new standards for environmentally conscious banking",
    link: "#"
  }
]

export default function PressPage() {
  return (
    <FuturisticLayout
      title="Press"
      description="Latest news and media coverage about Green Fina"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Press Releases
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{release.date}</span>
                      </div>
                      <span>•</span>
                      <span className="text-green-500">{release.source}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                    <p className="text-white/70 mb-4">{release.excerpt}</p>
                  </div>
                  <Link
                    href={release.link}
                    className="text-green-500 hover:text-green-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Media Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaCoverage.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <FuturisticCard
                  title={article.title}
                  description={article.excerpt}
                  icon={<Newspaper className="w-6 h-6" />}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 