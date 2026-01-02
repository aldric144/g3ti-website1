'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Eye, Network, Lock, Target, Radar } from 'lucide-react'

const capabilities = [
  {
    icon: Shield,
    title: 'DHS-Ready Platforms',
    description: 'FedRAMP-aligned security frameworks designed for federal deployment and compliance.',
  },
  {
    icon: Eye,
    title: 'Border Intelligence',
    description: 'Advanced threat tracking and surveillance systems for border security operations.',
  },
  {
    icon: Network,
    title: 'Fusion Center Integration',
    description: 'Seamless integration with existing law enforcement fusion centers nationwide.',
  },
  {
    icon: Lock,
    title: 'CJIS Compliance',
    description: 'Full Criminal Justice Information Services security policy compliance.',
  },
  {
    icon: Target,
    title: 'Real-Time Threat Mapping',
    description: 'Live threat visualization and analysis across multiple data streams.',
  },
  {
    icon: Radar,
    title: 'OSINT Intelligence',
    description: 'Open-source intelligence gathering and analysis at scale.',
  },
]

const useCases = [
  {
    title: 'Human Trafficking Detection',
    description: 'AI-powered pattern recognition to identify trafficking networks and rescue victims.',
  },
  {
    title: 'Fraud Ring Mapping',
    description: 'Cross-platform analysis to expose organized fraud operations.',
  },
  {
    title: 'Deepfake Forensics',
    description: 'Real-time detection and analysis of synthetic media threats.',
  },
  {
    title: 'Identity Verification',
    description: 'Government-grade identity integrity systems for secure authentication.',
  },
  {
    title: 'Domestic Violence Prevention',
    description: 'Behavioral analysis to predict and prevent escalation events.',
  },
  {
    title: 'Child Safety Operations',
    description: 'Advanced tools for online child exploitation investigations.',
  },
]

export default function GovernmentPage() {
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
            <h1 className="classified-header mb-4">GOVERNMENT & LAW ENFORCEMENT</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mission-Critical Intelligence Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Autonomous protective intelligence for federal, state, and local law enforcement agencies. DHS-ready platforms that integrate seamlessly with existing infrastructure to enhance national security and protect communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/g3ti/close-up-of-detective-holding-suspect-person.jpg"
                alt="Law Enforcement Operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neural-dark/80 to-transparent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Protecting Those Who Protect Us</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">DHS-ready features and FedRAMP compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Border intelligence and threat tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Real-time threat mapping and analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">Fusion center integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-teal">▸</span>
                  <span className="text-gray-300">CJIS/NIST security framework alignment</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors inline-block"
                >
                  Request Briefing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Capabilities Grid */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Intelligence Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="intel-card p-6 rounded-lg group hover:border-cyber-teal transition-all"
              >
                <cap.icon className="w-10 h-10 text-cyber-teal mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-gray-400">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Operational Use Cases
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            G3TI intelligence platforms support critical law enforcement operations across multiple domains.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="intel-card p-6 rounded-lg border-l-4 border-l-cyber-teal"
              >
                <h3 className="text-lg font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Compliance Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Federal Compliance Ready
          </h2>
          <p className="text-gray-300 mb-8">
            G3TI platforms are designed from the ground up to meet the most stringent federal security requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/fedramp-alignment" className="px-6 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-300 hover:border-cyber-teal hover:text-cyber-teal transition-colors">
              FedRAMP Alignment
            </Link>
            <Link href="/cjis-nist-readiness" className="px-6 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-300 hover:border-cyber-teal hover:text-cyber-teal transition-colors">
              CJIS/NIST Readiness
            </Link>
            <Link href="/zero-trust" className="px-6 py-2 bg-intel-gray border border-intel-border rounded-lg text-gray-300 hover:border-cyber-teal hover:text-cyber-teal transition-colors">
              Zero Trust Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Enhance Your Operations?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact our government solutions team for a classified briefing on G3TI capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Request Briefing
            </Link>
            <Link 
              href="/contractor-readiness" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              Contractor Readiness
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
