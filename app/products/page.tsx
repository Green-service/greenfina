"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { Wallet, GraduationCap, Building2, Users, LineChart, HelpCircle } from "lucide-react"
import Link from "next/link"

const products = [
  {
    title: "Personal Loans",
    description: "Flexible personal loans with competitive rates and quick approval process.",
    icon: <Wallet className="w-8 h-8" />,
    href: "/products/personal-loans"
  },
  {
    title: "Student Loans",
    description: "Invest in your future with our student loan programs designed for success.",
    icon: <GraduationCap className="w-8 h-8" />,
    href: "/products/student-loans"
  },
  {
    title: "Business Loans",
    description: "Grow your business with our tailored financing solutions.",
    icon: <Building2 className="w-8 h-8" />,
    href: "/products/business-loans"
  },
  {
    title: "Stokvela Groups",
    description: "Join our community-based savings groups for collective financial growth.",
    icon: <Users className="w-8 h-8" />,
    href: "/products/stokvela-groups"
  },
  {
    title: "Financial Advisory",
    description: "Expert financial guidance to help you make informed decisions.",
    icon: <LineChart className="w-8 h-8" />,
    href: "/products/financial-advisory"
  }
]

export default function ProductsPage() {
  return (
    <FuturisticLayout
      title="Our Products"
      description="Discover our range of financial products designed to meet your needs"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Link key={product.title} href={product.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FuturisticCard
                title={product.title}
                description={product.description}
                icon={product.icon}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </FuturisticLayout>
  )
} 