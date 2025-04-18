"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredPosts = [
  {
    title: "The Future of Digital Banking",
    excerpt: "Exploring how AI and blockchain are transforming the financial industry",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "/blog/digital-banking.jpg"
  },
  {
    title: "Financial Inclusion in Africa",
    excerpt: "How mobile money is revolutionizing access to financial services",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Impact",
    image: "/blog/financial-inclusion.jpg"
  }
]

const recentPosts = [
  {
    title: "Understanding Credit Scores",
    excerpt: "A comprehensive guide to improving your credit score",
    date: "March 5, 2024",
    readTime: "3 min read",
    category: "Education"
  },
  {
    title: "Investment Strategies for 2024",
    excerpt: "Expert insights on building a diversified portfolio",
    date: "March 1, 2024",
    readTime: "4 min read",
    category: "Investing"
  },
  {
    title: "Sustainable Banking Practices",
    excerpt: "How green banking is shaping the future of finance",
    date: "February 28, 2024",
    readTime: "5 min read",
    category: "Sustainability"
  }
]

export default function BlogPage() {
  return (
    <FuturisticLayout
      title="Blog"
      description="Insights and updates from the Green Fina team"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-green-500/20 to-sky-500/20" />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                    <span className="text-green-500">{post.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4">{post.excerpt}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
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
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <FuturisticCard
                  title={post.title}
                  description={post.excerpt}
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