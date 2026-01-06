'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ZeroTrustPillar({ icon, title, description, principles }: { icon: string; title: string; description: string; principles: string[] }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div 
      className={`p-6 rounded-xl border transition-all cursor-pointer ${
        expanded ? 'bg-[#12F6C8]/5 border-[#12F6C8]/30' : 'bg-[#0D0D0F] border-[#12F6C8]/10 hover:border-[#12F6C8]/20'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          {expanded && (
            <ul className="space-y-2 mt-4 pt-4 border-t border-[#12F6C8]/10">
              {principles.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className={`text-[#12F6C8] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>
    </div>
  )
}

function TrustScore({ score, label }: { score: number; label: string }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#1a1a1a" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="35" fill="none" stroke="#12F6C8" strokeWidth="6"
            strokeDasharray={`${score * 2.2} 220`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#12F6C8] font-bold text-lg">{score}%</span>
        </div>
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function ImplementationPhase({ phase, title, description, status }: { phase: number; title: string; description: string; status: 'complete' | 'current' | 'upcoming' }) {
  const statusColors = {
    complete: 'bg-green-500',
    current: 'bg-yellow-500 animate-pulse',
    upcoming: 'bg-gray-600',
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full ${statusColors[status]} flex items-center justify-center text-black font-bold text-sm`}>
          {status === 'complete' ? '✓' : phase}
        </div>
        <div className="w-px h-full bg-gray-700" />
      </div>
      <div className="pb-8">
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default function ZeroTrustPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const pillars = [
    {
      icon: '🔐',
      title: 'Identity Verification',
      description: 'Verify every user and device before granting access',
      principles: ['Multi-factor authentication', 'Continuous identity validation', 'Risk-based authentication', 'Privileged access management']
    },
    {
      icon: '🌐',
      title: 'Network Segmentation',
      description: 'Micro-segment networks to limit lateral movement',
      principles: ['Software-defined perimeters', 'Micro-segmentation', 'Encrypted communications', 'Network access control']
    },
    {
      icon: '📱',
      title: 'Device Security',
      description: 'Ensure all devices meet security requirements',
      principles: ['Device health verification', 'Endpoint detection and response', 'Mobile device management', 'Secure configuration baselines']
    },
    {
      icon: '📊',
      title: 'Data Protection',
      description: 'Protect data at rest, in transit, and in use',
      principles: ['Data classification', 'Encryption everywhere', 'Data loss prevention', 'Rights management']
    },
    {
      icon: '👁️',
      title: 'Visibility & Analytics',
      description: 'Monitor and analyze all activity continuously',
      principles: ['Security information and event management', 'User behavior analytics', 'Threat intelligence integration', 'Automated response']
    },
    {
      icon: '⚙️',
      title: 'Automation & Orchestration',
      description: 'Automate security responses and policy enforcement',
      principles: ['Security orchestration', 'Automated remediation', 'Policy as code', 'Continuous compliance']
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <span className="text-red-400 text-sm tracking-wider">SECURITY ARCHITECTURE</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">ZERO</span>{' '}
            <span className="text-[#12F6C8] glow-text">TRUST</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Never trust, always verify. Our Zero Trust architecture ensures that every access 
            request is fully authenticated, authorized, and encrypted before granting access.
          </p>
          <div className="p-4 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 inline-block">
            <div className="text-[#12F6C8] font-mono text-lg">&quot;Assume breach. Verify explicitly. Least privilege access.&quot;</div>
          </div>
        </div>
      </section>

      {/* Trust Scores */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TrustScore score={98} label="Identity" />
            <TrustScore score={95} label="Network" />
            <TrustScore score={97} label="Device" />
            <TrustScore score={99} label="Data" />
            <TrustScore score={96} label="Overall" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Zero Trust Pillars</h2>
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <ZeroTrustPillar key={i} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Implementation Roadmap</h2>
          <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/20">
            <ImplementationPhase phase={1} title="Assessment & Planning" description="Evaluate current security posture and define Zero Trust strategy" status="complete" />
            <ImplementationPhase phase={2} title="Identity Foundation" description="Implement strong identity and access management" status="complete" />
            <ImplementationPhase phase={3} title="Network Transformation" description="Deploy micro-segmentation and software-defined perimeters" status="current" />
            <ImplementationPhase phase={4} title="Data Protection" description="Implement comprehensive data security controls" status="upcoming" />
            <ImplementationPhase phase={5} title="Continuous Monitoring" description="Deploy advanced analytics and automated response" status="upcoming" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Zero Trust Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'Reduced Attack Surface', desc: 'Minimize exposure by eliminating implicit trust' },
              { icon: '🔍', title: 'Enhanced Visibility', desc: 'Complete visibility into all access and activity' },
              { icon: '⚡', title: 'Faster Response', desc: 'Automated detection and response to threats' },
              { icon: '📋', title: 'Simplified Compliance', desc: 'Built-in controls for regulatory requirements' },
              { icon: '☁️', title: 'Cloud Ready', desc: 'Secure access regardless of location' },
              { icon: '💰', title: 'Cost Effective', desc: 'Reduce breach costs and security complexity' },
            ].map((benefit, i) => (
              <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Zero Trust Journey</h2>
          <p className="text-gray-400 mb-6">Partner with G3TI to implement a comprehensive Zero Trust architecture.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Assessment
            </Link>
            <Link href="/compliance/cjis-nist.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              CJIS/NIST →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
