'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ClassifiedHeader() {
  return (
    <div className="border-b-2 border-red-500/50 pb-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <span className="text-red-500 font-bold text-xs">TOP<br/>SECRET</span>
          </div>
          <div>
            <div className="text-red-400 text-xs tracking-widest mb-1">INTELLIGENCE DOSSIER // CLASSIFIED</div>
            <h1 className="text-3xl font-bold text-white">THREAT ARCHITECTURE</h1>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-xs">DOCUMENT ID</div>
          <div className="text-[#12F6C8] font-mono">G3TI-TA-2026-001</div>
        </div>
      </div>
    </div>
  )
}

function RedactedText({ text, revealed }: { text: string; revealed: boolean }) {
  return (
    <span className={`transition-all duration-500 ${revealed ? 'bg-transparent' : 'bg-gray-700 text-transparent select-none'}`}>
      {text}
    </span>
  )
}

function DossierSection({ title, classification, children, delay = 0 }: { title: string; classification: string; children: React.ReactNode; delay?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay, ease: 'power2.out' }
      )
    }
  }, [delay])

  const classColors: Record<string, string> = {
    'TOP SECRET': 'border-red-500/30 bg-red-500/5',
    'SECRET': 'border-orange-500/30 bg-orange-500/5',
    'CONFIDENTIAL': 'border-yellow-500/30 bg-yellow-500/5',
    'UNCLASSIFIED': 'border-green-500/30 bg-green-500/5',
  }

  return (
    <div ref={sectionRef} className={`p-6 rounded-lg border ${classColors[classification] || classColors['UNCLASSIFIED']} mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span className={`text-xs px-2 py-1 rounded font-mono ${
          classification === 'TOP SECRET' ? 'bg-red-500/20 text-red-400' :
          classification === 'SECRET' ? 'bg-orange-500/20 text-orange-400' :
          classification === 'CONFIDENTIAL' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {classification}
        </span>
      </div>
      {children}
    </div>
  )
}

function ThreatVector({ name, severity, description, indicators }: { name: string; severity: number; description: string; indicators: string[] }) {
  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[#12F6C8] font-semibold">{name}</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`w-2 h-4 rounded-sm ${i <= severity ? 'bg-red-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {indicators.map((ind, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-[#12F6C8]/10 text-[#12F6C8] rounded">{ind}</span>
        ))}
      </div>
    </div>
  )
}

function TimelineEvent({ date, title, description }: { date: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[#12F6C8]" />
        <div className="w-px h-full bg-[#12F6C8]/30" />
      </div>
      <div className="pb-6">
        <div className="text-[#12F6C8] text-sm font-mono mb-1">{date}</div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default function ThreatArchitecturePage() {
  const [clearanceGranted, setClearanceGranted] = useState(false)
  const [revealLevel, setRevealLevel] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setClearanceGranted(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (clearanceGranted) {
      const timer = setInterval(() => {
        setRevealLevel(prev => Math.min(prev + 1, 5))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [clearanceGranted])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Clearance Animation */}
      {!clearanceGranted && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4 animate-pulse">🔒</div>
            <div className="text-[#12F6C8] font-mono text-lg mb-2">VERIFYING CLEARANCE...</div>
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-[#12F6C8] animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} className={`transition-opacity duration-1000 ${clearanceGranted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <section className="py-8 px-4 border-b border-red-500/20">
          <div className="max-w-5xl mx-auto">
            <ClassifiedHeader />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <DossierSection title="EXECUTIVE SUMMARY" classification="TOP SECRET" delay={0.2}>
              <p className="text-gray-300 leading-relaxed mb-4">
                This document provides a comprehensive analysis of the current threat landscape facing 
                <RedactedText text=" critical infrastructure and national security assets" revealed={revealLevel >= 1} />. 
                The intelligence contained herein has been compiled from multiple sources including 
                <RedactedText text=" SIGINT, HUMINT, and OSINT operations" revealed={revealLevel >= 2} />.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Key findings indicate a <RedactedText text="significant increase in AI-powered attack vectors" revealed={revealLevel >= 3} /> 
                targeting both government and private sector entities. Immediate action is recommended.
              </p>
            </DossierSection>

            <DossierSection title="PRIMARY THREAT VECTORS" classification="SECRET" delay={0.4}>
              <ThreatVector
                name="Synthetic Identity Operations"
                severity={5}
                description="AI-generated identities used for fraud, infiltration, and social engineering at scale."
                indicators={['Deepfake media', 'Fabricated credentials', 'Coordinated campaigns']}
              />
              <ThreatVector
                name="Voice Clone Attacks"
                severity={4}
                description="Real-time voice synthesis enabling impersonation of trusted individuals."
                indicators={['Financial fraud', 'Social engineering', 'Authorization bypass']}
              />
              <ThreatVector
                name="Automated Disinformation"
                severity={4}
                description="AI-powered propaganda and influence operations targeting public opinion."
                indicators={['Bot networks', 'Fake news generation', 'Social media manipulation']}
              />
              <ThreatVector
                name="Critical Infrastructure Targeting"
                severity={5}
                description="Coordinated attacks on power, water, and communications infrastructure."
                indicators={['SCADA exploits', 'Supply chain compromise', 'Insider threats']}
              />
            </DossierSection>

            <DossierSection title="THREAT ACTOR PROFILES" classification="TOP SECRET" delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'APT-PHANTOM', origin: 'State Actor', capability: 'Advanced', focus: 'Critical Infrastructure' },
                  { name: 'DARKNET SYNDICATE', origin: 'Criminal', capability: 'High', focus: 'Financial Fraud' },
                  { name: 'GHOST COLLECTIVE', origin: 'Hacktivist', capability: 'Moderate', focus: 'Data Exfiltration' },
                  { name: 'SHADOW BROKER', origin: 'Unknown', capability: 'Advanced', focus: 'Zero-Day Exploits' },
                ].map((actor, i) => (
                  <div key={i} className="p-4 bg-[#050505] rounded-lg border border-red-500/20">
                    <div className="text-red-400 font-mono font-bold mb-2">{actor.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Origin:</span> <span className="text-gray-300">{actor.origin}</span></div>
                      <div><span className="text-gray-500">Capability:</span> <span className="text-gray-300">{actor.capability}</span></div>
                      <div className="col-span-2"><span className="text-gray-500">Focus:</span> <span className="text-gray-300">{actor.focus}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </DossierSection>

            <DossierSection title="INCIDENT TIMELINE" classification="SECRET" delay={0.8}>
              <TimelineEvent date="2026-01-15" title="Operation PHANTOM STRIKE" description="Coordinated deepfake campaign targeting financial institutions detected and neutralized." />
              <TimelineEvent date="2025-12-03" title="Infrastructure Alert" description="Attempted breach of power grid control systems in northeastern sector." />
              <TimelineEvent date="2025-11-18" title="Identity Fraud Network" description="Dismantled synthetic identity operation affecting 50,000+ victims." />
              <TimelineEvent date="2025-10-22" title="Voice Clone Incident" description="High-profile executive impersonation attempt prevented by G3TI systems." />
            </DossierSection>

            <DossierSection title="RECOMMENDATIONS" classification="CONFIDENTIAL" delay={1.0}>
              <div className="space-y-4">
                {[
                  'Deploy GhostQuant AI for real-time deepfake detection across all communication channels',
                  'Implement zero-trust architecture for all critical infrastructure access',
                  'Establish 24/7 threat monitoring with HomelandWatch7 integration',
                  'Conduct regular red team exercises simulating AI-powered attacks',
                  'Enhance inter-agency intelligence sharing protocols',
                ].map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#050505] rounded-lg">
                    <span className="text-[#12F6C8] font-bold">{i + 1}.</span>
                    <span className="text-gray-300">{rec}</span>
                  </div>
                ))}
              </div>
            </DossierSection>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  <span className="text-red-400">CLASSIFIED</span> // Handle via secure channels only
                </div>
                <div className="flex gap-4">
                  <Link href="/contractor-readiness.html" className="text-[#12F6C8] hover:underline">Next: Contractor Readiness →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
