'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

function ContactContent() {
  const searchParams = useSearchParams()
  const [isDemo, setIsDemo] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setIsDemo(searchParams.get('demo') === 'true')
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="neural-grid min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="classified-header mb-4">
              {isDemo ? 'DEMO REQUEST' : 'SECURE CONTACT'}
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isDemo ? 'Request a Demo' : 'Contact G3TI'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {isDemo 
                ? 'Schedule a classified briefing on G3TI intelligence capabilities.'
                : 'Connect with our team for inquiries, partnerships, or intelligence briefings.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {submitted ? (
                <div className="intel-card p-8 rounded-lg text-center">
                  <div className="w-16 h-16 bg-cyber-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-cyber-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Received</h3>
                  <p className="text-gray-400">
                    Your inquiry has been securely transmitted. A G3TI representative will respond within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="intel-card p-8 rounded-lg">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-neural-dark border border-intel-border rounded-lg text-white focus:border-cyber-teal focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-neural-dark border border-intel-border rounded-lg text-white focus:border-cyber-teal focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 bg-neural-dark border border-intel-border rounded-lg text-white focus:border-cyber-teal focus:outline-none transition-colors"
                        placeholder="Company or agency name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-neural-dark border border-intel-border rounded-lg text-white focus:border-cyber-teal focus:outline-none transition-colors"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="demo">Request Demo</option>
                        <option value="government">Government/Law Enforcement</option>
                        <option value="enterprise">Enterprise Solutions</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="media">Media/Press</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-neural-dark border border-intel-border rounded-lg text-white focus:border-cyber-teal focus:outline-none transition-colors resize-none"
                        placeholder="Describe your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="intel-card p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cyber-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Headquarters</h3>
                    <p className="text-gray-400">Palm Beach, Florida</p>
                    <p className="text-gray-500 text-sm">United States</p>
                  </div>
                </div>
              </div>

              <div className="intel-card p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyber-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                    <p className="text-gray-400">contact@g3ti.com</p>
                    <p className="text-gray-500 text-sm">Secure communications available</p>
                  </div>
                </div>
              </div>

              <div className="intel-card p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-cyber-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
                    <p className="text-gray-400">24-48 Hours</p>
                    <p className="text-gray-500 text-sm">Priority response for government inquiries</p>
                  </div>
                </div>
              </div>

              <div className="intel-card p-6 rounded-lg border-l-4 border-l-cyber-teal">
                <h3 className="text-lg font-bold text-white mb-2">Security Notice</h3>
                <p className="text-gray-400 text-sm">
                  All communications with G3TI are handled with the highest level of confidentiality. For classified inquiries, please indicate your security clearance level and we will establish appropriate secure communication channels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="neural-grid min-h-screen pt-20 flex items-center justify-center"><div className="text-cyber-teal">Loading...</div></div>}>
      <ContactContent />
    </Suspense>
  )
}
