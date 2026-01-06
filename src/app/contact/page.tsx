'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    type: 'general'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your inquiry. Our team will contact you shortly.')
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">SECURE CHANNEL</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact G3TI</h1>
          <p className="text-xl text-gray-400">Initiate secure communication with our intelligence team.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-800 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none"
              >
                <option value="general">General Inquiry</option>
                <option value="government">Government / Law Enforcement</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="demo">Request Demo</option>
                <option value="partnership">Partnership Opportunity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-800 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-800 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-800 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-800 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Secure Inquiry
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Headquarters</p>
            <p className="text-white">Palm Beach, Florida</p>
            <p className="text-[#12F6C8] mt-4">🇺🇸 Veteran-Owned Company</p>
          </div>
        </div>
      </section>
    </div>
  )
}
