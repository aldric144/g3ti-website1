'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const AIConsciousnessCore = dynamic(
  () => import('@/components/3d/AIConsciousnessCore'),
  { ssr: false, loading: () => <div className="w-full h-[600px] bg-[#050505]" /> }
)

function AnimatedStat({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const numValue = parseInt(value.replace(/,/g, ''))
    let current = 0
    const duration = 2000
    const increment = numValue / (duration / 16)
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        current = numValue
        clearInterval(timer)
      }
      setDisplayValue(Math.floor(current).toLocaleString())
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center p-6 bg-[#0D0D0F]/50 rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all duration-300 group">
      <div className="text-3xl md:text-4xl font-bold text-[#12F6C8] glow-text mb-2 group-hover:scale-110 transition-transform">
        {displayValue}{suffix}
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-wider">{label}</div>
    </div>
  )
}

function ThreatGlyph({ type, color = '#12F6C8' }: { type: string; color?: string }) {
  const glyphs: Record<string, JSX.Element> = {
    identity: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="24" cy="16" r="8" />
        <path d="M12 40c0-8 5-12 12-12s12 4 12 12" />
        <path d="M32 16l8-8M32 8l8 8" strokeOpacity="0.5" />
      </svg>
    ),
    voice: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M24 8v32M16 14v20M8 20v8M32 14v20M40 20v8" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    automation: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="32" rx="4" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 18v-6M24 36v-6M18 24h-6M36 24h-6" strokeLinecap="round" />
      </svg>
    ),
    network: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" strokeDasharray="4 2" />
        <circle cx="24" cy="8" r="4" fill={color} fillOpacity="0.3" />
        <circle cx="40" cy="24" r="4" fill={color} fillOpacity="0.3" />
        <circle cx="24" cy="40" r="4" fill={color} fillOpacity="0.3" />
        <circle cx="8" cy="24" r="4" fill={color} fillOpacity="0.3" />
      </svg>
    ),
    surveillance: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="3" fill={color} />
        <path d="M8 24c0-8 7-16 16-16s16 8 16 16" />
        <path d="M4 24c0-10 9-20 20-20s20 10 20 20" strokeOpacity="0.3" />
      </svg>
    ),
    threat: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M24 8L8 40h32L24 8z" />
        <path d="M24 20v10" strokeLinecap="round" />
        <circle cx="24" cy="34" r="2" fill={color} />
      </svg>
    ),
  }
  return <div className="w-8 h-8">{glyphs[type] || glyphs.threat}</div>
}

function ThreatCard({ title, description, glyphType, classification }: { title: string; description: string; glyphType: string; classification: string }) {
  return (
    <div className="p-6 bg-[#0D0D0F]/80 rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-[#12F6C8]/30 group-hover:border-[#12F6C8]/60 transition-colors" />
      <div className="absolute top-3 right-4 text-[8px] font-mono text-red-400/60 tracking-wider">{classification}</div>
      <div className="mb-4">
        <ThreatGlyph type={glyphType} color="#EF4444" />
      </div>
      <h3 className="text-[#12F6C8] font-semibold text-lg mb-2 group-hover:glow-text transition-all tracking-wide">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out', delay: 0.5 }
      )
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 z-0">
          <AIConsciousnessCore />
        </div>
        <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">DIGITAL INTELLIGENCE ENVIRONMENT v7.2</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">GLOBAL 3</span><br />
            <span className="text-[#12F6C8] glow-text">TECHNOLOGY & INTELLIGENCE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Autonomous Protective Intelligence for the AI Threat Era
          </p>
          <p className="text-[#12F6C8]/80 italic text-lg mb-8">
            &quot;We don&apos;t make technology — we make technology intelligent.&quot;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all duration-300 transform hover:scale-105">
              Request Intelligence Briefing
            </Link>
            <Link href="/dossiers/threat-architecture.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] font-semibold rounded-lg hover:bg-[#12F6C8]/10 transition-all duration-300">
              View Threat Architecture
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#12F6C8]/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[#12F6C8] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#050505] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12F6C8]/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              THE NEW CLASS OF <span className="text-[#12F6C8]">INTELLIGENCE</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real-time threat monitoring across global attack surfaces</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatedStat value="12500" label="Lost to Scams ($M)" suffix="" />
            <AnimatedStat value="400" label="Deepfake Increase" suffix="%" />
            <AnimatedStat value="3400" label="Elder Fraud ($M)" suffix="" />
            <AnimatedStat value="82" label="Child Targeting Rise" suffix="%" />
            <AnimatedStat value="500" label="Digital DV Increase" suffix="%" />
            <AnimatedStat value="847" label="Deepfakes Today" suffix="" />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <span className="text-red-400 text-sm tracking-wider">ACTIVE THREAT BRIEFING</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              EMERGING <span className="text-[#12F6C8]">THREAT VECTORS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ThreatCard glyphType="identity" classification="CRITICAL" title="Synthetic Identity Fraud" description="AI-generated identities combining real and fabricated data to bypass traditional verification systems." />
            <ThreatCard glyphType="voice" classification="HIGH" title="Deepfake Voice Attacks" description="Voice cloning technology enabling real-time impersonation for financial fraud and social engineering." />
            <ThreatCard glyphType="automation" classification="CRITICAL" title="Automated Social Engineering" description="AI-powered manipulation campaigns targeting individuals at scale with personalized deception." />
            <ThreatCard glyphType="network" classification="HIGH" title="Cross-Platform Fraud Networks" description="Coordinated criminal operations spanning multiple platforms and jurisdictions." />
            <ThreatCard glyphType="surveillance" classification="CRITICAL" title="AI-Enabled Trafficking" description="Criminal networks leveraging AI to evade detection and recruit victims." />
            <ThreatCard glyphType="threat" classification="HIGH" title="Digital Domestic Violence" description="Technology-facilitated abuse including stalking, harassment, and financial control." />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#12F6C8]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B85E5]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">THE G3TI <span className="text-[#12F6C8]">DIFFERENCE</span></h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We build patentable protective-intelligence ecosystems designed to detect deception patterns, predict emerging threats, neutralize scams and fraud, protect identities & families, strengthen law enforcement, and support national security.
              </p>
              <div className="space-y-4">
                {['AI/ML Predictive Intelligence', 'Behavioral Deception Analysis', 'Digital Forensics', 'OSINT Threat Pipelines', 'Identity-Integrity Models', 'Government-Grade Security'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#12F6C8]" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#12F6C8]/10 to-[#0B85E5]/10 border border-[#12F6C8]/20 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#12F6C8]/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#12F6C8]/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#12F6C8]/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#12F6C8]/40" />
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4">
                    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#12F6C8" strokeWidth="1.5">
                      <path d="M32 6L8 16v16c0 14 10 22 24 28 14-6 24-14 24-28V16L32 6z" />
                      <circle cx="32" cy="32" r="8" fill="#12F6C8" fillOpacity="0.2" />
                      <path d="M28 32l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#12F6C8] mb-2 tracking-wide">VETERAN-LED</h3>
                  <h4 className="text-xl text-white mb-4 font-mono tracking-wider">MISSION-DRIVEN</h4>
                  <p className="text-gray-400 text-sm">Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, and global advocate for human protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We protect what the world isn&apos;t prepared for.</h2>
          <p className="text-xl text-[#12F6C8] italic mb-8">Join the future of intelligence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all duration-300">Get Started</Link>
            <Link href="/about.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] font-semibold rounded-lg hover:bg-[#12F6C8]/10 transition-all duration-300">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
