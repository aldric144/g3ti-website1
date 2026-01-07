'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function DisclosureStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 flex items-center justify-center">
          <span className="text-[#12F6C8] font-bold">{number}</span>
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

function ScopeItem({ inScope, items }: { inScope: boolean; items: string[] }) {
  return (
    <div className={`p-6 rounded-xl border ${inScope ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
      <h3 className={`text-xl font-bold mb-4 ${inScope ? 'text-green-400' : 'text-red-400'}`}>
        {inScope ? 'In Scope' : 'Out of Scope'}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-300">
            <span className={inScope ? 'text-green-400' : 'text-red-400'}>{inScope ? '✓' : '✗'}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RewardTier({ severity, range, examples }: { severity: string; range: string; examples: string[] }) {
  const severityColors: Record<string, string> = {
    Critical: 'border-red-500/30 bg-red-500/5',
    High: 'border-orange-500/30 bg-orange-500/5',
    Medium: 'border-yellow-500/30 bg-yellow-500/5',
    Low: 'border-blue-500/30 bg-blue-500/5',
  }

  return (
    <div className={`p-5 rounded-xl border ${severityColors[severity]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`font-bold ${
          severity === 'Critical' ? 'text-red-400' :
          severity === 'High' ? 'text-orange-400' :
          severity === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
        }`}>{severity}</span>
        <span className="text-[#12F6C8] font-mono">{range}</span>
      </div>
      <ul className="space-y-1">
        {examples.map((ex, i) => (
          <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            {ex}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResponsibleDisclosurePage() {
  const [formData, setFormData] = useState({ type: '', description: '', steps: '', impact: '', email: '' })
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
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-sm tracking-wider">SECURITY RESEARCH</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">RESPONSIBLE</span>{' '}
            <span className="text-[#12F6C8] glow-text">DISCLOSURE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We value the security research community. Report vulnerabilities responsibly 
            and help us protect our users. Eligible reports may qualify for rewards.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Disclosure Process</h2>
          <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
            <div className="space-y-6">
              <DisclosureStep number={1} title="Discover" description="Find a potential security vulnerability in G3TI systems or products." />
              <DisclosureStep number={2} title="Document" description="Create a detailed report including steps to reproduce, impact assessment, and any proof of concept." />
              <DisclosureStep number={3} title="Submit" description="Send your report through our secure submission form or encrypted email." />
              <DisclosureStep number={4} title="Acknowledge" description="We'll acknowledge receipt within 24 hours and begin our investigation." />
              <DisclosureStep number={5} title="Collaborate" description="Work with our security team to validate and remediate the issue." />
              <DisclosureStep number={6} title="Resolve" description="Once fixed, we'll notify you and discuss public disclosure timeline." />
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Program Scope</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScopeItem
              inScope={true}
              items={[
                'G3TI web applications and APIs',
                'Authentication and authorization flaws',
                'Data exposure vulnerabilities',
                'Injection vulnerabilities (SQL, XSS, etc.)',
                'Business logic flaws',
                'Cryptographic weaknesses',
              ]}
            />
            <ScopeItem
              inScope={false}
              items={[
                'Social engineering attacks',
                'Physical security issues',
                'Denial of service attacks',
                'Third-party services',
                'Issues requiring physical access',
                'Spam or phishing attempts',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Reward Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RewardTier severity="Critical" range="$5,000 - $15,000" examples={['RCE', 'Authentication bypass', 'Data breach']} />
            <RewardTier severity="High" range="$2,000 - $5,000" examples={['Privilege escalation', 'Sensitive data exposure']} />
            <RewardTier severity="Medium" range="$500 - $2,000" examples={['XSS', 'CSRF', 'Information disclosure']} />
            <RewardTier severity="Low" range="$100 - $500" examples={['Minor info leaks', 'Best practice violations']} />
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#050505] rounded-xl border border-green-500/20">
              <h3 className="text-green-400 font-bold mb-4">Do</h3>
              <ul className="space-y-2">
                {[
                  'Test only against your own accounts',
                  'Stop testing if you access user data',
                  'Report vulnerabilities promptly',
                  'Provide detailed reproduction steps',
                  'Allow reasonable time for remediation',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-green-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-[#050505] rounded-xl border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Don't</h3>
              <ul className="space-y-2">
                {[
                  'Access or modify other users data',
                  'Perform destructive testing',
                  'Use automated scanning tools excessively',
                  'Disclose before remediation',
                  'Demand payment for disclosure',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-red-400">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Submit a Report</h2>
          <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Vulnerability Type</label>
                <select
                  className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="">Select type...</option>
                  <option value="xss">Cross-Site Scripting (XSS)</option>
                  <option value="sqli">SQL Injection</option>
                  <option value="auth">Authentication Bypass</option>
                  <option value="data">Data Exposure</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                  className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none h-24"
                  placeholder="Describe the vulnerability..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none"
                  placeholder="researcher@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                Submit Report
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-[#12F6C8]/10 text-center">
              <p className="text-gray-500 text-sm">Or email us directly at</p>
              <p className="text-[#12F6C8] font-mono">security@g3ti.com</p>
              <p className="text-gray-500 text-xs mt-2">PGP key available upon request</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/human-protection-pledge.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Human Protection Pledge →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
