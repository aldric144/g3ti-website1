'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function DataFlowDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (diagramRef.current) {
      const nodes = diagramRef.current.querySelectorAll('.flow-node')
      gsap.fromTo(nodes,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [])

  return (
    <div ref={diagramRef} className="relative py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {['Collection', 'Processing', 'Storage', 'Usage', 'Disposal'].map((stage, i) => (
          <div key={i} className="flow-node text-center">
            <div className="w-16 h-16 rounded-full bg-[#12F6C8]/10 border-2 border-[#12F6C8]/30 flex items-center justify-center mx-auto mb-2">
              <span className="text-[#12F6C8] font-bold">{i + 1}</span>
            </div>
            <div className="text-white text-sm font-semibold">{stage}</div>
            {i < 4 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-[#12F6C8]/30" style={{ left: `${20 + i * 20}%` }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function DataCategory({ icon, name, classification, retention, controls }: { icon: string; name: string; classification: string; retention: string; controls: string[] }) {
  const classColors: Record<string, string> = {
    'Critical': 'bg-red-500/20 text-red-400',
    'Sensitive': 'bg-orange-500/20 text-orange-400',
    'Internal': 'bg-yellow-500/20 text-yellow-400',
    'Public': 'bg-green-500/20 text-green-400',
  }

  return (
    <div className="p-5 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-white font-semibold">{name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${classColors[classification]}`}>{classification}</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-3">Retention: <span className="text-[#12F6C8]">{retention}</span></div>
      <div className="flex flex-wrap gap-2">
        {controls.map((control, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-[#050505] text-gray-400 rounded">{control}</span>
        ))}
      </div>
    </div>
  )
}

function PolicyCard({ title, description, lastUpdated }: { title: string; description: string; lastUpdated: string }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10 hover:border-[#12F6C8]/20 transition-all">
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="text-xs text-gray-600">Last updated: {lastUpdated}</div>
    </div>
  )
}

export default function DataGovernancePage() {
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

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B85E5]/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#0B85E5]/10 border border-[#0B85E5]/30 mb-6">
            <span className="text-[#0B85E5] text-sm tracking-wider">DATA MANAGEMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">DATA</span>{' '}
            <span className="text-[#12F6C8] glow-text">GOVERNANCE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Comprehensive data lifecycle management ensuring data quality, security, privacy, 
            and compliance across all G3TI systems and operations.
          </p>
          
          <DataFlowDiagram />
        </div>
      </section>

      {/* Tabs */}
      <section className="border-y border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['overview', 'classification', 'policies', 'compliance'].map(tab => (
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
                  <h3 className="text-xl font-bold text-white mb-4">Data Governance Framework</h3>
                  <p className="text-gray-400 mb-4">
                    Our data governance framework establishes the policies, procedures, and standards 
                    for managing data as a strategic asset while ensuring compliance with regulatory 
                    requirements and protecting stakeholder interests.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Data Assets', value: '2.4M+' },
                      { label: 'Policies Active', value: '47' },
                      { label: 'Compliance Rate', value: '99.2%' },
                      { label: 'Data Stewards', value: '23' },
                    ].map((stat, i) => (
                      <div key={i} className="p-3 bg-[#050505] rounded-lg text-center">
                        <div className="text-2xl font-bold text-[#12F6C8]">{stat.value}</div>
                        <div className="text-gray-500 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Key Principles</h3>
                  <ul className="space-y-3">
                    {[
                      'Data is a strategic asset requiring active management',
                      'Data quality is everyone\'s responsibility',
                      'Privacy and security are non-negotiable',
                      'Transparency in data practices builds trust',
                      'Compliance is the minimum standard, not the goal',
                    ].map((principle, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <span className="text-[#12F6C8] mt-1">●</span>
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Governance Structure</h3>
                  <div className="space-y-4">
                    {[
                      { role: 'Chief Data Officer', desc: 'Executive accountability for data strategy' },
                      { role: 'Data Governance Council', desc: 'Cross-functional policy oversight' },
                      { role: 'Data Stewards', desc: 'Domain-specific data management' },
                      { role: 'Data Custodians', desc: 'Technical data operations' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-[#050505] rounded-lg">
                        <div className="text-[#12F6C8] font-semibold">{item.role}</div>
                        <div className="text-gray-500 text-sm">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classification' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Data Classification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCategory icon="🔴" name="Critical Data" classification="Critical" retention="7 years" controls={['Encryption', 'MFA', 'Audit Logging', 'DLP']} />
                <DataCategory icon="🟠" name="Sensitive Data" classification="Sensitive" retention="5 years" controls={['Encryption', 'Access Control', 'Monitoring']} />
                <DataCategory icon="🟡" name="Internal Data" classification="Internal" retention="3 years" controls={['Access Control', 'Backup']} />
                <DataCategory icon="🟢" name="Public Data" classification="Public" retention="1 year" controls={['Version Control']} />
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Data Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <PolicyCard title="Data Collection Policy" description="Standards for lawful and ethical data collection" lastUpdated="2025-12-15" />
                <PolicyCard title="Data Retention Policy" description="Guidelines for data lifecycle and disposal" lastUpdated="2025-11-20" />
                <PolicyCard title="Data Access Policy" description="Rules for data access and authorization" lastUpdated="2025-12-01" />
                <PolicyCard title="Data Quality Policy" description="Standards for data accuracy and completeness" lastUpdated="2025-10-30" />
                <PolicyCard title="Data Privacy Policy" description="Protection of personal and sensitive data" lastUpdated="2025-12-10" />
                <PolicyCard title="Data Sharing Policy" description="Guidelines for internal and external sharing" lastUpdated="2025-11-15" />
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-4">Regulatory Compliance</h3>
                <div className="space-y-3">
                  {[
                    { reg: 'GDPR', status: 'Compliant', score: 98 },
                    { reg: 'CCPA', status: 'Compliant', score: 97 },
                    { reg: 'HIPAA', status: 'Compliant', score: 99 },
                    { reg: 'SOC 2', status: 'Compliant', score: 100 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                      <span className="text-white font-semibold">{item.reg}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 text-sm">{item.status}</span>
                        <span className="text-[#12F6C8] font-mono">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-4">Audit Schedule</h3>
                <div className="space-y-3">
                  {[
                    { audit: 'Internal Data Audit', date: 'Q1 2026', status: 'Scheduled' },
                    { audit: 'External Compliance Audit', date: 'Q2 2026', status: 'Scheduled' },
                    { audit: 'Privacy Impact Assessment', date: 'Q1 2026', status: 'In Progress' },
                    { audit: 'Data Quality Review', date: 'Monthly', status: 'Ongoing' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                      <div>
                        <div className="text-white">{item.audit}</div>
                        <div className="text-gray-500 text-sm">{item.date}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === 'Ongoing' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Master Your Data</h2>
          <p className="text-gray-400 mb-6">Learn how G3TI can help establish robust data governance.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Get Started
            </Link>
            <Link href="/zero-trust.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Zero Trust →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
