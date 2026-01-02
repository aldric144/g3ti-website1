'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, CreditCard, Heart, GraduationCap, Shield, TrendingUp } from 'lucide-react'

const industries = [
  {
    icon: CreditCard,
    title: 'Financial Services',
    description: 'Advanced fraud detection and synthetic identity prevention for banks, credit unions, and fintech companies.',
    features: ['Real-time transaction monitoring', 'Synthetic identity detection', 'Account takeover prevention', 'Regulatory compliance'],
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'HIPAA-compliant security solutions protecting patient data and preventing medical identity theft.',
    features: ['Patient data protection', 'Medical identity verification', 'Compliance monitoring', 'Breach prevention'],
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Campus safety and student protection systems for K-12 and higher education institutions.',
    features: ['Threat assessment tools', 'Online safety monitoring', 'Identity verification', 'Emergency response integration'],
  },
  {
    icon: Building2,
    title: 'Corporate',
    description: 'Enterprise-grade cyber defense and insider threat detection for Fortune 500 companies.',
    features: ['Executive protection', 'Insider threat detection', 'Corporate espionage prevention', 'Supply chain security'],
  },
]

const benefits = [
  { value: '99.7%', label: 'Fraud Detection Rate' },
  { value: '<100ms', label: 'Response Time' },
  { value: '24/7', label: 'Autonomous Monitoring' },
  { value: '50%', label: 'Cost Reduction' },
]

export default function EnterprisePage() {
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
            <h1 className="classified-header mb-4">ENTERPRISE SOLUTIONS</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise-Grade Intelligence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered security and intelligence solutions protecting organizations across industries. From financial institutions to healthcare providers, our platforms safeguard your operations and customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Protecting Your Business</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Financial institutions fraud detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Healthcare data protection and compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Educational institution safety solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Corporate cyber defense and threat prevention</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors inline-block"
                >
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/g3ti/portrait-teamwork-and-success-with-a-female.jpg"
                alt="Enterprise Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neural-dark/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Benefits Stats */}
      <section className="py-16 px-4 bg-neural-darker">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="intel-card p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-cyber-teal mb-2">{benefit.value}</div>
                <div className="text-gray-400 text-sm">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Industries Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Industry Solutions
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Tailored intelligence solutions for your industry&apos;s unique security challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="intel-card p-8 rounded-lg group hover:border-cyber-teal transition-all"
              >
                <industry.icon className="w-12 h-12 text-cyber-teal mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-3">{industry.title}</h3>
                <p className="text-gray-400 mb-4">{industry.description}</p>
                <ul className="space-y-2">
                  {industry.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-gray-500 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyber-teal rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Integration Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Seamless Integration
          </h2>
          <p className="text-gray-300 mb-8">
            G3TI enterprise solutions integrate with your existing security infrastructure, enhancing capabilities without disrupting operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-400">SIEM Integration</span>
            <span className="px-4 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-400">API Access</span>
            <span className="px-4 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-400">SSO Support</span>
            <span className="px-4 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-400">Cloud & On-Premise</span>
            <span className="px-4 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-400">Custom Deployment</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Enterprise?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact our enterprise solutions team for a customized security assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Request Demo
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
