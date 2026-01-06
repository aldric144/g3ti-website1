'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function EncryptionVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 300
    canvas.height = 200

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const columns = Math.floor(canvas.width / 15)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#12F6C8'
      ctx.font = '12px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 15, drops[i] * 15)

        if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas ref={canvasRef} className="rounded-lg opacity-50" />
  )
}

function TransmissionStatus({ status }: { status: 'idle' | 'encrypting' | 'transmitting' | 'complete' | 'error' }) {
  const statusConfig = {
    idle: { color: 'text-gray-500', text: 'AWAITING INPUT', icon: '○' },
    encrypting: { color: 'text-yellow-400', text: 'ENCRYPTING...', icon: '◐' },
    transmitting: { color: 'text-[#12F6C8]', text: 'TRANSMITTING...', icon: '◑' },
    complete: { color: 'text-green-400', text: 'TRANSMISSION COMPLETE', icon: '●' },
    error: { color: 'text-red-400', text: 'TRANSMISSION FAILED', icon: '✗' },
  }

  const config = statusConfig[status]

  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${config.color}`}>
      <span className={status === 'encrypting' || status === 'transmitting' ? 'animate-spin' : ''}>{config.icon}</span>
      <span>{config.text}</span>
    </div>
  )
}

function ContactMethod({ icon, title, value, description }: { icon: string; title: string; value: string; description: string }) {
  return (
    <div className="p-5 bg-[#050505] rounded-xl border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <div className="text-[#12F6C8] font-mono text-sm mb-2">{value}</div>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  )
}

function SecurityBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-full text-[#12F6C8] text-xs">
      <span>🔒</span>
      <span>{text}</span>
    </div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    classification: 'general',
  })
  const [status, setStatus] = useState<'idle' | 'encrypting' | 'transmitting' | 'complete' | 'error'>('idle')
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setStatus('encrypting')
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setStatus('transmitting')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setStatus('complete')
    
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0.5,
        scale: 0.98,
        duration: 0.3,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#12F6C8]/5 via-transparent to-[#0B85E5]/5" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">SECURE CHANNEL</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">ENCRYPTED</span>{' '}
            <span className="text-[#12F6C8] glow-text">TRANSMISSION</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Initiate secure communication with G3TI. All transmissions are encrypted 
            end-to-end using military-grade protocols.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <SecurityBadge text="AES-256 Encryption" />
            <SecurityBadge text="TLS 1.3" />
            <SecurityBadge text="Zero-Knowledge" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Transmission Form</h2>
                  <TransmissionStatus status={status} />
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono"
                        placeholder="Agent Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        disabled={status !== 'idle'}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono"
                        placeholder="agent@organization.gov"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        disabled={status !== 'idle'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Organization</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono"
                      placeholder="Agency / Department / Company"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      disabled={status !== 'idle'}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Classification</label>
                    <select
                      className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono"
                      value={formData.classification}
                      onChange={e => setFormData({ ...formData, classification: e.target.value })}
                      disabled={status !== 'idle'}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales / Partnership</option>
                      <option value="support">Technical Support</option>
                      <option value="security">Security Report</option>
                      <option value="government">Government / Federal</option>
                      <option value="classified">Classified (Requires Clearance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono"
                      placeholder="Transmission Subject"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      disabled={status !== 'idle'}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 outline-none font-mono resize-none"
                      placeholder="Enter your encrypted message..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      disabled={status !== 'idle'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className="w-full py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'idle' ? 'INITIATE SECURE TRANSMISSION' : 
                     status === 'encrypting' ? 'ENCRYPTING...' :
                     status === 'transmitting' ? 'TRANSMITTING...' :
                     status === 'complete' ? 'TRANSMISSION COMPLETE' : 'ERROR'}
                  </button>
                </form>

                {status === 'complete' && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <p className="text-green-400 font-semibold">Transmission received successfully.</p>
                    <p className="text-gray-400 text-sm mt-1">Reference ID: G3TI-{Date.now().toString(36).toUpperCase()}</p>
                    <p className="text-gray-500 text-xs mt-2">Expected response time: 24-48 hours</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h3 className="text-xl font-bold text-white mb-4">Encryption Status</h3>
                <EncryptionVisual />
                <div className="mt-4 space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Protocol:</span>
                    <span className="text-[#12F6C8]">TLS 1.3 + AES-256-GCM</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Key Exchange:</span>
                    <span className="text-[#12F6C8]">X25519</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Certificate:</span>
                    <span className="text-green-400">Valid</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <ContactMethod
                  icon="📍"
                  title="Headquarters"
                  value="Palm Beach, FL"
                  description="Global 3 Technology & Intelligence™"
                />
                <ContactMethod
                  icon="📧"
                  title="Secure Email"
                  value="contact@g3ti.com"
                  description="PGP encryption available upon request"
                />
                <ContactMethod
                  icon="📞"
                  title="Secure Line"
                  value="1-800-G3TI-SEC"
                  description="24/7 for government and enterprise clients"
                />
              </div>

              <div className="p-4 bg-[#0D0D0F] rounded-lg border border-[#12F6C8]/10">
                <h4 className="text-white font-semibold mb-2">Response Times</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>General Inquiries</span>
                    <span>24-48 hours</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Government/Federal</span>
                    <span>4-8 hours</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Security Reports</span>
                    <span>Immediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Secure Facility</h2>
          <p className="text-gray-400 mb-6">
            Our headquarters in Palm Beach, FL operates under strict security protocols. 
            On-site visits require prior authorization and security clearance verification.
          </p>
          <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/20 inline-block">
            <div className="text-[#12F6C8] font-mono">
              <div>Global 3 Technology & Intelligence™</div>
              <div className="text-gray-500">Palm Beach, Florida</div>
              <div className="text-gray-600 text-sm mt-2">Coordinates: [CLASSIFIED]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
