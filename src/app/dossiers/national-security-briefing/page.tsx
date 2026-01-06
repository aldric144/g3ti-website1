'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function BriefingSlide({ number, title, children, active }: { number: number; title: string; children: React.ReactNode; active: boolean }) {
  const slideRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (slideRef.current && active) {
      gsap.fromTo(slideRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [active])

  if (!active) return null

  return (
    <div ref={slideRef} className="p-8 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 min-h-[500px]">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#12F6C8]/10">
        <div className="w-12 h-12 rounded-lg bg-[#12F6C8]/10 flex items-center justify-center">
          <span className="text-[#12F6C8] font-bold text-xl">{number}</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function StatCard({ value, label, trend }: { value: string; label: string; trend?: 'up' | 'down' }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-3xl font-bold text-[#12F6C8]">{value}</span>
        {trend && (
          <span className={trend === 'up' ? 'text-red-400' : 'text-green-400'}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  )
}

function ThreatLevel({ level, description }: { level: 'SEVERE' | 'HIGH' | 'ELEVATED' | 'GUARDED' | 'LOW'; description: string }) {
  const colors = {
    SEVERE: 'bg-red-500 text-red-500',
    HIGH: 'bg-orange-500 text-orange-500',
    ELEVATED: 'bg-yellow-500 text-yellow-500',
    GUARDED: 'bg-blue-500 text-blue-500',
    LOW: 'bg-green-500 text-green-500',
  }

  return (
    <div className="p-4 bg-[#050505] rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-4 h-4 rounded-full ${colors[level].split(' ')[0]}`} />
        <span className={`font-bold ${colors[level].split(' ')[1]}`}>{level}</span>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

export default function NationalSecurityBriefingPage() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = 6
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides))
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <section className="py-8 px-4 border-b border-red-500/20">
        <div ref={headerRef} className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span className="text-3xl">🔐</span>
              </div>
              <div>
                <div className="text-red-400 text-sm font-mono mb-1">CLASSIFIED BRIEFING // EYES ONLY</div>
                <h1 className="text-3xl font-bold text-white">NATIONAL SECURITY BRIEFING</h1>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-xs">BRIEFING DATE</div>
              <div className="text-[#12F6C8] font-mono">2026-01-06</div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide Navigation */}
      <section className="py-4 px-4 bg-[#0D0D0F] border-b border-[#12F6C8]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i + 1)}
                  className={`w-8 h-8 rounded-lg font-mono text-sm transition-all ${
                    currentSlide === i + 1
                      ? 'bg-[#12F6C8] text-black'
                      : 'bg-[#050505] text-gray-500 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 1}
                className="px-4 py-2 bg-[#050505] text-gray-400 rounded-lg disabled:opacity-50 hover:text-white transition-all"
              >
                ← Previous
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides}
                className="px-4 py-2 bg-[#12F6C8] text-black rounded-lg disabled:opacity-50 hover:bg-[#12F6C8]/80 transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Slides */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <BriefingSlide number={1} title="Executive Overview" active={currentSlide === 1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-6">
                  This briefing provides a comprehensive assessment of the current national security 
                  threat landscape, with particular focus on AI-enabled threats and the protective 
                  intelligence capabilities required to counter them.
                </p>
                <div className="p-4 bg-[#050505] rounded-lg border-l-4 border-[#12F6C8]">
                  <h3 className="text-[#12F6C8] font-semibold mb-2">Key Takeaway</h3>
                  <p className="text-gray-400 text-sm">
                    AI-powered threats have increased 400% in the past 12 months, requiring 
                    immediate deployment of autonomous protective intelligence systems.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value="400%" label="AI Threat Increase" trend="up" />
                <StatCard value="$12.5B" label="Fraud Losses (2025)" trend="up" />
                <StatCard value="847" label="Daily Deepfake Incidents" trend="up" />
                <StatCard value="99.7%" label="G3TI Detection Rate" />
              </div>
            </div>
          </BriefingSlide>

          <BriefingSlide number={2} title="Current Threat Assessment" active={currentSlide === 2}>
            <div className="space-y-4">
              <ThreatLevel level="ELEVATED" description="Current national threat level based on multi-source intelligence analysis" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-[#050505] rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Primary Threat Vectors</h3>
                  <ul className="space-y-2">
                    {[
                      'Synthetic identity fraud operations',
                      'Deepfake impersonation campaigns',
                      'AI-powered social engineering',
                      'Critical infrastructure targeting',
                      'Election security threats',
                    ].map((threat, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {threat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-[#050505] rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Threat Actor Categories</h3>
                  <ul className="space-y-2">
                    {[
                      { name: 'Nation-State Actors', level: 'HIGH' },
                      { name: 'Organized Crime', level: 'HIGH' },
                      { name: 'Hacktivists', level: 'MODERATE' },
                      { name: 'Insider Threats', level: 'ELEVATED' },
                      { name: 'Lone Actors', level: 'MODERATE' },
                    ].map((actor, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{actor.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          actor.level === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                          actor.level === 'ELEVATED' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>{actor.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BriefingSlide>

          <BriefingSlide number={3} title="AI-Enabled Threat Evolution" active={currentSlide === 3}>
            <div className="space-y-6">
              <p className="text-gray-300">
                The rapid advancement of AI capabilities has fundamentally transformed the threat landscape. 
                Adversaries now leverage AI for automated attacks, deepfake generation, and sophisticated 
                social engineering at unprecedented scale.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { year: '2024', title: 'Emergence', desc: 'First widespread deepfake fraud cases', icon: '🌱' },
                  { year: '2025', title: 'Escalation', desc: 'AI-powered attacks become mainstream', icon: '📈' },
                  { year: '2026', title: 'Critical', desc: 'Autonomous attack systems deployed', icon: '⚠️' },
                ].map((phase, i) => (
                  <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                    <div className="text-3xl mb-2">{phase.icon}</div>
                    <div className="text-[#12F6C8] font-mono text-sm">{phase.year}</div>
                    <div className="text-white font-semibold">{phase.title}</div>
                    <div className="text-gray-500 text-sm">{phase.desc}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-2">Critical Warning</h3>
                <p className="text-gray-400 text-sm">
                  Without immediate deployment of AI-powered defensive systems, we project a 
                  300% increase in successful attacks within the next 18 months.
                </p>
              </div>
            </div>
          </BriefingSlide>

          <BriefingSlide number={4} title="G3TI Protective Intelligence" active={currentSlide === 4}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Recommended Deployments</h3>
                <div className="space-y-3">
                  {[
                    { name: 'GhostQuant AI', desc: 'Deepfake detection across all channels', priority: 'CRITICAL' },
                    { name: 'HomelandWatch7', desc: 'National security threat monitoring', priority: 'CRITICAL' },
                    { name: 'ID SHIELD', desc: 'Identity protection infrastructure', priority: 'HIGH' },
                    { name: 'ScamFirewall360', desc: 'Fraud prevention systems', priority: 'HIGH' },
                  ].map((product, i) => (
                    <div key={i} className="p-3 bg-[#050505] rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-[#12F6C8] font-semibold">{product.name}</div>
                        <div className="text-gray-500 text-sm">{product.desc}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        product.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>{product.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Capability Matrix</h3>
                <div className="space-y-3">
                  {[
                    { capability: 'Deepfake Detection', coverage: 99 },
                    { capability: 'Voice Clone Analysis', coverage: 97 },
                    { capability: 'Synthetic ID Detection', coverage: 98 },
                    { capability: 'Real-Time Response', coverage: 95 },
                    { capability: 'Predictive Analytics', coverage: 92 },
                  ].map((cap, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{cap.capability}</span>
                        <span className="text-[#12F6C8]">{cap.coverage}%</span>
                      </div>
                      <div className="h-2 bg-[#050505] rounded-full overflow-hidden">
                        <div className="h-full bg-[#12F6C8] rounded-full" style={{ width: `${cap.coverage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BriefingSlide>

          <BriefingSlide number={5} title="Implementation Roadmap" active={currentSlide === 5}>
            <div className="space-y-4">
              {[
                { phase: 'Phase 1 (Q1 2026)', title: 'Critical Infrastructure Protection', items: ['Deploy GhostQuant AI to federal agencies', 'Establish threat monitoring network', 'Begin personnel training'] },
                { phase: 'Phase 2 (Q2 2026)', title: 'Expanded Coverage', items: ['State and local government integration', 'Critical infrastructure sectors', 'Financial institution partnerships'] },
                { phase: 'Phase 3 (Q3-Q4 2026)', title: 'Full Operational Capability', items: ['Complete national coverage', 'International intelligence sharing', 'Continuous improvement cycle'] },
              ].map((phase, i) => (
                <div key={i} className="p-4 bg-[#050505] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#12F6C8]/20 flex items-center justify-center text-[#12F6C8] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-[#12F6C8] text-sm font-mono">{phase.phase}</div>
                      <div className="text-white font-semibold">{phase.title}</div>
                    </div>
                  </div>
                  <ul className="ml-11 space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BriefingSlide>

          <BriefingSlide number={6} title="Recommendations & Next Steps" active={currentSlide === 6}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Immediate Actions Required</h3>
                <div className="space-y-3">
                  {[
                    'Authorize emergency deployment of GhostQuant AI',
                    'Establish inter-agency coordination protocols',
                    'Allocate funding for Phase 1 implementation',
                    'Begin contractor readiness assessments',
                    'Schedule follow-up briefing in 30 days',
                  ].map((action, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#050505] rounded-lg">
                      <span className="text-[#12F6C8] font-bold">{i + 1}.</span>
                      <span className="text-gray-300">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Points of Contact</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-[#12F6C8] font-semibold">G3TI Government Relations</div>
                    <div className="text-gray-400 text-sm">gov@g3ti.com</div>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-[#12F6C8] font-semibold">Technical Implementation</div>
                    <div className="text-gray-400 text-sm">implementation@g3ti.com</div>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-[#12F6C8] font-semibold">24/7 Threat Hotline</div>
                    <div className="text-gray-400 text-sm">1-800-G3TI-THREAT</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-lg text-center">
              <p className="text-[#12F6C8] font-semibold">END OF BRIEFING</p>
              <p className="text-gray-400 text-sm">This document is classified. Handle accordingly.</p>
            </div>
          </BriefingSlide>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-[#12F6C8]/10">
            <div className="flex items-center justify-between">
              <Link href="/dossiers/contractor-readiness.html" className="text-gray-400 hover:text-[#12F6C8] transition-colors">
                ← Contractor Readiness
              </Link>
              <Link href="/dossiers/addendum.html" className="text-[#12F6C8] hover:underline">
                Threat Architecture Addendum →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
