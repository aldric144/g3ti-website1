'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function HeartbeatVisual() {
  const pathRef = useRef<SVGPathElement>(null)
  
  useEffect(() => {
    if (pathRef.current) {
      gsap.fromTo(pathRef.current,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'linear' }
      )
    }
  }, [])

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <path
          ref={pathRef}
          d="M0,50 L50,50 L70,50 L80,20 L90,80 L100,30 L110,70 L120,50 L150,50 L200,50 L220,50 L230,20 L240,80 L250,30 L260,70 L270,50 L300,50 L350,50 L370,50 L380,20 L390,80 L400,50"
          fill="none"
          stroke="#12F6C8"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl animate-pulse">❤️</div>
      </div>
    </div>
  )
}

function ProtectionRing({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all ${
        active 
          ? 'bg-[#12F6C8] text-black font-semibold' 
          : 'bg-[#0D0D0F] border border-[#12F6C8]/30 text-gray-400 hover:border-[#12F6C8]/50'
      }`}
    >
      {label}
    </button>
  )
}

function FamilyMemberCard({ name, relation, status, lastCheck }: { name: string; relation: string; status: 'safe' | 'alert' | 'offline'; lastCheck: string }) {
  const statusColors = {
    safe: 'bg-green-500',
    alert: 'bg-red-500 animate-pulse',
    offline: 'bg-gray-500',
  }

  return (
    <div className="p-4 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#12F6C8]/20 to-[#0B85E5]/20 flex items-center justify-center text-2xl">
          👤
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">{name}</span>
            <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          </div>
          <div className="text-gray-500 text-sm">{relation}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Last check</div>
          <div className="text-sm text-[#12F6C8]">{lastCheck}</div>
        </div>
      </div>
    </div>
  )
}

function ThreatAlert({ type, message, time, severity }: { type: string; message: string; time: string; severity: 'high' | 'medium' | 'low' }) {
  const severityColors = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-blue-500/30 bg-blue-500/5',
  }

  return (
    <div className={`p-4 rounded-lg border ${severityColors[severity]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${
          severity === 'high' ? 'text-red-400' : severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
        }`}>
          {type}
        </span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-300">{message}</p>
    </div>
  )
}

export default function HeartGuardAIPage() {
  const [activeRing, setActiveRing] = useState('family')
  const [activeTab, setActiveTab] = useState('dashboard')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const familyMembers = [
    { name: 'Mom', relation: 'Parent', status: 'safe' as const, lastCheck: '2 min ago' },
    { name: 'Dad', relation: 'Parent', status: 'safe' as const, lastCheck: '5 min ago' },
    { name: 'Grandma', relation: 'Grandparent', status: 'safe' as const, lastCheck: '10 min ago' },
    { name: 'Grandpa', relation: 'Grandparent', status: 'offline' as const, lastCheck: '2 hours ago' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-pink-500/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6">
              <span className="text-pink-400 text-sm tracking-wider">FAMILY PROTECTION SYSTEM</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">HEART</span>
              <span className="text-[#12F6C8] glow-text">GUARD</span>
              <span className="text-white"> AI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              AI-powered protection for your loved ones. Detect scams targeting elderly family members, 
              monitor for romance fraud, and keep your family safe from digital threats.
            </p>
            
            <HeartbeatVisual />
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                Protect Your Family
              </Link>
              <Link href="/products.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Protection Rings */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <ProtectionRing label="Family Circle" active={activeRing === 'family'} onClick={() => setActiveRing('family')} />
            <ProtectionRing label="Elder Care" active={activeRing === 'elder'} onClick={() => setActiveRing('elder')} />
            <ProtectionRing label="Child Safety" active={activeRing === 'child'} onClick={() => setActiveRing('child')} />
            <ProtectionRing label="Romance Guard" active={activeRing === 'romance'} onClick={() => setActiveRing('romance')} />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-b border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['dashboard', 'protection', 'alerts', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-mono whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-[#12F6C8] border-b-2 border-[#12F6C8] bg-[#12F6C8]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Family Members</h3>
                    <span className="text-sm text-[#12F6C8]">All Safe</span>
                  </div>
                  <div className="space-y-3">
                    {familyMembers.map((member, i) => (
                      <FamilyMemberCard key={i} {...member} />
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Protection Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: '📞', name: 'Call Screening', status: 'Active' },
                      { icon: '💬', name: 'Message Monitoring', status: 'Active' },
                      { icon: '💳', name: 'Financial Alerts', status: 'Active' },
                      { icon: '🌐', name: 'Web Protection', status: 'Active' },
                    ].map((feature, i) => (
                      <div key={i} className="p-4 bg-[#050505] rounded-lg flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <div className="text-white font-semibold">{feature.name}</div>
                          <div className="text-green-400 text-xs">{feature.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Family Safety Score</h3>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#12F6C8] glow-text mb-2">98</div>
                    <div className="text-gray-500">Excellent Protection</div>
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Alerts</h3>
                  <div className="space-y-3">
                    <ThreatAlert type="BLOCKED" message="Suspicious call blocked for Grandma" time="1 hour ago" severity="medium" />
                    <ThreatAlert type="INFO" message="Weekly security scan completed" time="Yesterday" severity="low" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'protection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '👴', title: 'Elder Scam Protection', desc: 'AI detects and blocks scams targeting seniors', features: ['Phone scam blocking', 'Email protection', 'Financial monitoring'] },
                { icon: '💔', title: 'Romance Fraud Guard', desc: 'Identifies fake profiles and romance scammers', features: ['Profile verification', 'Conversation analysis', 'Red flag alerts'] },
                { icon: '👶', title: 'Child Safety Shield', desc: 'Protects children from online predators', features: ['Content filtering', 'Contact monitoring', 'Location tracking'] },
                { icon: '📱', title: 'Device Monitoring', desc: 'Monitor family devices for threats', features: ['App monitoring', 'Screen time', 'Threat detection'] },
                { icon: '💰', title: 'Financial Guardian', desc: 'Alerts for unusual financial activity', features: ['Transaction alerts', 'Account monitoring', 'Fraud detection'] },
                { icon: '🏠', title: 'Home Network Shield', desc: 'Protect all devices on your network', features: ['IoT protection', 'Network monitoring', 'Intrusion detection'] },
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 mb-4">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Alert History</h3>
                <div className="space-y-4">
                  <ThreatAlert type="BLOCKED" message="Suspicious phone call blocked - Caller claimed to be IRS" time="Today, 2:30 PM" severity="high" />
                  <ThreatAlert type="WARNING" message="Unusual login attempt detected on Dad's email" time="Today, 11:15 AM" severity="medium" />
                  <ThreatAlert type="BLOCKED" message="Phishing email intercepted for Grandma" time="Yesterday, 4:45 PM" severity="high" />
                  <ThreatAlert type="INFO" message="Monthly security report generated" time="Yesterday, 9:00 AM" severity="low" />
                  <ThreatAlert type="BLOCKED" message="Romance scam profile detected and blocked" time="2 days ago" severity="high" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Instant Alerts', desc: 'Get notified immediately for high-risk threats', enabled: true },
                    { name: 'Daily Summary', desc: 'Receive daily protection summary', enabled: true },
                    { name: 'Weekly Report', desc: 'Detailed weekly security report', enabled: true },
                    { name: 'Family Updates', desc: 'Notifications when family status changes', enabled: false },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#050505] rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{setting.name}</div>
                        <div className="text-gray-500 text-sm">{setting.desc}</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-[#12F6C8]' : 'bg-gray-600'} relative cursor-pointer`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${setting.enabled ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Emergency Contacts</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-white font-semibold">Emergency Hotline</div>
                    <div className="text-[#12F6C8] font-mono text-lg">1-800-HEART-AI</div>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-white font-semibold">Local Authorities</div>
                    <div className="text-gray-400 text-sm">Auto-configured based on location</div>
                  </div>
                  <div className="p-4 bg-[#050505] rounded-lg">
                    <div className="text-white font-semibold">Family Admin</div>
                    <div className="text-gray-400 text-sm">You (Primary Account Holder)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Protect the Ones You Love</h2>
          <p className="text-gray-400 mb-6">HeartGuard AI keeps your family safe from digital threats.</p>
          <Link href="/contact.html" className="inline-block px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Start Family Protection
          </Link>
        </div>
      </section>
    </div>
  )
}
