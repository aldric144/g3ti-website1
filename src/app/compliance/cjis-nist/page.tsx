'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ComplianceMatrix({ framework, controls }: { framework: string; controls: { id: string; name: string; status: 'implemented' | 'partial' | 'planned' }[] }) {
  const statusColors = {
    implemented: 'bg-green-500',
    partial: 'bg-yellow-500',
    planned: 'bg-gray-500',
  }

  return (
    <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
      <h3 className="text-xl font-bold text-white mb-4">{framework}</h3>
      <div className="space-y-2">
        {controls.map((control, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-[#12F6C8] font-mono text-sm">{control.id}</span>
              <span className="text-gray-300">{control.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusColors[control.status]}`} />
              <span className="text-xs text-gray-500 capitalize">{control.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CertificationBadge({ name, status, validUntil }: { name: string; status: 'active' | 'pending' | 'expired'; validUntil: string }) {
  const statusStyles = {
    active: 'border-green-500/30 bg-green-500/5',
    pending: 'border-yellow-500/30 bg-yellow-500/5',
    expired: 'border-red-500/30 bg-red-500/5',
  }

  return (
    <div className={`p-4 rounded-xl border ${statusStyles[status]} text-center`}>
      <div className="text-3xl mb-2">🏆</div>
      <div className="text-white font-semibold">{name}</div>
      <div className={`text-xs mt-1 ${
        status === 'active' ? 'text-green-400' : status === 'pending' ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {status === 'active' ? `Valid until ${validUntil}` : status === 'pending' ? 'Certification in progress' : 'Renewal required'}
      </div>
    </div>
  )
}

function RequirementSection({ title, requirements }: { title: string; requirements: { name: string; description: string }[] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-[#12F6C8]/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-[#0D0D0F] flex items-center justify-between hover:bg-[#12F6C8]/5 transition-all"
      >
        <span className="text-white font-semibold">{title}</span>
        <span className={`text-[#12F6C8] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {expanded && (
        <div className="p-4 bg-[#050505] space-y-3">
          {requirements.map((req, i) => (
            <div key={i} className="p-3 bg-[#0D0D0F] rounded-lg">
              <div className="text-[#12F6C8] font-semibold text-sm">{req.name}</div>
              <div className="text-gray-400 text-sm">{req.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CJISNISTPage() {
  const [activeFramework, setActiveFramework] = useState('cjis')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const cjisControls = [
    { id: '5.1', name: 'Information Exchange Agreements', status: 'implemented' as const },
    { id: '5.2', name: 'Security Awareness Training', status: 'implemented' as const },
    { id: '5.3', name: 'Incident Response', status: 'implemented' as const },
    { id: '5.4', name: 'Auditing and Accountability', status: 'implemented' as const },
    { id: '5.5', name: 'Access Control', status: 'implemented' as const },
    { id: '5.6', name: 'Identification and Authentication', status: 'implemented' as const },
  ]

  const nistControls = [
    { id: 'AC-1', name: 'Access Control Policy', status: 'implemented' as const },
    { id: 'AU-2', name: 'Audit Events', status: 'implemented' as const },
    { id: 'CA-7', name: 'Continuous Monitoring', status: 'implemented' as const },
    { id: 'IA-2', name: 'Identification and Authentication', status: 'implemented' as const },
    { id: 'SC-8', name: 'Transmission Confidentiality', status: 'implemented' as const },
    { id: 'SI-4', name: 'Information System Monitoring', status: 'partial' as const },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <span className="text-blue-400 text-sm tracking-wider">FEDERAL COMPLIANCE</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">CJIS &</span>{' '}
            <span className="text-[#12F6C8] glow-text">NIST</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Full compliance with Criminal Justice Information Services (CJIS) Security Policy 
            and NIST Cybersecurity Framework requirements for law enforcement and federal agencies.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CertificationBadge name="CJIS Compliant" status="active" validUntil="Dec 2026" />
            <CertificationBadge name="NIST 800-53" status="active" validUntil="Nov 2026" />
            <CertificationBadge name="NIST 800-171" status="active" validUntil="Oct 2026" />
            <CertificationBadge name="StateRAMP" status="pending" validUntil="" />
          </div>
        </div>
      </section>

      {/* Framework Toggle */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveFramework('cjis')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFramework === 'cjis'
                  ? 'bg-[#12F6C8] text-black'
                  : 'bg-[#0D0D0F] text-gray-400 hover:text-white'
              }`}
            >
              CJIS Security Policy
            </button>
            <button
              onClick={() => setActiveFramework('nist')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFramework === 'nist'
                  ? 'bg-[#12F6C8] text-black'
                  : 'bg-[#0D0D0F] text-gray-400 hover:text-white'
              }`}
            >
              NIST Framework
            </button>
          </div>

          {activeFramework === 'cjis' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComplianceMatrix framework="CJIS Security Policy Controls" controls={cjisControls} />
              <div className="space-y-4">
                <RequirementSection
                  title="Policy Area 1: Information Exchange"
                  requirements={[
                    { name: 'Information Exchange Agreements', description: 'Formal agreements for sharing CJI data' },
                    { name: 'Management Control Agreements', description: 'Oversight of CJI access and handling' },
                  ]}
                />
                <RequirementSection
                  title="Policy Area 4: Auditing & Accountability"
                  requirements={[
                    { name: 'Audit Events', description: 'Logging of all CJI access and modifications' },
                    { name: 'Content of Audit Records', description: 'Detailed audit trail requirements' },
                    { name: 'Audit Monitoring', description: 'Real-time monitoring of audit logs' },
                  ]}
                />
                <RequirementSection
                  title="Policy Area 5: Access Control"
                  requirements={[
                    { name: 'Account Management', description: 'User account lifecycle management' },
                    { name: 'Access Enforcement', description: 'Role-based access control implementation' },
                    { name: 'Least Privilege', description: 'Minimum necessary access principle' },
                  ]}
                />
              </div>
            </div>
          )}

          {activeFramework === 'nist' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComplianceMatrix framework="NIST 800-53 Controls" controls={nistControls} />
              <div className="space-y-4">
                <RequirementSection
                  title="Identify (ID)"
                  requirements={[
                    { name: 'Asset Management', description: 'Inventory and management of all assets' },
                    { name: 'Risk Assessment', description: 'Continuous risk identification and evaluation' },
                  ]}
                />
                <RequirementSection
                  title="Protect (PR)"
                  requirements={[
                    { name: 'Access Control', description: 'Identity management and access control' },
                    { name: 'Data Security', description: 'Protection of data at rest and in transit' },
                    { name: 'Protective Technology', description: 'Security solutions and architectures' },
                  ]}
                />
                <RequirementSection
                  title="Detect (DE)"
                  requirements={[
                    { name: 'Anomalies and Events', description: 'Detection of anomalous activity' },
                    { name: 'Continuous Monitoring', description: 'Ongoing security monitoring' },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Implementation */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Implementation Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📋', title: 'Gap Assessment', desc: 'Identify compliance gaps and remediation priorities' },
              { icon: '🔧', title: 'Implementation', desc: 'Deploy controls and security measures' },
              { icon: '📊', title: 'Continuous Monitoring', desc: 'Ongoing compliance verification and reporting' },
            ].map((service, i) => (
              <div key={i} className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/20 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Achieve Federal Compliance</h2>
          <p className="text-gray-400 mb-6">Partner with G3TI for CJIS and NIST compliance expertise.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Assessment
            </Link>
            <Link href="/compliance/responsible-disclosure.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Responsible Disclosure →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
