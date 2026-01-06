'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function FounderCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div ref={cardRef} className="p-8 bg-[#0D0D0F] rounded-2xl border border-[#12F6C8]/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#12F6C8]/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#12F6C8] to-[#0B85E5] flex items-center justify-center mb-6 mx-auto">
          <span className="text-5xl">👤</span>
        </div>
        <h3 className="text-2xl font-bold text-white text-center mb-2">Dr. Aldric Marshall</h3>
        <p className="text-[#12F6C8] text-center mb-4">Founder & CEO</p>
        <p className="text-gray-400 text-center">
          Visionary leader in autonomous intelligence systems with over two decades of experience 
          in national security, AI research, and enterprise technology. Dr. Marshall founded G3TI 
          with a mission to make technology intelligent—not just functional.
        </p>
      </div>
    </div>
  )
}

function TimelineEvent({ year, title, description, side }: { year: string; title: string; description: string; side: 'left' | 'right' }) {
  return (
    <div className={`flex items-center gap-8 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-1 ${side === 'right' ? 'text-left' : 'text-right'}`}>
        <div className="text-[#12F6C8] font-mono text-lg mb-1">{year}</div>
        <h4 className="text-white font-bold text-xl mb-2">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="w-4 h-4 rounded-full bg-[#12F6C8] relative z-10 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-[#12F6C8] animate-ping opacity-30" />
      </div>
      <div className="flex-1" />
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function StatBlock({ value, label }: { value: string; label: string }) {
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statRef.current) {
      gsap.fromTo(statRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div ref={statRef} className="text-center">
      <div className="text-4xl font-bold text-[#12F6C8] mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const timeline = [
    { year: '2019', title: 'Foundation', description: 'G3TI founded in Palm Beach, FL with a vision to revolutionize autonomous intelligence.' },
    { year: '2020', title: 'First Product', description: 'GhostQuant AI launched, bringing quantum-resistant encryption to market.' },
    { year: '2021', title: 'Federal Partnership', description: 'First federal agency partnership established for national security applications.' },
    { year: '2022', title: 'Enterprise Expansion', description: 'Expanded into enterprise market with comprehensive security suite.' },
    { year: '2023', title: 'Global Reach', description: 'International expansion with partners across 12 countries.' },
    { year: '2024', title: 'AI Evolution', description: 'Next-generation autonomous intelligence platform launched.' },
    { year: '2025', title: 'Industry Leadership', description: 'Recognized as leader in AI-driven security solutions.' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#12F6C8]/5 via-transparent to-[#0B85E5]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent rounded-full" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">ORIGIN DOSSIER</span>
          </div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">GLOBAL 3</span><br />
            <span className="text-[#12F6C8] glow-text">TECHNOLOGY & INTELLIGENCE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We don&apos;t make technology — we make technology intelligent.
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Founded with a singular mission: to create autonomous intelligence systems that protect, 
            predict, and prevail. G3TI stands at the intersection of cutting-edge AI research and 
            real-world security applications, serving governments, enterprises, and individuals 
            who demand the highest level of protection.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock value="847+" label="Threats Neutralized" />
            <StatBlock value="12,453" label="Systems Protected" />
            <StatBlock value="99.97%" label="Uptime" />
            <StatBlock value="24/7" label="Monitoring" />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership</h2>
          <FounderCard />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#050505] rounded-2xl border border-[#12F6C8]/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400">
                To develop and deploy autonomous intelligence systems that protect human life, 
                secure critical infrastructure, and enable organizations to operate with confidence 
                in an increasingly complex threat landscape. We believe that AI should serve 
                humanity&apos;s highest aspirations—safety, security, and prosperity.
              </p>
            </div>
            <div className="p-8 bg-[#050505] rounded-2xl border border-[#0B85E5]/20">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400">
                A world where intelligent systems work alongside humans to anticipate and neutralize 
                threats before they materialize. We envision a future where security is proactive, 
                not reactive—where AI doesn&apos;t just respond to attacks but prevents them entirely 
                through predictive intelligence and autonomous action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard icon="🛡️" title="Protection First" description="Every decision we make prioritizes the safety and security of those we serve." />
            <ValueCard icon="🔬" title="Innovation" description="We push the boundaries of what's possible in autonomous intelligence." />
            <ValueCard icon="⚖️" title="Ethics" description="We develop AI responsibly, with human values at the core." />
            <ValueCard icon="🤝" title="Trust" description="We earn trust through transparency, reliability, and results." />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#12F6C8]/30" />
            <div className="space-y-12">
              {timeline.map((event, i) => (
                <TimelineEvent key={i} {...event} side={i % 2 === 0 ? 'left' : 'right'} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏛️', title: 'Government Solutions', desc: 'National security, law enforcement, and federal agency support', link: '/government.html' },
              { icon: '🏢', title: 'Enterprise Security', desc: 'Comprehensive protection for businesses of all sizes', link: '/enterprise.html' },
              { icon: '🔧', title: 'Product Suite', desc: 'AI-powered security products for every need', link: '/products.html' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#12F6C8] transition-colors">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#12F6C8]/10 to-[#0B85E5]/10 border-y border-[#12F6C8]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Autonomous Intelligence?</h2>
          <p className="text-gray-400 mb-8">Join the organizations that trust G3TI to protect what matters most.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Contact Us
            </Link>
            <Link href="/products.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
