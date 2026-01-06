'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function CommitmentBadge({ icon, title, description }: { icon: string; title: string; description: string }) {
  const badgeRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [])

  return (
    <div ref={badgeRef} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 text-center hover:border-[#12F6C8]/40 transition-all group">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function EthicsTimeline() {
  const events = [
    { year: '2023', title: 'Ethics Board Established', desc: 'Independent AI ethics advisory board formed' },
    { year: '2024', title: 'Responsible AI Framework', desc: 'Comprehensive framework published and adopted' },
    { year: '2025', title: 'Third-Party Audit', desc: 'External validation of AI ethics practices' },
    { year: '2026', title: 'Industry Leadership', desc: 'Setting standards for responsible AI in security' },
  ]

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#12F6C8]/30" />
      {events.map((event, i) => (
        <div key={i} className={`flex items-center gap-8 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
            <div className="text-[#12F6C8] font-mono text-lg">{event.year}</div>
            <div className="text-white font-semibold">{event.title}</div>
            <div className="text-gray-500 text-sm">{event.desc}</div>
          </div>
          <div className="w-4 h-4 rounded-full bg-[#12F6C8] relative z-10" />
          <div className="flex-1" />
        </div>
      ))}
    </div>
  )
}

function PledgeSection({ title, pledges }: { title: string; pledges: string[] }) {
  return (
    <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/10">
      <h3 className="text-xl font-bold text-[#12F6C8] mb-4">{title}</h3>
      <ul className="space-y-3">
        {pledges.map((pledge, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#12F6C8] mt-1">✓</span>
            <span className="text-gray-300">{pledge}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResponsibleAIPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#12F6C8]/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">OUR COMMITMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">RESPONSIBLE</span>{' '}
            <span className="text-[#12F6C8] glow-text">AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            At G3TI, we believe that powerful AI must be developed and deployed responsibly. 
            Our commitment to ethical AI is not just policy—it's fundamental to who we are.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CommitmentBadge icon="🎯" title="Purpose-Driven" description="AI that serves humanity&apos;s best interests" />
            <CommitmentBadge icon="🔍" title="Transparent" description="Clear explanations of AI decisions" />
            <CommitmentBadge icon="⚖️" title="Fair" description="Unbiased systems that treat all equally" />
            <CommitmentBadge icon="🛡️" title="Safe" description="Robust safeguards against misuse" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <EthicsTimeline />
        </div>
      </section>

      {/* Pledges */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Responsible AI Pledges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PledgeSection
              title="Development Practices"
              pledges={[
                'Rigorous testing for bias and fairness before deployment',
                'Diverse teams involved in AI development',
                'Regular third-party audits of AI systems',
                'Continuous monitoring for emerging issues',
              ]}
            />
            <PledgeSection
              title="Deployment Standards"
              pledges={[
                'Human oversight for high-stakes decisions',
                'Clear documentation of AI capabilities and limitations',
                'Accessible channels for feedback and concerns',
                'Rapid response protocols for identified issues',
              ]}
            />
            <PledgeSection
              title="Data Practices"
              pledges={[
                'Minimal data collection principle',
                'Strong privacy protections',
                'Transparent data usage policies',
                'Secure data handling and storage',
              ]}
            />
            <PledgeSection
              title="Stakeholder Engagement"
              pledges={[
                'Regular dialogue with affected communities',
                'Public reporting on AI ethics metrics',
                'Collaboration with regulators and policymakers',
                'Support for AI ethics research and education',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Ethics Board */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Independent Ethics Board</h2>
          <p className="text-gray-400 mb-8">
            Our AI Ethics Board provides independent oversight and guidance on responsible AI practices. 
            Composed of external experts in ethics, law, technology, and civil rights, the board ensures 
            our AI development aligns with societal values and expectations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Ethics Expert', 'Legal Scholar', 'Technologist', 'Civil Rights Advocate'].map((role, i) => (
              <div key={i} className="p-4 bg-[#050505] rounded-lg">
                <div className="text-4xl mb-2">👤</div>
                <div className="text-[#12F6C8] text-sm">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Us in Building Responsible AI</h2>
          <p className="text-gray-400 mb-6">Learn how G3TI can help your organization implement responsible AI practices.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Contact Us
            </Link>
            <Link href="/compliance/data-governance.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Data Governance →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
