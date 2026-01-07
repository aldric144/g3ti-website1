'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

// Monitoring Status Component with pulsing glow
function MonitoringStatus() {
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-[#12F6C8] animate-pulse" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#12F6C8] animate-ping opacity-75" />
      </div>
      <span className="text-[#12F6C8] text-xs font-mono tracking-wider monitoring-glow">
        MONITORING ACTIVE
      </span>
    </div>
  )
}

// Threat Tile Component for National Threat Grid
function ThreatTile({ title, delay = 0 }: { title: string; delay?: number }) {
  const tileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tileRef.current) {
      gsap.fromTo(tileRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay, ease: 'power2.out' }
      )
    }
  }, [delay])

  return (
    <div 
      ref={tileRef}
      className="relative p-6 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg overflow-hidden group hover:border-[#12F6C8]/50 transition-all duration-300"
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#12F6C8]/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#12F6C8]/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#12F6C8]/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#12F6C8]/40" />
      
      {/* Scanner sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12F6C8]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(18,246,200,0.03) 2px, rgba(18,246,200,0.03) 4px)'
        }} />
      </div>

      <h3 className="text-white font-semibold text-sm leading-tight mb-1">{title}</h3>
      <MonitoringStatus />
    </div>
  )
}

// Intelligence Brief Tile Component
function BriefTile({ 
  title, 
  status, 
  description,
  delay = 0 
}: { 
  title: string
  status: 'loaded' | 'click' 
  description?: string
  delay?: number
}) {
  const tileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tileRef.current) {
      gsap.fromTo(tileRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power2.out' }
      )
    }
  }, [delay])

  return (
    <div 
      ref={tileRef}
      className="relative p-5 bg-[#0A0A0C] border border-[#12F6C8]/15 rounded-lg cursor-pointer group hover:border-[#12F6C8]/40 hover:bg-[#0D0D0F] transition-all duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-[#12F6C8]/0 group-hover:bg-[#12F6C8]/5 transition-all duration-300" />
      
      <div className="relative z-10">
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        
        {status === 'loaded' ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[#12F6C8] text-xs font-mono">[ UNIT PROFILE LOADED ]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#12F6C8] text-xs font-mono">[ THREAT SCENARIO ANALYSIS READY ]</span>
            </div>
            {description && (
              <p className="text-gray-400 text-sm mt-2">{description}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[#0B85E5] text-xs font-mono group-hover:text-[#12F6C8] transition-colors">[ CLICK TO ACCESS ]</span>
          </div>
        )}
      </div>
    </div>
  )
}

// G3TI Advantage Item
function AdvantageItem({ text, delay = 0 }: { text: string; delay?: number }) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power2.out' }
      )
    }
  }, [delay])

  return (
    <div ref={itemRef} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#12F6C8]/5 transition-colors">
      <div className="w-2 h-2 rounded-full bg-[#0B85E5] mt-2 flex-shrink-0" />
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  )
}

export default function ThreatOperationsCommandRoomPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [systemTime, setSystemTime] = useState('')

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
      )
    }

    // Update system time
    const updateTime = () => {
      const now = new Date()
      setSystemTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC')
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const threatCategories = [
    'Domestic Violence Escalation Vectors',
    'Human Trafficking Digital Corridors',
    'Synthetic Identity Clusters',
    'Deepfake Threat Patterns',
    'Scam Network Nodes',
    'AI-Enabled Exploitation Graphs',
    'Dark-Web Exploitation Heatmaps',
    'Machine-Speed Deception Mapping',
  ]

  const advantages = [
    'G3TI exposes machine-speed threats traditional systems cannot see.',
    'G3TI predicts crime trajectories before escalation.',
    'G3TI identifies synthetic identity actors in milliseconds.',
    'G3TI fuses OSINT and behavioral vectors across millions of signals.',
    'G3TI empowers agencies with preemptive intelligence.',
    'G3TI amplifies law enforcement.',
    'G3TI accelerates investigators.',
    'G3TI protects the vulnerable.',
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Custom styles for monitoring glow */}
      <style jsx global>{`
        .monitoring-glow {
          text-shadow: 0 0 10px rgba(18, 246, 200, 0.5), 0 0 20px rgba(18, 246, 200, 0.3);
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Background grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(18,246,200,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18,246,200,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b border-red-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          {/* System status bar */}
          <div className="flex items-center justify-between mb-8 p-3 bg-[#0A0A0C] rounded-lg border border-red-500/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-xs font-mono">CLASSIFIED</span>
              </div>
              <span className="text-gray-500 text-xs">|</span>
              <span className="text-gray-400 text-xs font-mono">FOR GOVERNMENT & LAW ENFORCEMENT PARTNERS</span>
            </div>
            <div className="text-gray-500 text-xs font-mono">{systemTime}</div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-red-400 text-sm tracking-wider font-semibold">RESTRICTED ACCESS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">THREAT OPERATIONS</span><br />
              <span className="text-[#12F6C8] glow-text">COMMAND ROOM</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-time intelligence monitoring and threat analysis for federal, state, and local law enforcement agencies.
            </p>
          </div>
        </div>
      </section>

      {/* National Threat Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#12F6C8]" />
            <h2 className="text-2xl font-bold text-white tracking-wider">NATIONAL THREAT GRID</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {threatCategories.map((category, index) => (
              <ThreatTile 
                key={category} 
                title={category} 
                delay={index * 0.1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Brief Blocks */}
      <section className="py-16 px-4 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-6 h-6 text-[#0B85E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-2xl font-bold text-white tracking-wider">INTELLIGENCE BRIEF BLOCKS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BriefTile 
              title="Police Departments" 
              status="loaded" 
              description="Domestic threat escalation prediction"
              delay={0}
            />
            <BriefTile 
              title="Fusion Centers" 
              status="click"
              delay={0.1}
            />
            <BriefTile 
              title="Investigators" 
              status="loaded" 
              description="Digital evidence trail mapping"
              delay={0.2}
            />
            <BriefTile 
              title="Analysts" 
              status="click"
              delay={0.3}
            />
            <BriefTile 
              title="Domestic Violence Units" 
              status="click"
              delay={0.4}
            />
            <BriefTile 
              title="Crisis Response Teams" 
              status="click"
              delay={0.5}
            />
            <BriefTile 
              title="Homeland Security Partners" 
              status="click"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* G3TI Advantage */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#0B85E5]/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#0B85E5]" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wider">THE G3TI ADVANTAGE</h2>
          </div>
          
          <div className="space-y-2">
            {advantages.map((advantage, index) => (
              <AdvantageItem 
                key={index} 
                text={advantage} 
                delay={index * 0.08}
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#0A0A0C] rounded-xl border border-[#12F6C8]/20 text-center">
            <p className="text-xl text-[#12F6C8] font-semibold mb-2">
              This is the future of national safety intelligence.
            </p>
            <p className="text-gray-400 text-sm">
              G3TI Command Room — Where threats are seen before they strike.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0A0A0C] to-[#050505] border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Request Command Room Access</h2>
          <p className="text-gray-400 mb-8">
            Available to verified government agencies and law enforcement partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact.html" 
              className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all"
            >
              Request Access
            </Link>
            <Link 
              href="/government.html" 
              className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all"
            >
              Government Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
