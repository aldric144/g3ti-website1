'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Ghost, Shield, Flame, Heart, Eye } from 'lucide-react'

const products = [
  {
    icon: Ghost,
    name: 'GhostQuant AI™',
    href: '/products/ghostquant-ai',
    tagline: 'Quantum-Enhanced Threat Intelligence',
    status: 'Names Only',
  },
  {
    icon: Shield,
    name: 'ID SHIELD™',
    href: '/products/id-shield',
    tagline: 'Identity Protection Ecosystem',
    status: 'Names Only',
  },
  {
    icon: Flame,
    name: 'ScamFirewall360™',
    href: '/products/scamfirewall360',
    tagline: 'Comprehensive Fraud Prevention',
    status: 'Names Only',
  },
  {
    icon: Heart,
    name: 'HeartGuard AI™',
    href: '/products/heartguard-ai',
    tagline: 'Domestic Violence Prevention Intelligence',
    status: 'Names Only',
  },
  {
    icon: Eye,
    name: 'HomelandWatch7™',
    href: '/products/homelandwatch7',
    tagline: 'National Security Monitoring Platform',
    status: 'Names Only',
  },
]

export default function ProductsPage() {
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
            <h1 className="classified-header mb-4">CONFIDENTIAL SYSTEMS</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Intelligence Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Full capabilities are proprietary and under active development.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={product.href}
                  className="intel-card p-8 rounded-lg block group hover:border-cyber-teal transition-all h-full"
                >
                  <product.icon className="w-16 h-16 text-cyber-teal mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyber-teal transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-cyber-teal text-sm mb-4">{product.status}</p>
                  <p className="text-gray-500 text-sm">
                    Full capabilities are proprietary and under active development.
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Disclaimer Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Proprietary Technology
          </h2>
          <p className="text-gray-400 mb-8">
            G3TI product specifications, capabilities, and technical details are classified and available only to authorized partners, government agencies, and enterprise clients under NDA.
          </p>
          <div className="intel-card p-6 rounded-lg inline-block">
            <p className="text-gray-500 text-sm">
              All product names, logos, and technologies are trademarks of Global 3 Technology & Intelligence™. Patent applications pending.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Interested in Our Solutions?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us for authorized access to product specifications and capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Request Access
            </Link>
            <Link 
              href="/government" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              Government Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
