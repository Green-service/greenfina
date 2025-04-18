"use client"

import { motion } from "framer-motion"
import { FuturisticLayout } from "@/components/layouts/futuristic-layout"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

const officeLocations = [
  {
    city: "Cape Town",
    address: "123 Main Street, Cape Town, 8001",
    phone: "+27 21 123 4567",
    email: "capetown@greenfina.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    city: "Johannesburg",
    address: "456 Business Park, Johannesburg, 2001",
    phone: "+27 11 234 5678",
    email: "johannesburg@greenfina.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    icon: <MapPin className="w-6 h-6" />
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <FuturisticLayout
      title="Contact Us"
      description="Get in touch with our team"
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent">
              Office Locations
            </h2>
            <div className="space-y-6">
              {officeLocations.map((office, index) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="text-green-500 mb-4">{office.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{office.city}</h3>
                  <div className="space-y-2 text-white/70">
                    <p>{office.address}</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </FuturisticLayout>
  )
} 