'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ProductDetailPageProps {
  name: string
  tagline: string
  icon: LucideIcon
}

export function ProductDetailPage({ name, tagline, icon: Icon }: ProductDetailPageProps) {
  return (
    <div className="neural-grid min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Icon className="w-24 h-24 text-cyber-teal mx-auto mb-8" />
            <h1 className="classified-header mb-4">CONFIDENTIAL SYSTEM</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            <p className="text-xl text-cyber-teal mb-8">{tagline}</p>
          </motion.div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Classification Notice */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="intel-card p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Proprietary Technology
            </h2>
            <p className="text-gray-300 mb-6">
              Full capabilities, specifications, and technical details for {name} are classified and proprietary.
            </p>
            <p className="text-gray-400 mb-8">
              This system is currently under active development. Access to detailed specifications is available only to authorized partners, government agencies, and enterprise clients under NDA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
              >
                Request Access
              </Link>
              <Link 
                href="/products" 
                className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Disclaimer */}
      <section className="py-16 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            {name} is a trademark of Global 3 Technology & Intelligence™. All rights reserved. Patent applications pending.
          </p>
        </div>
      </section>
    </div>
  )
}
