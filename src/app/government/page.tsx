'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'

const ThreatWarfield = dynamic(() => import('@/components/3d/ThreatWarfield'), { 
  ssr: false, 
  loading: () => <div className="w-full h-[500px] bg-[#050505] animate-pulse" /> 
})

interface ThreatNode {
  id: string
  name: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  description: string
}

const threatNodes: ThreatNode[] = [
  { id: '1', name: 'Deepfake Impersonation', severity: 'critical', type: 'Identity Threat', description: 'AI-generated video/audio impersonating officials' },
  { id: '2', name: 'Synthetic Identity Networks', severity: 'critical', type: 'Fraud Vector', description: 'Coordinated fake identity operations' },
  { id: '3', name: 'Voice Clone Attacks', severity: 'high', type: 'Social Engineering', description: 'Real-time voice synthesis for deception' },
  { id: '4', name: 'Automated Disinformation', severity: 'high', type: 'Information Warfare', description: 'AI-powered propaganda campaigns' },
  { id: '5', name: 'Credential Harvesting', severity: 'high', type: 'Access Threat', description: 'Targeted phishing with AI personalization' },
  { id: '6', name: 'Supply Chain Infiltration', severity: 'medium', type: 'Infrastructure', description: 'Compromised vendor access points' },
]

function ThreatNodeCard({ node, index }: { node: ThreatNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
      )
    }
  }, [index])

  const severityColors = {
    critical: 'border-red-500 bg-red-500/10',
    high: 'border-orange-500 bg-orange-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-green-500 bg-green-500/10',
  }

  const severityGlow = {
    critical: 'shadow-red-500/20',
    high: 'shadow-orange-500/20',
    medium: 'shadow-yellow-500/20',
    low: 'shadow-green-500/20',
  }

  return (
    <div 
      ref={cardRef}
      className={`p-4 rounded-lg border ${severityColors[node.severity]} hover:shadow-lg ${severityGlow[node.severity]} transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-gray-500">{node.type}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          node.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
          node.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
          node.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {node.severity.toUpperCase()}
        </span>
      </div>
      <h3 className="text-white font-semibold mb-1 group-hover:text-[#12F6C8] transition-colors">{node.name}</h3>
      <p className="text-gray-400 text-sm">{node.description}</p>
    </div>
  )
}

function CapabilityCard({ title, description, icon, features }: { title: string; description: string; icon: string; features: string[] }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/40 transition-all duration-500 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#12F6C8]/5 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-[#12F6C8] mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className={`space-y-2 transition-all duration-500 ${isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GovernmentPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const filteredThreats = activeFilter === 'all' 
    ? threatNodes 
    : threatNodes.filter(t => t.severity === activeFilter)

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section - Threat Warfield */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ThreatWarfield />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/50 z-10" />
        
        <div ref={headerRef} className="relative z-20 max-w-7xl mx-auto px-4 py-24">
          <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <span className="text-red-400 text-sm tracking-wider">CLASSIFIED // GOVERNMENT SECTOR</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">THREAT</span><br />
            <span className="text-[#12F6C8] glow-text">WARFIELD</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Real-time threat visualization and autonomous protective intelligence 
            for federal, state, and local government operations.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Briefing
            </Link>
            <Link href="/dossiers/threat-architecture.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              View Threat Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Active Threats Section */}
      <section className="py-20 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">ACTIVE <span className="text-[#12F6C8]">THREAT MATRIX</span></h2>
              <p className="text-gray-400">Real-time monitoring of emerging threat vectors</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              {['all', 'critical', 'high', 'medium'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#12F6C8] text-black' 
                      : 'bg-[#0D0D0F] border border-gray-700 text-gray-400 hover:border-[#12F6C8]/50'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredThreats.map((node, i) => (
              <ThreatNodeCard key={node.id} node={node} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">GOVERNMENT <span className="text-[#12F6C8]">CAPABILITIES</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Purpose-built intelligence systems for federal, state, and local government operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard
              icon="🎯"
              title="Threat Detection"
              description="AI-powered identification of emerging threats before they materialize"
              features={['Deepfake detection', 'Synthetic identity analysis', 'Behavioral anomaly detection']}
            />
            <CapabilityCard
              icon="🔍"
              title="Digital Forensics"
              description="Advanced investigation tools for cyber incidents and fraud"
              features={['Evidence preservation', 'Chain of custody', 'Court-ready reporting']}
            />
            <CapabilityCard
              icon="🛡️"
              title="Identity Protection"
              description="Comprehensive identity verification and protection systems"
              features={['Biometric verification', 'Document authentication', 'Identity monitoring']}
            />
            <CapabilityCard
              icon="📡"
              title="OSINT Integration"
              description="Open-source intelligence gathering and analysis"
              features={['Social media monitoring', 'Dark web surveillance', 'Threat actor tracking']}
            />
            <CapabilityCard
              icon="⚡"
              title="Real-Time Response"
              description="Automated threat response and mitigation systems"
              features={['Instant alerting', 'Automated containment', 'Incident coordination']}
            />
            <CapabilityCard
              icon="📊"
              title="Predictive Analytics"
              description="Machine learning models for threat prediction"
              features={['Pattern recognition', 'Risk scoring', 'Trend analysis']}
            />
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">COMPLIANCE <span className="text-[#12F6C8]">READY</span></h2>
              <p className="text-gray-300 mb-8">
                Our systems are designed to meet the most stringent government security and compliance requirements.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'FedRAMP', status: 'Aligned' },
                  { name: 'CJIS', status: 'Compliant' },
                  { name: 'NIST 800-53', status: 'Certified' },
                  { name: 'Zero Trust', status: 'Architecture' },
                  { name: 'SOC 2', status: 'Type II' },
                  { name: 'FISMA', status: 'Ready' },
                ].map((cert, i) => (
                  <div key={i} className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/20">
                    <div className="text-[#12F6C8] font-semibold">{cert.name}</div>
                    <div className="text-gray-400 text-sm">{cert.status}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[#12F6C8]/10 to-[#0B85E5]/10 border border-[#12F6C8]/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Government-Grade Security</h3>
                  <p className="text-gray-400">Built for the most demanding security environments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#050505] to-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Secure Your Operations?</h2>
          <p className="text-gray-400 mb-8">
            Schedule a classified briefing with our government solutions team.
          </p>
          <Link href="/contact.html" className="inline-block px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Request Government Briefing
          </Link>
        </div>
      </section>
    </div>
  )
}
