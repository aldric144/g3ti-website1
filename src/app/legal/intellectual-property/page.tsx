'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function TrademarkItem({ name, type, status }: { name: string; type: string; status: 'registered' | 'pending' | 'common-law' }) {
  const statusStyles = {
    registered: 'bg-green-500/10 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'common-law': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  }

  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">{name}</span>
        <span className={`text-xs px-2 py-1 rounded border ${statusStyles[status]}`}>
          {status === 'common-law' ? 'COMMON LAW' : status.toUpperCase()}
        </span>
      </div>
      <span className="text-gray-500 text-sm">{type}</span>
    </div>
  )
}

function PatentCard({ title, number, status, description }: { title: string; number: string; status: 'granted' | 'pending'; description: string }) {
  return (
    <div className="p-5 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${
          status === 'granted' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
        }`}>{status.toUpperCase()}</span>
      </div>
      <p className="text-[#12F6C8] font-mono text-sm mb-2">{number}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}

function LicenseType({ icon, title, description, terms }: { icon: string; title: string; description: string; terms: string[] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div 
      className="p-5 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
          {expanded && (
            <ul className="mt-4 pt-4 border-t border-[#12F6C8]/10 space-y-2">
              {terms.map((term, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-[#12F6C8]">•</span>
                  {term}
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

export default function IntellectualPropertyPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const trademarks = [
    { name: 'Global 3 Technology & Intelligence™', type: 'Word Mark', status: 'registered' as const },
    { name: 'G3TI™', type: 'Word Mark', status: 'registered' as const },
    { name: 'GhostQuant AI™', type: 'Product Name', status: 'registered' as const },
    { name: 'ID SHIELD™', type: 'Product Name', status: 'pending' as const },
    { name: 'ScamFirewall360™', type: 'Product Name', status: 'pending' as const },
    { name: 'HeartGuard AI™', type: 'Product Name', status: 'common-law' as const },
    { name: 'HomelandWatch7™', type: 'Product Name', status: 'common-law' as const },
    { name: 'Digital Intelligence Environment™', type: 'Service Mark', status: 'pending' as const },
  ]

  const patents = [
    { title: 'Quantum-Resistant Encryption System', number: 'US 11,XXX,XXX', status: 'granted' as const, description: 'Novel approach to post-quantum cryptographic key exchange' },
    { title: 'AI-Driven Threat Detection Method', number: 'US 11,XXX,XXX', status: 'granted' as const, description: 'Machine learning system for real-time threat identification' },
    { title: 'Autonomous Security Response System', number: 'App. 17/XXX,XXX', status: 'pending' as const, description: 'Automated incident response and remediation platform' },
    { title: 'Neural Network Fraud Detection', number: 'App. 17/XXX,XXX', status: 'pending' as const, description: 'Deep learning model for financial fraud prevention' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-sm tracking-wider">LEGAL PROTECTION</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">INTELLECTUAL</span>{' '}
            <span className="text-[#12F6C8] glow-text">PROPERTY</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            G3TI's intellectual property represents years of innovation in autonomous intelligence 
            and security technology. This notice outlines our IP rights and usage guidelines.
          </p>
        </div>
      </section>

      {/* Trademarks */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Trademarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trademarks.map((tm, i) => (
              <TrademarkItem key={i} {...tm} />
            ))}
          </div>
          <div className="mt-8 p-4 bg-[#0D0D0F] rounded-lg text-center">
            <p className="text-gray-500 text-sm">
              The ™ symbol indicates trademarks of Global 3 Technology & Intelligence™. 
              ® indicates registered trademarks in the United States and/or other countries.
            </p>
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Patents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patents.map((patent, i) => (
              <PatentCard key={i} {...patent} />
            ))}
          </div>
          <div className="mt-8 p-4 bg-[#050505] rounded-lg text-center">
            <p className="text-gray-500 text-sm">
              Patent numbers partially redacted for security purposes. 
              Full patent information available upon request for licensing inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Copyrights */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Copyrights</h2>
          <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
            <p className="text-gray-400 mb-4">
              All content on G3TI websites, applications, and services is protected by copyright law. 
              This includes but is not limited to:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {['Software Code', 'Documentation', 'User Interfaces', 'Graphics & Icons', 'Training Materials', 'Marketing Content', 'API Documentation', 'Research Papers'].map((item, i) => (
                <div key={i} className="p-3 bg-[#050505] rounded-lg text-center">
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#050505] rounded-lg">
              <p className="text-[#12F6C8] font-mono text-center">
                © 2019-2026 Global 3 Technology & Intelligence™. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Licensing Options</h2>
          <div className="space-y-4">
            <LicenseType
              icon="🏢"
              title="Enterprise License"
              description="Full commercial use rights for organizations"
              terms={[
                'Unlimited internal deployment',
                'Custom integration support',
                'Priority technical assistance',
                'Annual renewal required',
              ]}
            />
            <LicenseType
              icon="🏛️"
              title="Government License"
              description="Special terms for federal, state, and local agencies"
              terms={[
                'GSA Schedule pricing available',
                'FedRAMP-aligned deployment',
                'Classified environment support',
                'Multi-year agreements available',
              ]}
            />
            <LicenseType
              icon="🔬"
              title="Research License"
              description="Academic and research institution access"
              terms={[
                'Non-commercial use only',
                'Publication rights with attribution',
                'Limited API access',
                'Annual renewal required',
              ]}
            />
            <LicenseType
              icon="🤝"
              title="Partner License"
              description="Integration and reseller partnerships"
              terms={[
                'White-label options available',
                'Revenue sharing models',
                'Co-marketing opportunities',
                'Technical integration support',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
              <h3 className="text-green-400 font-bold mb-4">Permitted Uses</h3>
              <ul className="space-y-2">
                {[
                  'Reference in editorial content with attribution',
                  'Use in academic research with citation',
                  'Display of logos in partner directories',
                  'Screenshots for review purposes',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="text-green-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h3 className="text-red-400 font-bold mb-4">Prohibited Uses</h3>
              <ul className="space-y-2">
                {[
                  'Modification of trademarks or logos',
                  'Use implying endorsement without permission',
                  'Incorporation into competing products',
                  'Reverse engineering of software',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
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
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Licensing Inquiries</h2>
          <p className="text-gray-400 mb-6">
            For licensing requests, trademark permissions, or IP-related questions, 
            please contact our legal team.
          </p>
          <div className="p-4 bg-[#050505] rounded-lg inline-block">
            <p className="text-[#12F6C8] font-mono">ip@g3ti.com</p>
            <p className="text-gray-500 text-sm mt-2">Global 3 Technology & Intelligence™ Legal Department</p>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link href="/legal/privacy-policy.html" className="text-[#12F6C8] hover:underline">Privacy Policy</Link>
          <Link href="/legal/terms-of-use.html" className="text-[#12F6C8] hover:underline">Terms of Use</Link>
          <Link href="/legal/security-notice.html" className="text-[#12F6C8] hover:underline">Security Notice</Link>
        </div>
      </section>
    </div>
  )
}
