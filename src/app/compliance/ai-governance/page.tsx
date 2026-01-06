'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'

const GovernanceSphere = dynamic(() => import('@/components/3d/GovernanceSphere'), { ssr: false })

function PrincipleCard({ number, title, description, expanded, onToggle }: { number: string; title: string; description: string; expanded: boolean; onToggle: () => void }) {
  return (
    <div 
      className={`p-6 rounded-xl border transition-all cursor-pointer ${
        expanded ? 'bg-[#12F6C8]/5 border-[#12F6C8]/30' : 'bg-[#0D0D0F] border-[#12F6C8]/10 hover:border-[#12F6C8]/20'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#12F6C8]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[#12F6C8] font-bold text-xl">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className={`text-gray-400 transition-all ${expanded ? 'line-clamp-none' : 'line-clamp-2'}`}>{description}</p>
        </div>
        <span className={`text-[#12F6C8] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>
    </div>
  )
}

function GovernanceMetric({ label, value, status }: { label: string; value: string; status: 'compliant' | 'review' | 'pending' }) {
  const statusColors = {
    compliant: 'text-green-400',
    review: 'text-yellow-400',
    pending: 'text-gray-400',
  }

  return (
    <div className="p-4 bg-[#050505] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className={`text-xs ${statusColors[status]}`}>{status.toUpperCase()}</span>
      </div>
      <div className="text-2xl font-bold text-[#12F6C8]">{value}</div>
    </div>
  )
}

export default function AIGovernancePage() {
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const principles = [
    { number: '01', title: 'Transparency', description: 'All AI systems must be explainable and auditable. We maintain comprehensive documentation of AI decision-making processes, training data sources, and model architectures. Users have the right to understand how AI affects decisions that impact them.' },
    { number: '02', title: 'Accountability', description: 'Clear ownership and responsibility for AI systems at every level. We establish governance committees, designate AI ethics officers, and maintain audit trails for all AI-driven decisions. Regular reviews ensure continued alignment with organizational values.' },
    { number: '03', title: 'Fairness', description: 'AI systems must not discriminate or perpetuate bias. We implement rigorous testing for demographic parity, equal opportunity, and calibration across protected classes. Continuous monitoring detects and corrects emerging biases.' },
    { number: '04', title: 'Security', description: 'Robust protection against adversarial attacks and data breaches. Our AI systems incorporate defense-in-depth strategies, including input validation, model hardening, and secure deployment practices. Regular penetration testing validates security posture.' },
    { number: '05', title: 'Privacy', description: 'Respect for individual privacy rights in all AI operations. We implement privacy-by-design principles, data minimization, and purpose limitation. Differential privacy and federated learning protect sensitive information.' },
    { number: '06', title: 'Human Oversight', description: 'Meaningful human control over AI systems. Critical decisions require human review and approval. We maintain kill switches and override capabilities for all autonomous systems. AI augments human judgment rather than replacing it.' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
                <span className="text-[#12F6C8] text-sm tracking-wider">COMPLIANCE FRAMEWORK</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-white">AI</span>{' '}
                <span className="text-[#12F6C8] glow-text">GOVERNANCE</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Comprehensive framework for responsible AI development, deployment, and oversight. 
                Ensuring our autonomous intelligence systems operate ethically, transparently, and 
                in alignment with human values.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                  Request Assessment
                </Link>
                <Link href="/compliance/responsible-ai.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
                  Responsible AI →
                </Link>
              </div>
            </div>
            <div>
              <GovernanceSphere />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GovernanceMetric label="AI Systems Governed" value="47" status="compliant" />
            <GovernanceMetric label="Audit Completion" value="98%" status="compliant" />
            <GovernanceMetric label="Bias Tests Passed" value="156" status="compliant" />
            <GovernanceMetric label="Pending Reviews" value="3" status="review" />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Governance Principles</h2>
          <div className="space-y-4">
            {principles.map(principle => (
              <PrincipleCard
                key={principle.number}
                {...principle}
                expanded={expandedPrinciple === principle.number}
                onToggle={() => setExpandedPrinciple(expandedPrinciple === principle.number ? null : principle.number)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Governance Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Policy Layer', items: ['AI Ethics Policy', 'Data Governance Policy', 'Model Risk Management', 'Incident Response Plan'] },
              { title: 'Process Layer', items: ['AI Impact Assessment', 'Model Validation', 'Continuous Monitoring', 'Stakeholder Engagement'] },
              { title: 'Technology Layer', items: ['Explainability Tools', 'Bias Detection', 'Audit Logging', 'Access Controls'] },
            ].map((layer, i) => (
              <div key={i} className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-[#12F6C8] mb-4">{layer.title}</h3>
                <ul className="space-y-2">
                  {layer.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Build Trust Through Governance</h2>
          <p className="text-gray-400 mb-6">Partner with G3TI to implement robust AI governance frameworks.</p>
          <Link href="/contact.html" className="inline-block px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
