'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function SecurityStatus() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 bg-[#0D0D0F] rounded-xl border border-green-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">System Security Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400 text-sm">SECURE</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-[#050505] rounded-lg">
          <div className="text-gray-500">Last Security Scan</div>
          <div className="text-[#12F6C8] font-mono">{time.toLocaleTimeString()}</div>
        </div>
        <div className="p-3 bg-[#050505] rounded-lg">
          <div className="text-gray-500">Threat Level</div>
          <div className="text-green-400 font-mono">LOW</div>
        </div>
        <div className="p-3 bg-[#050505] rounded-lg">
          <div className="text-gray-500">Encryption</div>
          <div className="text-[#12F6C8] font-mono">AES-256</div>
        </div>
        <div className="p-3 bg-[#050505] rounded-lg">
          <div className="text-gray-500">Certificate</div>
          <div className="text-green-400 font-mono">VALID</div>
        </div>
      </div>
    </div>
  )
}

function SecurityMeasure({ icon, title, description, status }: { icon: string; title: string; description: string; status: 'active' | 'monitoring' | 'standby' }) {
  const statusColors = {
    active: 'text-green-400',
    monitoring: 'text-yellow-400',
    standby: 'text-blue-400',
  }

  return (
    <div className="p-5 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs ${statusColors[status]} uppercase`}>{status}</span>
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}

function IncidentTimeline() {
  const incidents = [
    { date: 'Dec 2025', type: 'Audit', desc: 'Annual security audit completed - no critical findings' },
    { date: 'Nov 2025', type: 'Update', desc: 'TLS 1.3 implementation completed across all services' },
    { date: 'Oct 2025', type: 'Test', desc: 'Penetration testing conducted by third-party firm' },
    { date: 'Sep 2025', type: 'Cert', desc: 'SOC 2 Type II certification renewed' },
  ]

  return (
    <div className="space-y-4">
      {incidents.map((incident, i) => (
        <div key={i} className="flex gap-4 p-4 bg-[#050505] rounded-lg">
          <div className="text-[#12F6C8] font-mono text-sm w-20 flex-shrink-0">{incident.date}</div>
          <div className="w-px bg-[#12F6C8]/30" />
          <div>
            <span className="text-xs px-2 py-1 bg-[#12F6C8]/10 text-[#12F6C8] rounded mr-2">{incident.type}</span>
            <span className="text-gray-400 text-sm">{incident.desc}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ComplianceBadge({ name, status }: { name: string; status: 'certified' | 'compliant' | 'aligned' }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg text-center">
      <div className="text-2xl mb-2">🏆</div>
      <div className="text-white font-semibold text-sm">{name}</div>
      <div className={`text-xs mt-1 ${
        status === 'certified' ? 'text-green-400' :
        status === 'compliant' ? 'text-blue-400' : 'text-yellow-400'
      }`}>{status.toUpperCase()}</div>
    </div>
  )
}

export default function SecurityNoticePage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <span className="text-green-400 text-sm tracking-wider">SECURITY DOCUMENTATION</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">SECURITY</span>{' '}
            <span className="text-[#12F6C8] glow-text">NOTICE</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            G3TI maintains the highest security standards to protect our systems, data, and users. 
            This notice outlines our security practices and your responsibilities.
          </p>
        </div>
      </section>

      {/* Status */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <SecurityStatus />
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Security Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityMeasure icon="🔐" title="Encryption at Rest" description="All data encrypted using AES-256 encryption with secure key management" status="active" />
            <SecurityMeasure icon="🔒" title="Encryption in Transit" description="TLS 1.3 for all data transmission with perfect forward secrecy" status="active" />
            <SecurityMeasure icon="🛡️" title="Firewall Protection" description="Multi-layer firewall with intrusion detection and prevention" status="active" />
            <SecurityMeasure icon="👁️" title="24/7 Monitoring" description="Continuous security monitoring and threat detection" status="monitoring" />
            <SecurityMeasure icon="🔍" title="Vulnerability Scanning" description="Regular automated and manual security assessments" status="active" />
            <SecurityMeasure icon="🚨" title="Incident Response" description="Dedicated security team with rapid response capabilities" status="standby" />
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Compliance & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ComplianceBadge name="SOC 2 Type II" status="certified" />
            <ComplianceBadge name="ISO 27001" status="certified" />
            <ComplianceBadge name="GDPR" status="compliant" />
            <ComplianceBadge name="CCPA" status="compliant" />
            <ComplianceBadge name="HIPAA" status="compliant" />
            <ComplianceBadge name="FedRAMP" status="aligned" />
          </div>
        </div>
      </section>

      {/* User Responsibilities */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Security Responsibilities</h2>
          <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
            <div className="space-y-4">
              {[
                { title: 'Strong Passwords', desc: 'Use unique, complex passwords and enable multi-factor authentication' },
                { title: 'Secure Access', desc: 'Access services only from trusted networks and devices' },
                { title: 'Report Suspicious Activity', desc: 'Immediately report any unauthorized access or suspicious behavior' },
                { title: 'Keep Software Updated', desc: 'Maintain current versions of browsers and operating systems' },
                { title: 'Protect Credentials', desc: 'Never share your login credentials or API keys with others' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#050505] rounded-lg">
                  <span className="text-[#12F6C8] font-bold">{i + 1}</span>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Timeline */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Security Activity Log</h2>
          <IncidentTimeline />
        </div>
      </section>

      {/* Reporting */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Report a Security Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
              <h3 className="text-xl font-bold text-white mb-4">Security Vulnerabilities</h3>
              <p className="text-gray-400 mb-4">
                If you discover a security vulnerability, please report it through our 
                responsible disclosure program.
              </p>
              <Link href="/compliance/responsible-disclosure.html" className="text-[#12F6C8] hover:underline">
                Responsible Disclosure Program →
              </Link>
            </div>
            <div className="p-6 bg-[#0D0D0F] rounded-xl border border-red-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Security Incidents</h3>
              <p className="text-gray-400 mb-4">
                For urgent security incidents or suspected breaches, contact our 
                security team immediately.
              </p>
              <p className="text-[#12F6C8] font-mono">security@g3ti.com</p>
              <p className="text-gray-500 text-sm mt-2">24/7 Emergency: 1-800-G3TI-SEC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link href="/legal/privacy-policy.html" className="text-[#12F6C8] hover:underline">Privacy Policy</Link>
          <Link href="/legal/terms-of-use.html" className="text-[#12F6C8] hover:underline">Terms of Use</Link>
          <Link href="/legal/intellectual-property.html" className="text-[#12F6C8] hover:underline">Intellectual Property</Link>
        </div>
      </section>
    </div>
  )
}
