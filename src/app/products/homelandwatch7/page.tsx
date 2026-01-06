'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function RadarVisual() {
  const radarRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (radarRef.current) {
      gsap.to(radarRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'linear'
      })
    }
  }, [])

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-[#12F6C8]/20" />
      <div className="absolute inset-4 rounded-full border border-[#12F6C8]/15" />
      <div className="absolute inset-8 rounded-full border border-[#12F6C8]/10" />
      <div className="absolute inset-12 rounded-full border border-[#12F6C8]/5" />
      
      <div ref={radarRef} className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-[#12F6C8] to-transparent" />
        <div className="absolute top-1/2 left-1/2 w-1/2 h-16 origin-left bg-gradient-to-r from-[#12F6C8]/20 to-transparent" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }} />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#12F6C8] animate-pulse" />
      </div>
      
      {/* Threat dots */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-green-500" />
    </div>
  )
}

function ThreatLevelIndicator({ level }: { level: 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'SEVERE' }) {
  const levels = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'SEVERE']
  const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500']
  const currentIndex = levels.indexOf(level)

  return (
    <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
      <h3 className="text-lg font-bold text-white mb-4">National Threat Level</h3>
      <div className="flex gap-1 mb-4">
        {levels.map((l, i) => (
          <div
            key={l}
            className={`flex-1 h-8 ${colors[i]} ${i <= currentIndex ? 'opacity-100' : 'opacity-20'} first:rounded-l last:rounded-r`}
          />
        ))}
      </div>
      <div className="text-center">
        <div className={`text-2xl font-bold ${colors[currentIndex].replace('bg-', 'text-')}`}>{level}</div>
        <div className="text-gray-500 text-sm">Current Assessment</div>
      </div>
    </div>
  )
}

function IntelligenceFeed() {
  const [feeds] = useState([
    { time: '2 min ago', source: 'SIGINT', message: 'Encrypted communication pattern detected in sector 7', priority: 'high' },
    { time: '15 min ago', source: 'HUMINT', message: 'Asset reports increased activity at border crossing', priority: 'medium' },
    { time: '1 hour ago', source: 'OSINT', message: 'Social media analysis indicates coordinated campaign', priority: 'medium' },
    { time: '3 hours ago', source: 'GEOINT', message: 'Satellite imagery confirms infrastructure changes', priority: 'low' },
  ])

  const priorityColors = {
    high: 'border-red-500/30 text-red-400',
    medium: 'border-yellow-500/30 text-yellow-400',
    low: 'border-green-500/30 text-green-400',
  }

  return (
    <div className="space-y-3">
      {feeds.map((feed, i) => (
        <div key={i} className={`p-4 rounded-lg border ${priorityColors[feed.priority as keyof typeof priorityColors]} bg-[#050505]`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono bg-[#12F6C8]/10 px-2 py-1 rounded text-[#12F6C8]">{feed.source}</span>
            <span className="text-xs text-gray-500">{feed.time}</span>
          </div>
          <p className="text-sm text-gray-300">{feed.message}</p>
        </div>
      ))}
    </div>
  )
}

function CapabilityModule({ icon, title, description, classification }: { icon: string; title: string; description: string; classification: string }) {
  return (
    <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{icon}</span>
        <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 font-mono">{classification}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#12F6C8] transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}

function SectorStatus({ name, status, threats }: { name: string; status: 'secure' | 'monitoring' | 'alert'; threats: number }) {
  const statusColors = {
    secure: 'text-green-400',
    monitoring: 'text-yellow-400',
    alert: 'text-red-400 animate-pulse',
  }

  return (
    <div className="flex items-center justify-between p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10">
      <div>
        <div className="text-white font-semibold">{name}</div>
        <div className={`text-sm ${statusColors[status]}`}>{status.toUpperCase()}</div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-[#12F6C8]">{threats}</div>
        <div className="text-xs text-gray-500">Active Threats</div>
      </div>
    </div>
  )
}

export default function HomelandWatch7Page() {
  const [activeView, setActiveView] = useState('command')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-red-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
                <span className="text-red-400 text-sm tracking-wider">CLASSIFIED // NATIONAL SECURITY</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">HOMELAND</span>
                <span className="text-[#12F6C8] glow-text">WATCH</span>
                <span className="text-white">7</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Next-generation national security intelligence platform. Real-time threat detection, 
                multi-source intelligence fusion, and predictive analytics for homeland defense.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                  Request Briefing
                </Link>
                <Link href="/government.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
                  Government Solutions
                </Link>
              </div>
            </div>
            <div>
              <RadarVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-y border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['command', 'intelligence', 'capabilities', 'sectors'].map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-3 text-sm font-mono whitespace-nowrap transition-all ${
                  activeView === view
                    ? 'text-[#12F6C8] border-b-2 border-[#12F6C8] bg-[#12F6C8]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {view.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {activeView === 'command' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-6">Command Dashboard</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Active Operations', value: '47' },
                      { label: 'Assets Deployed', value: '1,234' },
                      { label: 'Threats Monitored', value: '892' },
                      { label: 'Intel Reports', value: '156' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                        <div className="text-3xl font-bold text-[#12F6C8] mb-1">{stat.value}</div>
                        <div className="text-gray-500 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Sector Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SectorStatus name="Northern Border" status="secure" threats={3} />
                    <SectorStatus name="Southern Border" status="monitoring" threats={12} />
                    <SectorStatus name="Coastal Waters" status="secure" threats={5} />
                    <SectorStatus name="Airspace" status="secure" threats={2} />
                    <SectorStatus name="Cyber Domain" status="alert" threats={47} />
                    <SectorStatus name="Critical Infrastructure" status="monitoring" threats={8} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ThreatLevelIndicator level="ELEVATED" />
                
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Live Intelligence Feed</h3>
                  <IntelligenceFeed />
                </div>
              </div>
            </div>
          )}

          {activeView === 'intelligence' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '📡', name: 'SIGINT', desc: 'Signals Intelligence', count: 234 },
                  { icon: '👤', name: 'HUMINT', desc: 'Human Intelligence', count: 89 },
                  { icon: '🛰️', name: 'GEOINT', desc: 'Geospatial Intelligence', count: 156 },
                  { icon: '🌐', name: 'OSINT', desc: 'Open Source Intelligence', count: 1247 },
                ].map((source, i) => (
                  <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 text-center">
                    <div className="text-4xl mb-3">{source.icon}</div>
                    <div className="text-[#12F6C8] font-bold text-lg">{source.name}</div>
                    <div className="text-gray-500 text-sm mb-2">{source.desc}</div>
                    <div className="text-2xl font-bold text-white">{source.count}</div>
                    <div className="text-xs text-gray-500">Active Sources</div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Intelligence Fusion Center</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#12F6C8] font-semibold mb-4">Multi-INT Correlation</h4>
                    <p className="text-gray-400 mb-4">
                      HomelandWatch7 fuses intelligence from multiple sources to provide 
                      comprehensive situational awareness and threat assessment.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Real-time data correlation',
                        'Pattern recognition across sources',
                        'Automated threat scoring',
                        'Predictive threat modeling',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[#12F6C8] mb-2">99.2%</div>
                      <div className="text-gray-500">Correlation Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'capabilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CapabilityModule icon="🎯" title="Threat Detection" description="AI-powered identification of emerging threats across all domains" classification="SECRET" />
              <CapabilityModule icon="🔮" title="Predictive Analytics" description="Machine learning models for threat prediction and risk assessment" classification="SECRET" />
              <CapabilityModule icon="🗺️" title="Geospatial Analysis" description="Real-time mapping and tracking of threats and assets" classification="TOP SECRET" />
              <CapabilityModule icon="📊" title="Pattern Analysis" description="Behavioral pattern recognition across communications" classification="SECRET" />
              <CapabilityModule icon="🔗" title="Network Analysis" description="Social network and organizational structure mapping" classification="SECRET" />
              <CapabilityModule icon="⚡" title="Rapid Response" description="Automated alerting and response coordination" classification="UNCLASSIFIED" />
            </div>
          )}

          {activeView === 'sectors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { name: 'Border Security', icon: '🚧', threats: ['Illegal crossings', 'Smuggling networks', 'Tunnel detection'], status: 'Active monitoring' },
                { name: 'Maritime Domain', icon: '🚢', threats: ['Vessel tracking', 'Port security', 'Coastal surveillance'], status: 'Full coverage' },
                { name: 'Aviation Security', icon: '✈️', threats: ['Airspace monitoring', 'No-fly enforcement', 'Drone detection'], status: 'Active monitoring' },
                { name: 'Cyber Defense', icon: '💻', threats: ['Critical infrastructure', 'Government networks', 'Election security'], status: 'Elevated alert' },
                { name: 'Counter-Terrorism', icon: '🎯', threats: ['Domestic threats', 'Foreign actors', 'Lone wolves'], status: 'Active monitoring' },
                { name: 'Critical Infrastructure', icon: '🏭', threats: ['Power grid', 'Water systems', 'Communications'], status: 'Protected' },
              ].map((sector, i) => (
                <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{sector.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{sector.name}</h3>
                      <div className="text-[#12F6C8] text-sm">{sector.status}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {sector.threats.map((threat, j) => (
                      <div key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                        {threat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Secure Your Nation</h2>
          <p className="text-gray-400 mb-6">HomelandWatch7 provides the intelligence edge for national security.</p>
          <Link href="/contact.html" className="inline-block px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Request Classified Briefing
          </Link>
        </div>
      </section>
    </div>
  )
}
