'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function PledgeStatement({ number, statement, explanation }: { number: number; statement: string; explanation: string }) {
  const [showExplanation, setShowExplanation] = useState(false)
  const statementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statementRef.current) {
      gsap.fromTo(statementRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: number * 0.1, ease: 'power2.out' }
      )
    }
  }, [number])

  return (
    <div 
      ref={statementRef}
      className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 hover:border-[#12F6C8]/40 transition-all cursor-pointer"
      onClick={() => setShowExplanation(!showExplanation)}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#12F6C8]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[#12F6C8] font-bold">{number}</span>
        </div>
        <div className="flex-1">
          <p className="text-white text-lg font-medium mb-2">{statement}</p>
          {showExplanation && (
            <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-[#12F6C8]/10">{explanation}</p>
          )}
        </div>
        <span className={`text-[#12F6C8] transition-transform ${showExplanation ? 'rotate-180' : ''}`}>▼</span>
      </div>
    </div>
  )
}

function ProtectionArea({ icon, title, description, measures }: { icon: string; title: string; description: string; measures: string[] }) {
  return (
    <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {measures.map((measure, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
            {measure}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SignatureBlock() {
  return (
    <div className="p-8 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/30 text-center">
      <div className="text-6xl mb-4">✍️</div>
      <h3 className="text-2xl font-bold text-white mb-2">Our Commitment</h3>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">
        This pledge represents our unwavering commitment to protecting human dignity, 
        safety, and rights in all our AI operations.
      </p>
      <div className="inline-block p-4 bg-[#050505] rounded-lg">
        <div className="text-[#12F6C8] font-script text-3xl italic mb-2">Dr. Aldric Marshall</div>
        <div className="text-gray-500 text-sm">Founder & CEO, Global 3 Technology & Intelligence</div>
        <div className="text-gray-600 text-xs mt-1">Palm Beach, FL</div>
      </div>
    </div>
  )
}

export default function HumanProtectionPledgePage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const pledgeStatements = [
    {
      statement: "We will never deploy AI systems that harm human life or dignity.",
      explanation: "Our AI systems are designed with human safety as the paramount concern. We implement multiple safeguards to prevent any potential harm to individuals or communities."
    },
    {
      statement: "We will maintain meaningful human oversight of all AI decisions.",
      explanation: "Critical decisions always involve human review. Our AI augments human judgment rather than replacing it, ensuring accountability and ethical consideration."
    },
    {
      statement: "We will be transparent about AI capabilities and limitations.",
      explanation: "We clearly communicate what our AI can and cannot do. Users are informed when they interact with AI systems and understand how decisions are made."
    },
    {
      statement: "We will protect individual privacy and data rights.",
      explanation: "Personal data is collected only when necessary and protected with the highest security standards. Individuals retain control over their information."
    },
    {
      statement: "We will actively work to eliminate bias and discrimination.",
      explanation: "Our systems undergo rigorous testing for fairness. We continuously monitor for and address any biases that may emerge in AI behavior."
    },
    {
      statement: "We will refuse to develop AI for autonomous weapons.",
      explanation: "We categorically reject the development of AI systems designed to harm humans without meaningful human control. This is a non-negotiable principle."
    },
    {
      statement: "We will support human workers affected by AI automation.",
      explanation: "We invest in retraining and transition programs for workers whose roles are impacted by AI. Technology should elevate humanity, not displace it."
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-[#12F6C8]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6">
            <span className="text-pink-400 text-sm tracking-wider">OUR SACRED COMMITMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">HUMAN</span>{' '}
            <span className="text-[#12F6C8] glow-text">PROTECTION</span>{' '}
            <span className="text-white">PLEDGE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            At G3TI, we believe that AI must serve humanity—not the other way around. 
            This pledge represents our binding commitment to protect human dignity, safety, 
            and rights in everything we build.
          </p>
        </div>
      </section>

      {/* Pledge Statements */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Pledge</h2>
          <div className="space-y-4">
            {pledgeStatements.map((pledge, i) => (
              <PledgeStatement key={i} number={i + 1} {...pledge} />
            ))}
          </div>
        </div>
      </section>

      {/* Protection Areas */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Protection Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProtectionArea
              icon="👶"
              title="Children"
              description="Special protections for minors in all AI interactions"
              measures={['Age verification', 'Content filtering', 'Parental controls', 'Data minimization']}
            />
            <ProtectionArea
              icon="👴"
              title="Elderly"
              description="Safeguards against exploitation of vulnerable seniors"
              measures={['Scam detection', 'Simplified interfaces', 'Family alerts', 'Financial monitoring']}
            />
            <ProtectionArea
              icon="🏥"
              title="Healthcare"
              description="Ethical AI in medical and health contexts"
              measures={['Clinical validation', 'Human oversight', 'Privacy protection', 'Bias testing']}
            />
            <ProtectionArea
              icon="⚖️"
              title="Justice"
              description="Fair and unbiased AI in legal contexts"
              measures={['Algorithmic audits', 'Explainability', 'Appeal rights', 'Human review']}
            />
            <ProtectionArea
              icon="💼"
              title="Employment"
              description="Protecting workers from AI-related harms"
              measures={['Bias-free hiring', 'Retraining support', 'Fair evaluation', 'Privacy rights']}
            />
            <ProtectionArea
              icon="🏠"
              title="Housing"
              description="Preventing discrimination in housing decisions"
              measures={['Fair lending', 'Equal access', 'Bias monitoring', 'Transparency']}
            />
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Accountability Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
              <h3 className="text-xl font-bold text-[#12F6C8] mb-4">Internal Oversight</h3>
              <ul className="space-y-3">
                {[
                  'Ethics review for all AI projects',
                  'Regular bias and fairness audits',
                  'Employee reporting channels',
                  'Executive accountability',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-[#12F6C8]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
              <h3 className="text-xl font-bold text-[#12F6C8] mb-4">External Accountability</h3>
              <ul className="space-y-3">
                {[
                  'Independent ethics board',
                  'Third-party audits',
                  'Public transparency reports',
                  'Stakeholder engagement',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-[#12F6C8]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signature */}
      <section className="py-16 px-4 bg-[#0D0D0F]">
        <div className="max-w-2xl mx-auto">
          <SignatureBlock />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Us in Protecting Humanity</h2>
          <p className="text-gray-400 mb-6">Partner with an organization that puts people first.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Contact Us
            </Link>
            <Link href="/ai-misuse-prohibition.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              AI Misuse Prohibition →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
