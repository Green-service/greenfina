"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { Briefcase, Users, Rocket, Heart } from "lucide-react"

const jobOpenings = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    title: "Financial Analyst",
    department: "Finance",
    location: "Remote",
    type: "Full-time",
    icon: <Briefcase className="w-6 h-6" />
  }
]

const cultureValues = [
  {
    title: "Collaborative Environment",
    description: "Work with talented individuals in a supportive team setting",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Innovation First",
    description: "Push boundaries and create cutting-edge financial solutions",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    title: "Work-Life Balance",
    description: "Flexible schedules and remote work options",
    icon: <Heart className="w-6 h-6" />
  }
]

export default function CareersPage() {
  return (
    <FuturisticLayout
      title="Join Our Team"
      description="Build the future of finance with us"
    >
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Why Work With Us
          </h2>
          <p className="text-white/70">
            At Green Fina, we're building the future of inclusive finance. Join a team of passionate
            individuals who are committed to making financial services accessible to everyone.
            We offer competitive compensation, flexible work arrangements, and opportunities for
            professional growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
            Our Culture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <FuturisticCard
                  title={value.title}
                  description={value.description}
                  icon={value.icon}
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
            Open Positions
          </h2>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-white/70">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FuturisticLayout>
  )
} 