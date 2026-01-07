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

function CapabilityGlyph({ type, color = '#12F6C8' }: { type: string; color?: string }) {
  const glyphs: Record<string, JSX.Element> = {
    target: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" strokeDasharray="4 2" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="6" />
        <circle cx="24" cy="24" r="2" fill={color} />
      </svg>
    ),
    forensics: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="20" cy="20" r="12" />
        <path d="M30 30l10 10" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M24 4L6 12v12c0 10 8 16 18 20 10-4 18-10 18-20V12L24 4z" />
        <circle cx="24" cy="24" r="6" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    osint: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" />
        <ellipse cx="24" cy="24" rx="8" ry="16" />
        <path d="M8 24h32M10 16h28M10 32h28" strokeOpacity="0.5" />
      </svg>
    ),
    response: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M24 4v40M4 24h40" strokeLinecap="round" />
        <circle cx="24" cy="24" r="8" fill={color} fillOpacity="0.2" />
        <circle cx="24" cy="24" r="16" strokeDasharray="4 2" />
      </svg>
    ),
    analytics: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="6" y="28" width="8" height="14" />
        <rect x="20" y="18" width="8" height="24" />
        <rect x="34" y="8" width="8" height="34" />
        <path d="M6 14l14-6 14 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }
  return <div className="w-10 h-10">{glyphs[type] || glyphs.target}</div>
}

function CapabilityCard({ title, description, glyphType, features, classification }: { title: string; description: string; glyphType: string; features: string[]; classification: string }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/40 transition-all duration-500 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#12F6C8]/5 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute top-3 right-4 text-[8px] font-mono text-[#12F6C8]/50 tracking-wider">{classification}</div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <CapabilityGlyph type={glyphType} />
        </div>
        <h3 className="text-xl font-bold text-[#12F6C8] mb-2 tracking-wide">{title}</h3>
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
              glyphType="target"
              classification="TS//SCI"
              title="Threat Detection"
              description="Autonomous threat identification utilizing behavioral AI and pattern recognition to detect emerging attack vectors before materialization"
              features={['Deepfake detection', 'Synthetic identity analysis', 'Behavioral anomaly detection']}
            />
            <CapabilityCard
              glyphType="forensics"
              classification="SECRET"
              title="Digital Forensics"
              description="Advanced cyber forensics platform providing evidence preservation, chain of custody, and court-ready intelligence reporting"
              features={['Evidence preservation', 'Chain of custody', 'Court-ready reporting']}
            />
            <CapabilityCard
              glyphType="shield"
              classification="SECRET"
              title="Identity Protection"
              description="Multi-factor identity verification and continuous monitoring system for credential integrity across federal networks"
              features={['Biometric verification', 'Document authentication', 'Identity monitoring']}
            />
            <CapabilityCard
              glyphType="osint"
              classification="FOUO"
              title="OSINT Integration"
              description="Global open-source intelligence aggregation and analysis platform with dark web surveillance and threat actor tracking"
              features={['Social media monitoring', 'Dark web surveillance', 'Threat actor tracking']}
            />
            <CapabilityCard
              glyphType="response"
              classification="TS//SCI"
              title="Real-Time Response"
              description="Automated threat response and containment system with instant alerting and coordinated incident management"
              features={['Instant alerting', 'Automated containment', 'Incident coordination']}
            />
            <CapabilityCard
              glyphType="analytics"
              classification="SECRET"
              title="Predictive Analytics"
              description="Machine learning threat prediction models utilizing pattern recognition, risk scoring, and trend analysis for proactive defense"
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
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[#12F6C8]/10 to-[#0B85E5]/10 border border-[#12F6C8]/20 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#12F6C8]/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#12F6C8]/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#12F6C8]/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#12F6C8]/40" />
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#12F6C8" strokeWidth="1.5">
                      <path d="M32 8L8 20v24l24 12 24-12V20L32 8z" />
                      <rect x="20" y="28" width="24" height="16" rx="2" />
                      <circle cx="32" cy="36" r="4" fill="#12F6C8" fillOpacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Government-Grade Security</h3>
                  <p className="text-gray-400 text-sm">Built for the most demanding security environments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREAT OPERATIONS COMMAND ROOM Section */}
      <section className="py-20 px-4 bg-[#050505] relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#12F6C8 1px, transparent 1px), linear-gradient(90deg, #12F6C8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#12F6C8] animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#12F6C8] animate-ping opacity-75" />
              </div>
              <span className="text-[#12F6C8] text-sm tracking-wider font-mono">CLASSIFIED // ACTIVE MONITORING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">THREAT OPERATIONS</span><br />
              <span className="text-[#12F6C8] glow-text">COMMAND ROOM</span>
            </h2>
            <p className="text-gray-400 text-lg">FOR GOVERNMENT & LAW ENFORCEMENT PARTNERS</p>
          </div>

          {/* National Threat Grid */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-[#12F6C8]" />
              <h3 className="text-2xl font-bold text-white">NATIONAL THREAT GRID</h3>
              <span className="text-xs text-gray-500 font-mono">(Live Monitoring Panels)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Domestic Violence Escalation Vectors',
                'Human Trafficking Digital Corridors',
                'Synthetic Identity Clusters',
                'Deepfake Threat Patterns',
                'Scam Network Nodes',
                'AI-Enabled Exploitation Graphs',
                'Dark-Web Exploitation Heatmaps',
                'Machine-Speed Deception Mapping',
              ].map((threat, i) => (
                <div 
                  key={i}
                  className="relative p-5 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg overflow-hidden group hover:border-[#12F6C8]/50 transition-all duration-300"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#12F6C8]/40" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#12F6C8]/40" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#12F6C8]/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#12F6C8]/40" />
                  
                  {/* Scanner sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12F6C8]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Scanlines */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="w-full h-full" style={{ 
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(18,246,200,0.03) 2px, rgba(18,246,200,0.03) 4px)'
                    }} />
                  </div>

                  <h4 className="text-white font-semibold text-sm leading-tight mb-3">{threat}</h4>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-[#12F6C8] animate-pulse" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#12F6C8] animate-ping opacity-75" />
                    </div>
                    <span className="text-[#12F6C8] text-xs font-mono tracking-wider" style={{ textShadow: '0 0 10px rgba(18,246,200,0.5)' }}>
                      MONITORING ACTIVE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence Brief Blocks */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6 text-[#12F6C8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-white">INTELLIGENCE BRIEF BLOCKS</h3>
              <span className="text-xs text-gray-500 font-mono">(Clickable Unit Profiles)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { name: 'Police Departments', status: 'loaded', description: 'Domestic threat escalation prediction' },
                { name: 'Fusion Centers', status: 'click', description: null },
                { name: 'Investigators', status: 'loaded', description: 'Digital evidence trail mapping' },
                { name: 'Analysts', status: 'click', description: null },
                { name: 'Domestic Violence Units', status: 'click', description: null },
                { name: 'Crisis Response Teams', status: 'click', description: null },
                { name: 'Homeland Security Partners', status: 'click', description: null },
              ].map((unit, i) => (
                <div 
                  key={i}
                  className="relative p-5 bg-[#0A0A0C] border border-[#0B85E5]/20 rounded-lg cursor-pointer group hover:border-[#0B85E5]/60 hover:shadow-lg hover:shadow-[#0B85E5]/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B85E5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <h4 className="text-white font-semibold mb-3">{unit.name}</h4>
                    {unit.status === 'loaded' ? (
                      <div className="space-y-1">
                        <div className="text-[#12F6C8] text-xs font-mono">[ UNIT PROFILE LOADED ]</div>
                        <div className="text-[#12F6C8] text-xs font-mono">[ THREAT SCENARIO ANALYSIS READY ]</div>
                        {unit.description && <div className="text-gray-400 text-xs mt-2">{unit.description}</div>}
                      </div>
                    ) : (
                      <div className="text-[#0B85E5] text-xs font-mono group-hover:text-[#12F6C8] transition-colors">
                        [ CLICK TO ACCESS ]
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* THE G3TI ADVANTAGE */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#12F6C8] animate-pulse" />
              <h3 className="text-2xl font-bold text-white">THE G3TI ADVANTAGE</h3>
            </div>
            
            <div className="max-w-4xl">
              <div className="space-y-4">
                {[
                  'G3TI exposes machine-speed threats traditional systems cannot see.',
                  'G3TI predicts crime trajectories before escalation.',
                  'G3TI identifies synthetic identity actors in milliseconds.',
                  'G3TI fuses OSINT and behavioral vectors across millions of signals.',
                  'G3TI empowers agencies with preemptive intelligence.',
                  'G3TI amplifies law enforcement.',
                  'G3TI accelerates investigators.',
                  'G3TI protects the vulnerable.',
                ].map((advantage, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-[#12F6C8] mt-2 group-hover:shadow-lg group-hover:shadow-[#12F6C8]/50 transition-all" />
                    <p className="text-gray-300 text-lg group-hover:text-white transition-colors">{advantage}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-[#0A0A0C] border border-[#12F6C8]/30 rounded-lg">
                <p className="text-[#12F6C8] text-xl font-semibold italic text-center">
                  This is the future of national safety intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Command Room CTA */}
          <div className="text-center">
            <Link 
              href="/threat-operations-command-room.html"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all"
            >
              Access Full Command Room
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
