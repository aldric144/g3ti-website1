'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Shield, Lock, AlertTriangle } from 'lucide-react'

interface DossierPageProps {
  title: string
  subtitle: string
  category: 'intelligence' | 'compliance' | 'legal'
  content: string[]
  sections?: { title: string; content: string[] }[]
}

const categoryConfig = {
  intelligence: {
    icon: AlertTriangle,
    label: 'INTELLIGENCE DOSSIER',
    color: 'text-red-500',
    borderColor: 'border-l-red-500',
  },
  compliance: {
    icon: Shield,
    label: 'COMPLIANCE DOCUMENT',
    color: 'text-cyber-teal',
    borderColor: 'border-l-cyber-teal',
  },
  legal: {
    icon: FileText,
    label: 'LEGAL DOCUMENT',
    color: 'text-blue-400',
    borderColor: 'border-l-blue-400',
  },
}

export function DossierPage({ title, subtitle, category, content, sections }: DossierPageProps) {
  const config = categoryConfig[category]
  const Icon = config.icon

  return (
    <div className="neural-grid min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-6 h-6 ${config.color}`} />
              <span className={`text-sm font-mono tracking-wider ${config.color}`}>
                {config.label}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-400">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`intel-card p-8 rounded-lg border-l-4 ${config.borderColor}`}>
            <div className="space-y-6">
              {content.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {sections && sections.map((section, sIndex) => (
              <div key={sIndex} className="mt-8 pt-8 border-t border-intel-border">
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-400">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classification Notice */}
      <section className="py-12 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 p-6 bg-neural-dark rounded-lg border border-intel-border">
            <Lock className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">Document Classification</h3>
              <p className="text-gray-500 text-sm">
                This document is the property of Global 3 Technology & Intelligence™. Unauthorized reproduction, distribution, or disclosure is prohibited. For questions regarding this document, please contact G3TI through official channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Contact G3TI
            </Link>
            <Link 
              href="/" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
