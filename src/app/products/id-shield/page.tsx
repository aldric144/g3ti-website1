'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function ShieldVisual() {
  const shieldRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (shieldRef.current) {
      gsap.to(shieldRef.current, {
        boxShadow: '0 0 60px rgba(18, 246, 200, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

  return (
    <div ref={shieldRef} className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-[#12F6C8]/30 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute inset-4 rounded-full border-2 border-[#0B85E5]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      <div className="absolute inset-8 rounded-full border border-[#12F6C8]/20 animate-spin" style={{ animationDuration: '10s' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl">🛡️</span>
      </div>
    </div>
  )
}

function ProtectionLayer({ name, status, level }: { name: string; status: 'active' | 'monitoring' | 'alert'; level: number }) {
  const statusColors = {
    active: 'bg-green-500',
    monitoring: 'bg-blue-500',
    alert: 'bg-red-500 animate-pulse',
  }

  return (
    <div className="p-4 bg-[#0D0D0F] rounded-lg border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold">{name}</span>
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      </div>
      <div className="h-2 bg-[#050505] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">{level}% Protected</div>
    </div>
  )
}

function IdentityCard({ type, value, verified }: { type: string; value: string; verified: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#050505] rounded-lg border border-[#12F6C8]/10">
      <div>
        <div className="text-gray-500 text-xs uppercase">{type}</div>
        <div className="text-white font-mono">{value}</div>
      </div>
      <div className={`px-2 py-1 rounded text-xs ${verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
        {verified ? 'VERIFIED' : 'PENDING'}
      </div>
    </div>
  )
}

function AlertFeed() {
  const alerts = [
    { time: '2 min ago', type: 'info', message: 'Dark web scan completed - No exposures found' },
    { time: '15 min ago', type: 'success', message: 'Credit monitoring check passed' },
    { time: '1 hour ago', type: 'warning', message: 'New device login detected - Verified as safe' },
    { time: '3 hours ago', type: 'info', message: 'Identity verification renewed' },
  ]

  const typeColors = {
    info: 'border-blue-500/30 text-blue-400',
    success: 'border-green-500/30 text-green-400',
    warning: 'border-yellow-500/30 text-yellow-400',
    error: 'border-red-500/30 text-red-400',
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => (
        <div key={i} className={`p-3 rounded-lg border ${typeColors[alert.type as keyof typeof typeColors]} bg-[#050505]`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">{alert.time}</span>
          </div>
          <p className="text-sm text-gray-300">{alert.message}</p>
        </div>
      ))}
    </div>
  )
}

export default function IDShieldPage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
                <span className="text-[#12F6C8] text-sm tracking-wider">IDENTITY PROTECTION SYSTEM</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-white">ID</span>{' '}
                <span className="text-[#12F6C8] glow-text">SHIELD</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Comprehensive identity protection that monitors, alerts, and defends 
                against identity theft, synthetic fraud, and credential compromise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact.html" className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
                  Activate Protection
                </Link>
                <Link href="/products.html" className="px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
                  Learn More
                </Link>
              </div>
            </div>
            <div>
              <ShieldVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-y border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['dashboard', 'protection', 'monitoring', 'recovery'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 text-sm font-mono whitespace-nowrap transition-all ${
                  activeSection === section
                    ? 'text-[#12F6C8] border-b-2 border-[#12F6C8] bg-[#12F6C8]/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Protection Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ProtectionLayer name="Identity Monitoring" status="active" level={100} />
                    <ProtectionLayer name="Credit Protection" status="active" level={100} />
                    <ProtectionLayer name="Dark Web Scanning" status="monitoring" level={95} />
                    <ProtectionLayer name="Social Security" status="active" level={100} />
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Protected Identities</h3>
                  <div className="space-y-3">
                    <IdentityCard type="Social Security" value="***-**-4521" verified={true} />
                    <IdentityCard type="Driver License" value="FL-****-7892" verified={true} />
                    <IdentityCard type="Passport" value="*****4521" verified={true} />
                    <IdentityCard type="Credit Cards" value="4 cards monitored" verified={true} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Security Score</h3>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#12F6C8] glow-text mb-2">94</div>
                    <div className="text-gray-500">Excellent Protection</div>
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <AlertFeed />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'protection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🔐', title: 'Identity Lock', desc: 'Freeze your identity across all credit bureaus instantly' },
                { icon: '🌐', title: 'Dark Web Monitoring', desc: 'Continuous scanning of dark web marketplaces for your data' },
                { icon: '💳', title: 'Credit Monitoring', desc: 'Real-time alerts for credit inquiries and new accounts' },
                { icon: '📱', title: 'Device Protection', desc: 'Secure all devices linked to your identity' },
                { icon: '🏦', title: 'Bank Account Monitoring', desc: 'Track suspicious activity across financial accounts' },
                { icon: '📧', title: 'Email Breach Alerts', desc: 'Instant notification when email appears in breaches' },
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all group">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#12F6C8] transition-colors">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'monitoring' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-6">Monitoring Dashboard</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Dark Web Scans', value: '24/7', status: 'active' },
                    { label: 'Credit Checks', value: 'Daily', status: 'active' },
                    { label: 'Social Media', value: 'Hourly', status: 'active' },
                    { label: 'Public Records', value: 'Weekly', status: 'active' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-[#050505] rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#12F6C8] mb-1">{item.value}</div>
                      <div className="text-gray-500 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Threat Detection Log</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-green-400">[OK] No identity theft attempts detected</div>
                    <div className="text-green-400">[OK] No unauthorized credit inquiries</div>
                    <div className="text-green-400">[OK] No dark web exposures found</div>
                    <div className="text-blue-400">[INFO] Last full scan: 2 hours ago</div>
                  </div>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Coverage Map</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'United States', coverage: 100 },
                      { name: 'European Union', coverage: 95 },
                      { name: 'United Kingdom', coverage: 98 },
                      { name: 'Canada', coverage: 97 },
                    ].map((region, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{region.name}</span>
                          <span className="text-[#12F6C8]">{region.coverage}%</span>
                        </div>
                        <div className="h-1 bg-[#050505] rounded-full">
                          <div className="h-full bg-[#12F6C8] rounded-full" style={{ width: `${region.coverage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'recovery' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-4">Recovery Services</h3>
                <div className="space-y-4">
                  {[
                    { icon: '👤', title: 'Dedicated Recovery Specialist', desc: 'Personal expert assigned to your case' },
                    { icon: '⚖️', title: 'Legal Support', desc: 'Access to identity theft attorneys' },
                    { icon: '💰', title: '$1M Insurance', desc: 'Coverage for identity theft losses' },
                    { icon: '📋', title: 'Document Replacement', desc: 'Assistance replacing stolen documents' },
                  ].map((service, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-[#050505] rounded-lg">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">{service.title}</h4>
                        <p className="text-gray-500 text-sm">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-4">Emergency Response</h3>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🚨</div>
                  <h4 className="text-2xl font-bold text-white mb-2">24/7 Emergency Hotline</h4>
                  <p className="text-gray-400 mb-6">Immediate response for identity theft emergencies</p>
                  <div className="text-3xl font-bold text-[#12F6C8] font-mono">1-800-G3TI-HELP</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Protect Your Identity Today</h2>
          <p className="text-gray-400 mb-6">Join millions who trust ID SHIELD for comprehensive identity protection.</p>
          <Link href="/contact.html" className="inline-block px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
            Start Protection
          </Link>
        </div>
      </section>
    </div>
  )
}
