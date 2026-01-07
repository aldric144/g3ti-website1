'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function FedRAMPBadge({ level, status }: { level: string; status: 'authorized' | 'in-process' | 'planned' }) {
  const statusColors = {
    authorized: 'border-green-500/30 bg-green-500/5 text-green-400',
    'in-process': 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
    planned: 'border-gray-500/30 bg-gray-500/5 text-gray-400',
  }

  return (
    <div className={`p-6 rounded-xl border ${statusColors[status]} text-center`}>
      <div className="text-4xl mb-3">🏛️</div>
      <div className="text-white font-bold text-xl mb-1">{level}</div>
      <div className={`text-sm capitalize ${statusColors[status].split(' ')[2]}`}>
        {status.replace('-', ' ')}
      </div>
    </div>
  )
}

function ControlFamily({ name, controls, implemented }: { name: string; controls: number; implemented: number }) {
  const percentage = Math.round((implemented / controls) * 100)
  
  return (
    <div className="p-4 bg-[#050505] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">{name}</span>
        <span className="text-[#12F6C8] font-mono text-sm">{implemented}/{controls}</span>
      </div>
      <div className="h-2 bg-[#0D0D0F] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function TimelinePhase({ phase, title, description, status, date }: { phase: number; title: string; description: string; status: 'complete' | 'current' | 'upcoming'; date: string }) {
  const statusColors = {
    complete: 'bg-green-500',
    current: 'bg-yellow-500 animate-pulse',
    upcoming: 'bg-gray-600',
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${statusColors[status]} flex items-center justify-center text-black font-bold`}>
          {status === 'complete' ? '✓' : phase}
        </div>
        {phase < 6 && <div className="w-px h-full bg-gray-700" />}
      </div>
      <div className="pb-8 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold">{title}</h4>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  )
}

function DocumentCard({ title, type, lastUpdated }: { title: string; type: string; lastUpdated: string }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all cursor-pointer">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📄</span>
        <div className="flex-1">
          <h4 className="text-white font-semibold">{title}</h4>
          <div className="text-gray-500 text-sm">{type}</div>
          <div className="text-gray-600 text-xs mt-1">Updated: {lastUpdated}</div>
        </div>
      </div>
    </div>
  )
}

export default function FedRAMPAlignmentPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const controlFamilies = [
    { name: 'Access Control (AC)', controls: 25, implemented: 25 },
    { name: 'Audit & Accountability (AU)', controls: 16, implemented: 16 },
    { name: 'Security Assessment (CA)', controls: 9, implemented: 9 },
    { name: 'Configuration Management (CM)', controls: 11, implemented: 11 },
    { name: 'Contingency Planning (CP)', controls: 13, implemented: 12 },
    { name: 'Identification & Authentication (IA)', controls: 12, implemented: 12 },
    { name: 'Incident Response (IR)', controls: 10, implemented: 10 },
    { name: 'System & Communications (SC)', controls: 44, implemented: 42 },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <span className="text-blue-400 text-sm tracking-wider">FEDERAL AUTHORIZATION</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">FedRAMP</span>{' '}
            <span className="text-[#12F6C8] glow-text">ALIGNMENT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            G3TI is committed to achieving FedRAMP authorization, demonstrating our dedication 
            to meeting the highest federal security standards for cloud services.
          </p>
        </div>
      </section>

      {/* Authorization Status */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FedRAMPBadge level="FedRAMP Low" status="authorized" />
            <FedRAMPBadge level="FedRAMP Moderate" status="in-process" />
            <FedRAMPBadge level="FedRAMP High" status="planned" />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['overview', 'controls', 'timeline', 'documents'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-mono whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-[#12F6C8] border-b-2 border-[#12F6C8] bg-[#12F6C8]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">What is FedRAMP?</h3>
                  <p className="text-gray-400 mb-4">
                    The Federal Risk and Authorization Management Program (FedRAMP) is a government-wide 
                    program that provides a standardized approach to security assessment, authorization, 
                    and continuous monitoring for cloud products and services.
                  </p>
                  <p className="text-gray-400">
                    FedRAMP authorization demonstrates that a cloud service provider meets rigorous 
                    security requirements and can be trusted with federal data.
                  </p>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Our Approach</h3>
                  <ul className="space-y-3">
                    {[
                      'Security-first architecture design',
                      'Continuous monitoring and improvement',
                      'Third-party assessment organization (3PAO) engagement',
                      'Comprehensive documentation',
                      'Regular penetration testing',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400">
                        <span className="text-[#12F6C8]">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Key Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Controls Implemented', value: '325+' },
                      { label: 'Compliance Rate', value: '98%' },
                      { label: 'Continuous Monitoring', value: '24/7' },
                      { label: 'Last Assessment', value: 'Q4 2025' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                        <div className="text-2xl font-bold text-[#12F6C8]">{stat.value}</div>
                        <div className="text-gray-500 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Benefits for Agencies</h3>
                  <ul className="space-y-3">
                    {[
                      'Reduced authorization time and cost',
                      'Standardized security requirements',
                      'Continuous security monitoring',
                      'Transparent security posture',
                      'Reusable authorization packages',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400">
                        <span className="text-[#12F6C8]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'controls' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Control Implementation Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {controlFamilies.map((family, i) => (
                  <ControlFamily key={i} {...family} />
                ))}
              </div>
              <div className="mt-8 p-4 bg-[#0D0D0F] rounded-lg text-center">
                <p className="text-gray-400">
                  Total: <span className="text-[#12F6C8] font-bold">137/140</span> controls implemented (98%)
                </p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Authorization Timeline</h2>
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <TimelinePhase phase={1} title="Readiness Assessment" description="Initial gap analysis and remediation planning" status="complete" date="Q2 2025" />
                <TimelinePhase phase={2} title="Documentation" description="SSP, policies, and procedures development" status="complete" date="Q3 2025" />
                <TimelinePhase phase={3} title="3PAO Assessment" description="Independent security assessment" status="complete" date="Q4 2025" />
                <TimelinePhase phase={4} title="Agency Sponsorship" description="Federal agency sponsor engagement" status="current" date="Q1 2026" />
                <TimelinePhase phase={5} title="JAB Review" description="Joint Authorization Board review" status="upcoming" date="Q2 2026" />
                <TimelinePhase phase={6} title="Authorization" description="FedRAMP Moderate authorization" status="upcoming" date="Q3 2026" />
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Authorization Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DocumentCard title="System Security Plan (SSP)" type="Core Document" lastUpdated="Dec 2025" />
                <DocumentCard title="Security Assessment Report" type="3PAO Assessment" lastUpdated="Nov 2025" />
                <DocumentCard title="Plan of Action & Milestones" type="Remediation Tracking" lastUpdated="Dec 2025" />
                <DocumentCard title="Continuous Monitoring Plan" type="Ongoing Assessment" lastUpdated="Dec 2025" />
                <DocumentCard title="Incident Response Plan" type="Security Operations" lastUpdated="Oct 2025" />
                <DocumentCard title="Configuration Management Plan" type="System Management" lastUpdated="Nov 2025" />
              </div>
              <div className="mt-8 p-4 bg-[#0D0D0F] rounded-lg text-center">
                <p className="text-gray-400 text-sm">
                  Full authorization package available to authorized federal agencies upon request.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready for Federal Deployment</h2>
          <p className="text-gray-400 mb-6">Contact us to learn more about our FedRAMP authorization status.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Information
            </Link>
            <Link href="/government.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Government Solutions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
