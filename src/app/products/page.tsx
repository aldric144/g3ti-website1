'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ProductCard({ name, tagline, icon, description, features, href, color }: { 
  name: string; 
  tagline: string; 
  icon: string; 
  description: string; 
  features: string[]; 
  href: string;
  color: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <Link href={href}>
      <div 
        ref={cardRef}
        className={`p-6 bg-[#0D0D0F] rounded-2xl border transition-all duration-300 cursor-pointer ${
          isHovered ? `border-[${color}]/50 shadow-lg shadow-[${color}]/20` : 'border-[#12F6C8]/10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          borderColor: isHovered ? color : undefined,
          boxShadow: isHovered ? `0 10px 40px ${color}20` : undefined
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm" style={{ color }}>{tagline}</p>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span 
              key={i} 
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: `${color}10`, color }}
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#12F6C8]/10 flex items-center justify-between">
          <span className="text-gray-500 text-sm">View Console</span>
          <span style={{ color }}>→</span>
        </div>
      </div>
    </Link>
  )
}

function ProductCategory({ title, description, products }: { 
  title: string; 
  description: string; 
  products: Array<{ name: string; tagline: string; icon: string; description: string; features: string[]; href: string; color: string }> 
}) {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  )
}

function ProductStats() {
  const stats = [
    { value: '14', label: 'AI Products' },
    { value: '847+', label: 'Threats Blocked' },
    { value: '99.97%', label: 'Uptime' },
    { value: '24/7', label: 'Monitoring' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 bg-[#050505] rounded-xl text-center">
          <div className="text-3xl font-bold text-[#12F6C8]">{stat.value}</div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  // SECURITY & ENCRYPTION (3 products)
  const securityProducts = [
    {
      name: 'GhostQuant AI',
      tagline: 'Quantum-Resistant Encryption Engine',
      icon: '👻',
      description: 'Next-generation encryption platform using post-quantum cryptographic algorithms to protect against future quantum computing threats.',
      features: ['Post-Quantum', 'Zero-Knowledge', 'Military-Grade'],
      href: '/products/ghostquant-ai.html',
      color: '#12F6C8',
    },
    {
      name: 'ID SHIELD',
      tagline: 'Identity Protection Suite',
      icon: '🛡️',
      description: 'Comprehensive identity protection platform that monitors, detects, and responds to identity theft attempts in real-time.',
      features: ['Dark Web Monitoring', 'Credit Protection', 'Recovery Services'],
      href: '/products/id-shield.html',
      color: '#0B85E5',
    },
    {
      name: 'ScamFirewall360',
      tagline: 'Fraud Prevention Engine',
      icon: '🔥',
      description: 'AI-powered fraud detection system that identifies and blocks scam attempts across all communication channels.',
      features: ['Real-Time Detection', 'Multi-Channel', 'AI-Powered'],
      href: '/products/scamfirewall360.html',
      color: '#F59E0B',
    },
  ]

  // PROTECTION & INTELLIGENCE (2 products)
  const protectionProducts = [
    {
      name: 'HeartGuard AI',
      tagline: 'Family Protection Platform',
      icon: '❤️',
      description: 'Intelligent family protection system that safeguards your loved ones from online threats, predators, and harmful content.',
      features: ['Child Safety', 'Content Filtering', 'Location Tracking'],
      href: '/products/heartguard-ai.html',
      color: '#EF4444',
    },
    {
      name: 'HomelandWatch7',
      tagline: 'National Security Intelligence',
      icon: '🏛️',
      description: 'Advanced threat intelligence platform designed for government agencies and critical infrastructure protection.',
      features: ['Threat Intel', 'Multi-INT', 'Classified Ready'],
      href: '/products/homelandwatch7.html',
      color: '#8B5CF6',
    },
  ]

  // GOVERNMENT / NATIONAL SECURITY EXPANSION (4 products)
  const governmentProducts = [
    {
      name: 'CounterAI Sentinel',
      tagline: 'Autonomous Threat Counterintelligence',
      icon: '🎯',
      description: 'Advanced counterintelligence platform that autonomously detects, tracks, and neutralizes AI-powered threats targeting government operations.',
      features: ['Autonomous Response', 'Threat Hunting', 'Zero-Day Defense'],
      href: '#',
      color: '#DC2626',
    },
    {
      name: 'OSINT Recon360',
      tagline: 'Open-Source Intelligence Fusion Grid',
      icon: '🌐',
      description: 'Comprehensive open-source intelligence platform that aggregates, analyzes, and correlates data from thousands of public sources in real-time.',
      features: ['Multi-Source Fusion', 'Pattern Analysis', 'Geospatial Intel'],
      href: '#',
      color: '#2563EB',
    },
    {
      name: 'InfraGuard Nexus',
      tagline: 'Critical Infrastructure Protection AI',
      icon: '⚡',
      description: 'AI-driven protection system designed to safeguard critical infrastructure including power grids, water systems, and transportation networks.',
      features: ['SCADA Protection', 'ICS Security', 'Resilience Monitoring'],
      href: '#',
      color: '#7C3AED',
    },
    {
      name: 'BlueShield Patrol AI',
      tagline: 'Law-Enforcement Tactical Intelligence',
      icon: '🚔',
      description: 'Tactical intelligence platform providing real-time situational awareness and threat assessment for law enforcement operations.',
      features: ['Real-Time Alerts', 'Officer Safety', 'Predictive Analytics'],
      href: '#',
      color: '#1D4ED8',
    },
  ]

  // ENTERPRISE SECURITY EXPANSION (3 products)
  const enterpriseProducts = [
    {
      name: 'CyberTrace Monitor',
      tagline: 'Enterprise Intrusion & Anomaly Engine',
      icon: '📡',
      description: 'Enterprise-grade intrusion detection system that monitors network traffic and identifies anomalous behavior patterns before breaches occur.',
      features: ['Network Monitoring', 'Anomaly Detection', 'Incident Response'],
      href: '#',
      color: '#059669',
    },
    {
      name: 'VaultLock Quantum',
      tagline: 'Post-Quantum Data Protection Vault',
      icon: '🔐',
      description: 'Quantum-resistant data vault that provides military-grade encryption for enterprise data storage and transmission in the post-quantum era.',
      features: ['Quantum-Safe', 'Data Vault', 'Key Management'],
      href: '#',
      color: '#4F46E5',
    },
    {
      name: 'FraudMatrix Enterprise',
      tagline: 'Behavioral Fraud Intelligence',
      icon: '🔍',
      description: 'Enterprise fraud detection platform using behavioral analytics and machine learning to identify and prevent sophisticated fraud schemes.',
      features: ['Behavioral AI', 'Transaction Monitoring', 'Risk Scoring'],
      href: '#',
      color: '#CA8A04',
    },
  ]

  // CONSUMER / FAMILY PROTECTION EXPANSION (2 products)
  const consumerProducts = [
    {
      name: 'ElderGuard AI',
      tagline: 'Senior Fraud Prevention & Safety Intelligence',
      icon: '👴',
      description: 'Specialized protection platform designed to safeguard seniors from scams, fraud, and exploitation with easy-to-use monitoring and alerts.',
      features: ['Scam Prevention', 'Financial Monitoring', 'Family Alerts'],
      href: '#',
      color: '#9333EA',
    },
    {
      name: 'ChildShield Vision',
      tagline: 'Child Safety & Behavioral Threat Detection',
      icon: '👶',
      description: 'Advanced child safety platform that detects online predators, cyberbullying, and harmful content while monitoring behavioral threat indicators.',
      features: ['Predator Detection', 'Content Safety', 'Behavioral Analysis'],
      href: '#',
      color: '#EC4899',
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-[#12F6C8]/10 via-[#0B85E5]/10 to-[#12F6C8]/10 rounded-full blur-3xl opacity-30" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">PRODUCT SUITE</span>
          </div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">AUTONOMOUS</span><br />
            <span className="text-[#12F6C8] glow-text">INTELLIGENCE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Fourteen AI-powered products designed to protect, predict, and prevail. 
            Each product operates as an interactive console, giving you complete 
            control over your security posture.
          </p>
          <p className="text-gray-500 italic">
            "We don't make technology — we make technology intelligent."
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <ProductStats />
        </div>
      </section>

      {/* Security Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Security & Encryption"
            description="Advanced security solutions powered by autonomous intelligence"
            products={securityProducts}
          />
        </div>
      </section>

      {/* Protection Products */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Protection & Intelligence"
            description="Comprehensive protection for families and national security"
            products={protectionProducts}
          />
        </div>
      </section>

      {/* Government / National Security Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Government / National Security Expansion"
            description="Mission-critical intelligence systems for federal, state, and law enforcement operations"
            products={governmentProducts}
          />
        </div>
      </section>

      {/* Enterprise Security Products */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Enterprise Security Expansion"
            description="Enterprise-grade security solutions for organizations of all sizes"
            products={enterpriseProducts}
          />
        </div>
      </section>

      {/* Consumer / Family Protection Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Consumer / Family Protection Expansion"
            description="Specialized protection for families, seniors, and children"
            products={consumerProducts}
          />
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#12F6C8]/20">
                  <th className="text-left p-4 text-gray-400">Feature</th>
                  <th className="p-4 text-[#12F6C8]">GhostQuant</th>
                  <th className="p-4 text-[#0B85E5]">ID SHIELD</th>
                  <th className="p-4 text-[#F59E0B]">ScamFirewall</th>
                  <th className="p-4 text-[#EF4444]">HeartGuard</th>
                  <th className="p-4 text-[#8B5CF6]">HomelandWatch</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'AI-Powered', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'Real-Time Monitoring', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'Encryption', values: ['✓', '✓', '○', '○', '✓'] },
                  { feature: 'Identity Protection', values: ['○', '✓', '✓', '○', '○'] },
                  { feature: 'Family Features', values: ['○', '✓', '○', '✓', '○'] },
                  { feature: 'Government Ready', values: ['✓', '○', '○', '○', '✓'] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#12F6C8]/10">
                    <td className="p-4 text-white">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className={`p-4 text-center ${val === '✓' ? 'text-green-400' : 'text-gray-600'}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#12F6C8]/10 to-[#0B85E5]/10 border-y border-[#12F6C8]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Deploy Autonomous Intelligence?</h2>
          <p className="text-gray-400 mb-8">Contact us to discuss which products are right for your organization.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Demo
            </Link>
            <Link href="/government.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Government Solutions
            </Link>
            <Link href="/enterprise.html" className="px-8 py-4 border border-[#0B85E5]/50 text-[#0B85E5] rounded-lg hover:bg-[#0B85E5]/10 transition-all">
              Enterprise Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
