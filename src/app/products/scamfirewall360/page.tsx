'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function FirewallVisual() {
  const [blocked, setBlocked] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocked(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-[#12F6C8] glow-text mb-2">{blocked.toLocaleString()}</div>
          <div className="text-gray-500">Scams Blocked Today</div>
        </div>
      </div>
      
      {/* Animated firewall lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#12F6C8]/50 to-transparent"
            style={{
              top: `${10 + i * 10}%`,
              left: '-100%',
              right: '-100%',
              animation: `slideRight ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  )
}

function ThreatIndicator({ type, count, trend }: { type: string; count: number; trend: 'up' | 'down' | 'stable' }) {
  const trendIcons = { up: '↑', down: '↓', stable: '→' }
  const trendColors = { up: 'text-red-400', down: 'text-green-400', stable: 'text-yellow-400' }

  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{type}</span>
        <span className={`text-sm ${trendColors[trend]}`}>{trendIcons[trend]}</span>
      </div>
      <div className="text-2xl font-bold text-white">{count.toLocaleString()}</div>
    </div>
  )
}

function ScamTypeCard({ icon, name, description, blocked, severity }: { icon: string; name: string; description: string; blocked: number; severity: 'high' | 'medium' | 'low' }) {
  const severityColors = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-green-500/30 bg-green-500/5',
  }

  return (
    <div className={`p-5 rounded-xl border ${severityColors[severity]} hover:scale-[1.02] transition-all cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded ${
          severity === 'high' ? 'bg-red-500/20 text-red-400' :
          severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {severity.toUpperCase()} RISK
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="text-[#12F6C8] font-mono text-sm">{blocked.toLocaleString()} blocked this month</div>
    </div>
  )
}

function LiveFeed() {
  const [events, setEvents] = useState([
    { time: 'Just now', type: 'blocked', message: 'Phishing attempt blocked from suspicious domain' },
    { time: '30s ago', type: 'blocked', message: 'Romance scam pattern detected and prevented' },
    { time: '1m ago', type: 'warning', message: 'Suspicious caller ID spoofing detected' },
    { time: '2m ago', type: 'blocked', message: 'Investment fraud website blocked' },
  ])

  useEffect(() => {
    const messages = [
      'Phishing email intercepted',
      'Fake tech support call blocked',
      'Cryptocurrency scam prevented',
      'Identity theft attempt stopped',
      'Malicious link neutralized',
    ]
    
    const interval = setInterval(() => {
      const newEvent = {
        time: 'Just now',
        type: 'blocked',
        message: messages[Math.floor(Math.random() * messages.length)],
      }
      setEvents(prev => [newEvent, ...prev.slice(0, 3)])
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <div 
          key={i} 
          className={`p-3 rounded-lg border ${
            event.type === 'blocked' ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'
          } transition-all`}
          style={{ opacity: 1 - i * 0.2 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs ${event.type === 'blocked' ? 'text-green-400' : 'text-yellow-400'}`}>
              {event.type === 'blocked' ? 'BLOCKED' : 'WARNING'}
            </span>
            <span className="text-xs text-gray-500">{event.time}</span>
          </div>
          <p className="text-sm text-gray-300">{event.message}</p>
        </div>
      ))}
    </div>
  )
}

export default function ScamFirewall360Page() {
  const [activeView, setActiveView] = useState('overview')
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
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <span className="text-red-400 text-sm tracking-wider">ACTIVE PROTECTION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">SCAM</span>
              <span className="text-[#12F6C8] glow-text">FIREWALL</span>
              <span className="text-white">360</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              360-degree protection against scams, fraud, and social engineering attacks. 
              AI-powered detection that learns and adapts to new threats in real-time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                Activate Firewall
              </Link>
              <Link href="/products.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
                View Demo
              </Link>
            </div>
          </div>
          
          <FirewallVisual />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ThreatIndicator type="Phishing Attempts" count={12453} trend="down" />
            <ThreatIndicator type="Voice Scams" count={3421} trend="down" />
            <ThreatIndicator type="Romance Fraud" count={892} trend="stable" />
            <ThreatIndicator type="Investment Scams" count={2134} trend="down" />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-b border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['overview', 'threats', 'protection', 'analytics'].map(view => (
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
          {activeView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">How ScamFirewall360 Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { step: '01', title: 'Detect', desc: 'AI analyzes communications for scam patterns' },
                      { step: '02', title: 'Block', desc: 'Threats are neutralized before reaching you' },
                      { step: '03', title: 'Learn', desc: 'System adapts to new scam techniques' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                        <div className="text-3xl font-bold text-[#12F6C8]/30 mb-2">{item.step}</div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Protection Layers</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Email Protection', level: 100 },
                      { name: 'Phone Call Screening', level: 95 },
                      { name: 'SMS/Text Filtering', level: 98 },
                      { name: 'Web Browsing Shield', level: 100 },
                      { name: 'Social Media Guard', level: 92 },
                    ].map((layer, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{layer.name}</span>
                          <span className="text-[#12F6C8]">{layer.level}%</span>
                        </div>
                        <div className="h-2 bg-[#050505] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] rounded-full" style={{ width: `${layer.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Live Threat Feed</h3>
                  <LiveFeed />
                </div>
              </div>
            </div>
          )}

          {activeView === 'threats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScamTypeCard icon="🎣" name="Phishing Attacks" description="Fake emails and websites designed to steal credentials" blocked={45231} severity="high" />
              <ScamTypeCard icon="💔" name="Romance Scams" description="Fraudsters building fake relationships for money" blocked={8923} severity="high" />
              <ScamTypeCard icon="📞" name="Phone Scams" description="Impersonation calls from fake authorities" blocked={23456} severity="high" />
              <ScamTypeCard icon="💰" name="Investment Fraud" description="Fake investment opportunities and Ponzi schemes" blocked={12345} severity="medium" />
              <ScamTypeCard icon="🛒" name="Shopping Scams" description="Fake online stores and counterfeit products" blocked={34567} severity="medium" />
              <ScamTypeCard icon="🏆" name="Prize Scams" description="Fake lottery and sweepstakes notifications" blocked={19876} severity="low" />
            </div>
          )}

          {activeView === 'protection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '📧', title: 'Email Shield', features: ['Phishing detection', 'Attachment scanning', 'Link verification', 'Sender authentication'] },
                { icon: '📱', title: 'Phone Guard', features: ['Caller ID verification', 'Scam call blocking', 'Voicemail screening', 'Robocall filter'] },
                { icon: '💬', title: 'Message Filter', features: ['SMS scam detection', 'Spam blocking', 'Link scanning', 'Keyword alerts'] },
                { icon: '🌐', title: 'Web Protection', features: ['Malicious site blocking', 'Fake store detection', 'Download scanning', 'Form protection'] },
              ].map((section, i) => (
                <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{section.icon}</span>
                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Monthly Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Threats Blocked', value: '1.2M' },
                    { label: 'Money Saved', value: '$4.8M' },
                    { label: 'Users Protected', value: '50K+' },
                    { label: 'Detection Rate', value: '99.8%' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                      <div className="text-3xl font-bold text-[#12F6C8] mb-1">{stat.value}</div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Threat Trends</h3>
                <div className="space-y-4">
                  {[
                    { type: 'AI-Generated Scams', change: '+45%', direction: 'up' },
                    { type: 'Traditional Phishing', change: '-12%', direction: 'down' },
                    { type: 'Voice Clone Fraud', change: '+78%', direction: 'up' },
                    { type: 'SMS Scams', change: '-8%', direction: 'down' },
                  ].map((trend, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                      <span className="text-gray-400">{trend.type}</span>
                      <span className={trend.direction === 'up' ? 'text-red-400' : 'text-green-400'}>{trend.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stop Scams Before They Start</h2>
          <p className="text-gray-400 mb-6">Protect yourself and your family with ScamFirewall360.</p>
          <Link href="/contact.html" className="inline-block px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Get Protected Now
          </Link>
        </div>
      </section>
    </div>
  )
}
