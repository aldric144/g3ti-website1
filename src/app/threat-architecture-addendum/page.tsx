'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function AddendumEntry({ id, title, date, classification, summary, expanded, onToggle }: {
  id: string
  title: string
  date: string
  classification: string
  summary: string
  expanded: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: expanded ? 'auto' : 0,
        opacity: expanded ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [expanded])

  const classColors: Record<string, string> = {
    'TOP SECRET': 'bg-red-500/20 text-red-400 border-red-500/30',
    'SECRET': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'CONFIDENTIAL': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }

  return (
    <div className="border border-[#12F6C8]/10 rounded-lg overflow-hidden mb-4">
      <button
        onClick={onToggle}
        className="w-full p-4 bg-[#0D0D0F] flex items-center justify-between hover:bg-[#12F6C8]/5 transition-all"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#12F6C8] font-mono text-sm">{id}</span>
          <span className="text-white font-semibold">{title}</span>
          <span className={`text-xs px-2 py-1 rounded border ${classColors[classification]}`}>
            {classification}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">{date}</span>
          <span className={`text-[#12F6C8] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="p-4 bg-[#050505] border-t border-[#12F6C8]/10">
          <p className="text-gray-400">{summary}</p>
        </div>
      </div>
    </div>
  )
}

function TechnicalNote({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg border-l-4 border-[#12F6C8]">
      <h4 className="text-[#12F6C8] font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{content}</p>
    </div>
  )
}

function RevisionHistory({ revisions }: { revisions: { version: string; date: string; author: string; changes: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#12F6C8]/20">
            <th className="text-left py-3 px-4 text-[#12F6C8]">Version</th>
            <th className="text-left py-3 px-4 text-[#12F6C8]">Date</th>
            <th className="text-left py-3 px-4 text-[#12F6C8]">Author</th>
            <th className="text-left py-3 px-4 text-[#12F6C8]">Changes</th>
          </tr>
        </thead>
        <tbody>
          {revisions.map((rev, i) => (
            <tr key={i} className="border-b border-[#12F6C8]/10">
              <td className="py-3 px-4 text-white font-mono">{rev.version}</td>
              <td className="py-3 px-4 text-gray-400">{rev.date}</td>
              <td className="py-3 px-4 text-gray-400">{rev.author}</td>
              <td className="py-3 px-4 text-gray-400">{rev.changes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AddendumPage() {
  const [expandedEntries, setExpandedEntries] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('entries')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const toggleEntry = (id: string) => {
    setExpandedEntries(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const entries = [
    {
      id: 'ADD-001',
      title: 'Voice Clone Detection Enhancement',
      date: '2026-01-05',
      classification: 'SECRET',
      summary: 'Updated detection algorithms for latest voice synthesis techniques. Includes new spectral analysis methods and real-time verification protocols. Detection accuracy improved from 94% to 97.3%.'
    },
    {
      id: 'ADD-002',
      title: 'Synthetic Identity Pattern Update',
      date: '2026-01-03',
      classification: 'TOP SECRET',
      summary: 'New patterns identified in synthetic identity creation networks. Criminal organizations now using AI to generate more sophisticated fake identities that bypass traditional verification. Countermeasures deployed.'
    },
    {
      id: 'ADD-003',
      title: 'Critical Infrastructure Threat Vector',
      date: '2025-12-28',
      classification: 'TOP SECRET',
      summary: 'Identified new attack methodology targeting SCADA systems in water treatment facilities. Threat actors using AI to identify vulnerabilities and automate exploitation. Emergency patches recommended.'
    },
    {
      id: 'ADD-004',
      title: 'Social Engineering Campaign Analysis',
      date: '2025-12-20',
      classification: 'SECRET',
      summary: 'Detailed analysis of coordinated social engineering campaign targeting government employees. Campaign uses AI-generated personas and deepfake video calls. Training materials updated.'
    },
    {
      id: 'ADD-005',
      title: 'Financial Fraud Network Disruption',
      date: '2025-12-15',
      classification: 'CONFIDENTIAL',
      summary: 'Summary of joint operation that disrupted major financial fraud network. Network was using AI to generate fake investment opportunities and romance scams. 47 arrests made, $23M in assets seized.'
    },
  ]

  const revisions = [
    { version: '3.2.1', date: '2026-01-05', author: 'Dr. A. Marshall', changes: 'Added voice clone detection addendum' },
    { version: '3.2.0', date: '2026-01-03', author: 'Threat Analysis Team', changes: 'Updated synthetic identity patterns' },
    { version: '3.1.0', date: '2025-12-28', author: 'Infrastructure Security', changes: 'Added critical infrastructure threat vector' },
    { version: '3.0.0', date: '2025-12-15', author: 'Dr. A. Marshall', changes: 'Major revision - restructured threat architecture' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <section className="py-8 px-4 border-b border-[#12F6C8]/10">
        <div ref={headerRef} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#12F6C8]/20 to-[#0B85E5]/20 border border-[#12F6C8]/30 flex items-center justify-center">
              <span className="text-3xl">📎</span>
            </div>
            <div>
              <div className="text-[#12F6C8] text-sm font-mono mb-1">INTELLIGENCE DOSSIER // SUPPLEMENTAL</div>
              <h1 className="text-3xl font-bold text-white">THREAT ARCHITECTURE ADDENDUM</h1>
            </div>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Supplemental intelligence updates, technical notes, and revisions to the primary 
            Threat Architecture document. This addendum is updated continuously as new 
            intelligence becomes available.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-b border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1">
            {['entries', 'technical', 'revisions'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 text-sm font-mono transition-all ${
                  activeSection === section
                    ? 'text-[#12F6C8] border-b-2 border-[#12F6C8] bg-[#12F6C8]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {activeSection === 'entries' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Addendum Entries</h2>
                <span className="text-gray-500 text-sm">{entries.length} entries</span>
              </div>
              {entries.map(entry => (
                <AddendumEntry
                  key={entry.id}
                  {...entry}
                  expanded={expandedEntries.includes(entry.id)}
                  onToggle={() => toggleEntry(entry.id)}
                />
              ))}
            </div>
          )}

          {activeSection === 'technical' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Technical Notes</h2>
              
              <TechnicalNote
                title="Detection Algorithm Updates"
                content="GhostQuant AI detection models have been updated to version 4.2.1, incorporating new neural network architectures specifically designed to identify artifacts in AI-generated media. The update includes improved handling of compressed video formats and real-time audio analysis capabilities."
              />
              
              <TechnicalNote
                title="API Integration Changes"
                content="The threat intelligence API now supports WebSocket connections for real-time threat feeds. Existing REST endpoints remain unchanged. New authentication tokens required for WebSocket connections - contact your account manager for migration assistance."
              />
              
              <TechnicalNote
                title="Compliance Framework Updates"
                content="Updated mappings to NIST 800-53 Rev 5 controls and new CMMC 2.0 requirements. All G3TI products now include automated compliance reporting for FedRAMP Moderate baseline. Documentation available in the contractor portal."
              />
              
              <TechnicalNote
                title="Performance Optimizations"
                content="Reduced average detection latency from 75ms to 48ms through infrastructure upgrades and algorithm optimizations. Edge deployment options now available for organizations requiring sub-20ms response times."
              />
              
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 mt-8">
                <h3 className="text-white font-semibold mb-4">System Requirements Update</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Minimum API Version</div>
                    <div className="text-[#12F6C8] font-mono">v3.2.0</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">SDK Version</div>
                    <div className="text-[#12F6C8] font-mono">4.1.0+</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">TLS Requirement</div>
                    <div className="text-[#12F6C8] font-mono">1.3</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Authentication</div>
                    <div className="text-[#12F6C8] font-mono">OAuth 2.0 / mTLS</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'revisions' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Revision History</h2>
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <RevisionHistory revisions={revisions} />
              </div>
              
              <div className="mt-8 p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10">
                <h3 className="text-white font-semibold mb-2">Document Control</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Current Version</div>
                    <div className="text-[#12F6C8] font-mono">3.2.1</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Updated</div>
                    <div className="text-white">2026-01-05</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Next Review</div>
                    <div className="text-white">2026-02-05</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Owner</div>
                    <div className="text-white">Threat Analysis Team</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-[#12F6C8]/10">
            <div className="flex items-center justify-between">
              <Link href="/national-security-briefing.html" className="text-gray-400 hover:text-[#12F6C8] transition-colors">
                ← National Security Briefing
              </Link>
              <Link href="/threat-architecture.html" className="text-[#12F6C8] hover:underline">
                Back to Threat Architecture →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
