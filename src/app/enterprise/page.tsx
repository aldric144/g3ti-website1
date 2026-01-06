'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'

const RiskMRIHologram = dynamic(() => import('@/components/3d/RiskMRIHologram'), { 
  ssr: false, 
  loading: () => <div className="w-full h-[500px] bg-[#050505] animate-pulse" /> 
})

interface IndustryData {
  name: string
  icon: string
  threats: string[]
  solutions: string[]
}

const industries: IndustryData[] = [
  {
    name: 'Financial Services',
    icon: '🏦',
    threats: ['Synthetic identity fraud', 'Account takeover', 'Wire fraud'],
    solutions: ['Real-time fraud detection', 'Behavioral biometrics', 'Transaction monitoring']
  },
  {
    name: 'Healthcare',
    icon: '🏥',
    threats: ['Medical identity theft', 'Insurance fraud', 'Data breaches'],
    solutions: ['Patient identity verification', 'Claims analysis', 'HIPAA compliance']
  },
  {
    name: 'Technology',
    icon: '💻',
    threats: ['IP theft', 'Supply chain attacks', 'Insider threats'],
    solutions: ['Code integrity monitoring', 'Vendor risk assessment', 'Access analytics']
  },
  {
    name: 'Retail & E-Commerce',
    icon: '🛒',
    threats: ['Payment fraud', 'Account fraud', 'Return fraud'],
    solutions: ['Checkout protection', 'Account security', 'Fraud scoring']
  },
  {
    name: 'Manufacturing',
    icon: '🏭',
    threats: ['Industrial espionage', 'OT/IT convergence risks', 'Counterfeit parts'],
    solutions: ['Supply chain verification', 'Network segmentation', 'Asset authentication']
  },
  {
    name: 'Energy & Utilities',
    icon: '⚡',
    threats: ['Critical infrastructure attacks', 'SCADA vulnerabilities', 'Insider sabotage'],
    solutions: ['OT security monitoring', 'Anomaly detection', 'Access control']
  },
]

function IndustryCard({ industry, index }: { industry: IndustryData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, rotateX: -10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`relative p-6 bg-[#0D0D0F] rounded-xl border transition-all duration-500 cursor-pointer ${
        isExpanded ? 'border-[#12F6C8] shadow-lg shadow-[#12F6C8]/10' : 'border-[#12F6C8]/10 hover:border-[#12F6C8]/30'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{industry.icon}</div>
        <div className={`w-8 h-8 rounded-full border border-[#12F6C8]/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-[#12F6C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
      
      <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-4 border-t border-[#12F6C8]/10 mt-4">
          <div className="mb-4">
            <h4 className="text-red-400 text-sm font-semibold mb-2">THREAT VECTORS</h4>
            <ul className="space-y-1">
              {industry.threats.map((threat, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {threat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#12F6C8] text-sm font-semibold mb-2">G3TI SOLUTIONS</h4>
            <ul className="space-y-1">
              {industry.solutions.map((solution, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricDisplay({ value, label, trend }: { value: string; label: string; trend: 'up' | 'down' }) {
  return (
    <div className="p-6 bg-[#0D0D0F]/50 rounded-xl border border-[#12F6C8]/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-bold text-[#12F6C8]">{value}</span>
        <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  )
}

function FeatureBlock({ title, description, icon }: { title: string; description: string; icon: string }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={blockRef}
      className="relative p-8 bg-gradient-to-br from-[#0D0D0F] to-[#050505] rounded-2xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#12F6C8]/5 to-transparent rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative z-10">
        <div className="text-5xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#12F6C8] transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function EnterprisePage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section - Risk MRI */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <RiskMRIHologram />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        
        <div ref={headerRef} className="relative z-20 max-w-7xl mx-auto px-4 py-24">
          <div className="inline-block px-4 py-2 rounded-full bg-[#0B85E5]/10 border border-[#0B85E5]/30 mb-6">
            <span className="text-[#0B85E5] text-sm tracking-wider">ENTERPRISE INTELLIGENCE</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">RISK</span><br />
            <span className="text-[#12F6C8] glow-text">MRI</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            360-degree enterprise risk visualization and autonomous threat intelligence 
            for Fortune 500 companies and global organizations.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Schedule Demo
            </Link>
            <Link href="/products/ghostquant-ai.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricDisplay value="99.7%" label="Threat Detection Rate" trend="up" />
            <MetricDisplay value="<50ms" label="Response Time" trend="down" />
            <MetricDisplay value="$2.4B" label="Fraud Prevented" trend="up" />
            <MetricDisplay value="500+" label="Enterprise Clients" trend="up" />
          </div>
        </div>
      </section>

      {/* Industry Matrix */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">INDUSTRY <span className="text-[#12F6C8]">INTELLIGENCE MATRIX</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tailored threat intelligence and protection for every sector
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.name} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">ENTERPRISE <span className="text-[#12F6C8]">CAPABILITIES</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureBlock
              icon="🔮"
              title="Predictive Threat Intelligence"
              description="Machine learning models trained on billions of threat indicators to predict and prevent attacks before they occur. Our AI identifies patterns invisible to traditional security tools."
            />
            <FeatureBlock
              icon="🧬"
              title="Behavioral DNA Analysis"
              description="Deep behavioral analysis that creates unique digital fingerprints for users, devices, and transactions. Detect anomalies and insider threats with unprecedented accuracy."
            />
            <FeatureBlock
              icon="🌐"
              title="Global Threat Network"
              description="Real-time intelligence sharing across our global network of enterprise clients. When one organization detects a threat, all benefit from the collective defense."
            />
            <FeatureBlock
              icon="⚡"
              title="Autonomous Response"
              description="Automated threat containment and response that operates at machine speed. Reduce mean time to respond from hours to milliseconds."
            />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">SEAMLESS <span className="text-[#12F6C8]">INTEGRATION</span></h2>
              <p className="text-gray-300 mb-8">
                G3TI solutions integrate with your existing security stack, enhancing rather than replacing your current investments.
              </p>
              
              <div className="space-y-4">
                {[
                  { name: 'SIEM Integration', desc: 'Splunk, QRadar, Sentinel' },
                  { name: 'SOAR Platforms', desc: 'Phantom, Demisto, Swimlane' },
                  { name: 'Identity Providers', desc: 'Okta, Azure AD, Ping' },
                  { name: 'Cloud Platforms', desc: 'AWS, Azure, GCP' },
                  { name: 'API-First Design', desc: 'RESTful APIs, Webhooks, SDKs' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-[#0D0D0F] rounded-lg border border-[#12F6C8]/10">
                    <div className="w-3 h-3 rounded-full bg-[#12F6C8]" />
                    <div>
                      <div className="text-white font-semibold">{item.name}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#12F6C8]/10 to-[#0B85E5]/10 border border-[#12F6C8]/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔗</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise Ready</h3>
                  <p className="text-gray-400">SOC 2 Type II certified with 99.99% uptime SLA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Security Posture?</h2>
          <p className="text-gray-400 mb-8">
            Join the world&apos;s leading enterprises in the fight against AI-powered threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Enterprise Demo
            </Link>
            <Link href="/compliance/ai-governance.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              View Compliance
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
