'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ProhibitedUseCard({ icon, title, description, examples }: { icon: string; title: string; description: string; examples: string[] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div 
      className="p-6 bg-[#0D0D0F] rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-400 mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
          {expanded && (
            <div className="mt-4 pt-4 border-t border-red-500/10">
              <div className="text-gray-500 text-xs mb-2">Examples of prohibited activities:</div>
              <ul className="space-y-1">
                {examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-red-400">✗</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span className={`text-red-400 transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>
    </div>
  )
}

function EnforcementStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <span className="text-red-400 font-bold">{number}</span>
        </div>
        {number < 5 && <div className="w-px h-full bg-red-500/20" />}
      </div>
      <div className="pb-6">
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  )
}

function ReportingChannel({ icon, title, description, contact }: { icon: string; title: string; description: string; contact: string }) {
  return (
    <div className="p-5 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="text-[#12F6C8] font-mono text-sm">{contact}</div>
    </div>
  )
}

export default function AIMisuseProhibitionPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const prohibitedUses = [
    {
      icon: '⚔️',
      title: 'Autonomous Weapons',
      description: 'AI systems designed to select and engage targets without meaningful human control',
      examples: ['Lethal autonomous weapons', 'Automated targeting systems', 'AI-controlled munitions']
    },
    {
      icon: '👁️',
      title: 'Mass Surveillance',
      description: 'Indiscriminate monitoring of populations without legal basis or oversight',
      examples: ['Warrantless mass data collection', 'Social credit scoring', 'Predictive policing without safeguards']
    },
    {
      icon: '🎭',
      title: 'Deceptive Manipulation',
      description: 'AI used to deceive, manipulate, or exploit human psychological vulnerabilities',
      examples: ['Non-consensual deepfakes', 'Manipulative dark patterns', 'Exploitation of cognitive biases']
    },
    {
      icon: '🚫',
      title: 'Discrimination',
      description: 'AI systems that discriminate based on protected characteristics',
      examples: ['Biased hiring algorithms', 'Discriminatory lending', 'Unfair criminal justice applications']
    },
    {
      icon: '🔓',
      title: 'Privacy Violations',
      description: 'Unauthorized collection, use, or disclosure of personal information',
      examples: ['Unauthorized data harvesting', 'Facial recognition without consent', 'Location tracking abuse']
    },
    {
      icon: '💀',
      title: 'Harm to Individuals',
      description: 'AI applications that could cause physical, psychological, or financial harm',
      examples: ['Harassment tools', 'Fraud enablement', 'Self-harm promotion']
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <span className="text-red-400 text-sm tracking-wider">ZERO TOLERANCE POLICY</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">AI MISUSE</span>{' '}
            <span className="text-red-400">PROHIBITION</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            G3TI maintains a strict zero-tolerance policy against the misuse of AI technology. 
            This document outlines prohibited uses and our enforcement mechanisms.
          </p>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl inline-block">
            <p className="text-red-400 font-semibold">
              "We will not develop, deploy, or enable AI systems that harm humanity."
            </p>
          </div>
        </div>
      </section>

      {/* Prohibited Uses */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Prohibited Uses</h2>
          <div className="space-y-4">
            {prohibitedUses.map((use, i) => (
              <ProhibitedUseCard key={i} {...use} />
            ))}
          </div>
        </div>
      </section>

      {/* Enforcement */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Enforcement Process</h2>
          <div className="p-6 bg-[#050505] rounded-xl border border-red-500/20">
            <EnforcementStep number={1} title="Detection" description="Automated monitoring and human review identify potential misuse" />
            <EnforcementStep number={2} title="Investigation" description="Security team conducts thorough investigation of the incident" />
            <EnforcementStep number={3} title="Determination" description="Ethics committee reviews findings and determines violation severity" />
            <EnforcementStep number={4} title="Action" description="Appropriate enforcement action taken based on violation type" />
            <EnforcementStep number={5} title="Remediation" description="Steps taken to prevent recurrence and address any harm caused" />
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Consequences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
              <h3 className="text-yellow-400 font-bold text-xl mb-4">Minor Violations</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Written warning</li>
                <li>• Mandatory retraining</li>
                <li>• Enhanced monitoring</li>
                <li>• Access restrictions</li>
              </ul>
            </div>
            <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
              <h3 className="text-orange-400 font-bold text-xl mb-4">Serious Violations</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Service suspension</li>
                <li>• Contract termination</li>
                <li>• Financial penalties</li>
                <li>• Public disclosure</li>
              </ul>
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h3 className="text-red-400 font-bold text-xl mb-4">Severe Violations</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Immediate termination</li>
                <li>• Legal action</li>
                <li>• Law enforcement referral</li>
                <li>• Permanent ban</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Report Misuse</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            If you witness or suspect AI misuse involving G3TI technology, please report it 
            immediately through one of our secure channels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReportingChannel
              icon="📧"
              title="Email"
              description="Send detailed reports via encrypted email"
              contact="ethics@g3ti.com"
            />
            <ReportingChannel
              icon="📞"
              title="Hotline"
              description="24/7 anonymous reporting hotline"
              contact="1-800-G3TI-ETHICS"
            />
            <ReportingChannel
              icon="🔒"
              title="Secure Portal"
              description="Submit reports through our secure portal"
              contact="report.g3ti.com"
            />
          </div>
          <div className="mt-8 p-4 bg-[#050505] rounded-lg text-center">
            <p className="text-gray-500 text-sm">
              All reports are treated confidentially. Whistleblower protections apply.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Committed to Ethical AI</h2>
          <p className="text-gray-400 mb-6">Partner with an organization that takes AI ethics seriously.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Contact Us
            </Link>
            <Link href="/compliance/fedramp-alignment.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              FedRAMP Alignment →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
