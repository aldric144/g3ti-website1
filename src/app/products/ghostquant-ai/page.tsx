'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function TerminalLine({ text, delay, type = 'output' }: { text: string; delay: number; type?: 'output' | 'command' | 'success' | 'warning' }) {
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
      let i = 0
      const typeTimer = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i))
          i++
        } else {
          clearInterval(typeTimer)
        }
      }, 20)
      return () => clearInterval(typeTimer)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  const colors = {
    output: 'text-gray-400',
    command: 'text-[#12F6C8]',
    success: 'text-green-400',
    warning: 'text-yellow-400',
  }

  if (!visible) return null

  return (
    <div className={`font-mono text-sm ${colors[type]}`}>
      {type === 'command' && <span className="text-[#0B85E5]">$ </span>}
      {displayText}
      {displayText.length < text.length && <span className="animate-pulse">▊</span>}
    </div>
  )
}

function ConsolePanel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0D0D0F] rounded-lg border border-[#12F6C8]/20 overflow-hidden ${className}`}>
      <div className="px-4 py-2 bg-[#12F6C8]/10 border-b border-[#12F6C8]/20 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-[#12F6C8] text-sm font-mono">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function MetricGauge({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100
  const gaugeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gaugeRef.current) {
      gsap.fromTo(gaugeRef.current,
        { width: '0%' },
        { width: `${percentage}%`, duration: 1.5, ease: 'power2.out', delay: 0.5 }
      )
    }
  }, [percentage])

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-mono">{value.toLocaleString()}/{max.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-[#050505] rounded-full overflow-hidden">
        <div ref={gaugeRef} className="h-full rounded-full" style={{ backgroundColor: color, width: '0%' }} />
      </div>
    </div>
  )
}

function FeatureModule({ icon, title, description, status }: { icon: string; title: string; description: string; status: 'active' | 'standby' | 'processing' }) {
  const statusColors = {
    active: 'bg-green-500',
    standby: 'bg-yellow-500',
    processing: 'bg-blue-500 animate-pulse',
  }

  return (
    <div className="p-4 bg-[#050505] rounded-lg border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all group">
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      </div>
      <h4 className="text-white font-semibold mb-1 group-hover:text-[#12F6C8] transition-colors">{title}</h4>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  )
}

export default function GhostQuantAIPage() {
  const [activeTab, setActiveTab] = useState('overview')
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
      {/* Console Header */}
      <section className="py-12 px-4 border-b border-[#12F6C8]/10">
        <div ref={headerRef} className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#12F6C8]/20 to-[#0B85E5]/20 border border-[#12F6C8]/30 flex items-center justify-center">
              <span className="text-3xl">👻</span>
            </div>
            <div>
              <div className="text-[#12F6C8] text-sm font-mono mb-1">PRODUCT CONSOLE // ACTIVE</div>
              <h1 className="text-4xl font-bold text-white">GhostQuant AI</h1>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Quantum-resistant deepfake detection and synthetic media analysis platform. 
            Identifies AI-generated content with 99.7% accuracy across video, audio, and images.
          </p>
        </div>
      </section>

      {/* Console Navigation */}
      <section className="border-b border-[#12F6C8]/10 sticky top-20 bg-[#050505] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {['overview', 'capabilities', 'integration', 'metrics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-mono transition-all ${
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

      {/* Console Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ConsolePanel title="system_status.log" className="lg:col-span-2">
                <div className="space-y-2 font-mono text-sm">
                  <TerminalLine text="GhostQuant AI v4.2.1 initialized" delay={0} type="success" />
                  <TerminalLine text="Loading neural detection models..." delay={500} type="output" />
                  <TerminalLine text="Deepfake detection engine: ONLINE" delay={1000} type="success" />
                  <TerminalLine text="Voice clone analyzer: ONLINE" delay={1500} type="success" />
                  <TerminalLine text="Synthetic image detector: ONLINE" delay={2000} type="success" />
                  <TerminalLine text="Quantum-resistant encryption: ACTIVE" delay={2500} type="success" />
                  <TerminalLine text="ghostquant --scan --realtime --all-media" delay={3000} type="command" />
                  <TerminalLine text="Real-time scanning enabled. Monitoring all media streams." delay={3500} type="output" />
                </div>
              </ConsolePanel>

              <ConsolePanel title="threat_level.gauge">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-[#12F6C8] glow-text">LOW</div>
                  <div className="text-gray-500 text-sm">Current Threat Level</div>
                </div>
                <MetricGauge label="Deepfakes Detected Today" value={847} max={1000} color="#ff4444" />
                <MetricGauge label="Voice Clones Blocked" value={234} max={500} color="#ffaa44" />
                <MetricGauge label="Synthetic Images Flagged" value={1892} max={3000} color="#12F6C8" />
              </ConsolePanel>

              <ConsolePanel title="detection_modules.list" className="lg:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FeatureModule icon="🎭" title="Face Swap Detection" description="Identifies manipulated facial features" status="active" />
                  <FeatureModule icon="🔊" title="Voice Clone Analysis" description="Detects synthetic voice patterns" status="active" />
                  <FeatureModule icon="🖼️" title="GAN Image Detection" description="Identifies AI-generated images" status="processing" />
                  <FeatureModule icon="📹" title="Video Manipulation" description="Frame-by-frame analysis" status="active" />
                  <FeatureModule icon="📝" title="Text Generation" description="AI-written content detection" status="standby" />
                  <FeatureModule icon="🧬" title="Biometric Verification" description="Multi-factor identity check" status="active" />
                  <FeatureModule icon="🌐" title="Source Tracing" description="Origin and propagation tracking" status="active" />
                  <FeatureModule icon="⚡" title="Real-Time Alerts" description="Instant threat notifications" status="active" />
                </div>
              </ConsolePanel>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConsolePanel title="deepfake_detection.spec">
                <h3 className="text-xl font-bold text-white mb-4">Deepfake Detection Engine</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Multi-modal analysis across video, audio, and images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>99.7% detection accuracy on known deepfake techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Sub-100ms processing time per frame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Continuous model updates for emerging techniques</span>
                  </li>
                </ul>
              </ConsolePanel>

              <ConsolePanel title="voice_analysis.spec">
                <h3 className="text-xl font-bold text-white mb-4">Voice Clone Analyzer</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Spectral analysis of voice patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Real-time phone call protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Voice biometric verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Integration with call centers and VoIP systems</span>
                  </li>
                </ul>
              </ConsolePanel>

              <ConsolePanel title="quantum_security.spec">
                <h3 className="text-xl font-bold text-white mb-4">Quantum-Resistant Security</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Post-quantum cryptographic algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Future-proof against quantum computing threats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>NIST PQC standard compliant</span>
                  </li>
                </ul>
              </ConsolePanel>

              <ConsolePanel title="forensics.spec">
                <h3 className="text-xl font-bold text-white mb-4">Digital Forensics</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Court-admissible evidence reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Chain of custody documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#12F6C8]">→</span>
                    <span>Expert witness support</span>
                  </li>
                </ul>
              </ConsolePanel>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConsolePanel title="api_endpoints.json" className="lg:col-span-2">
                <pre className="text-sm text-gray-400 overflow-x-auto">
{`{
  "endpoints": {
    "analyze_video": "POST /api/v1/analyze/video",
    "analyze_audio": "POST /api/v1/analyze/audio",
    "analyze_image": "POST /api/v1/analyze/image",
    "realtime_stream": "WSS /api/v1/stream",
    "batch_process": "POST /api/v1/batch",
    "get_report": "GET /api/v1/reports/{id}"
  },
  "authentication": "Bearer Token (OAuth 2.0)",
  "rate_limits": {
    "standard": "1000 requests/hour",
    "enterprise": "unlimited"
  }
}`}
                </pre>
              </ConsolePanel>

              <ConsolePanel title="sdk_support.list">
                <h3 className="text-lg font-bold text-white mb-4">SDK Support</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Python', 'JavaScript', 'Java', 'Go', 'Ruby', 'C#'].map(lang => (
                    <div key={lang} className="p-3 bg-[#050505] rounded border border-[#12F6C8]/10 text-center">
                      <span className="text-[#12F6C8]">{lang}</span>
                    </div>
                  ))}
                </div>
              </ConsolePanel>

              <ConsolePanel title="deployment_options.list">
                <h3 className="text-lg font-bold text-white mb-4">Deployment Options</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Cloud SaaS', desc: 'Fully managed service' },
                    { name: 'On-Premise', desc: 'Air-gapped deployment' },
                    { name: 'Hybrid', desc: 'Mixed cloud/on-prem' },
                    { name: 'Edge', desc: 'Low-latency edge nodes' },
                  ].map(opt => (
                    <div key={opt.name} className="flex items-center justify-between p-3 bg-[#050505] rounded border border-[#12F6C8]/10">
                      <span className="text-white">{opt.name}</span>
                      <span className="text-gray-500 text-sm">{opt.desc}</span>
                    </div>
                  ))}
                </div>
              </ConsolePanel>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConsolePanel title="accuracy_metrics.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#12F6C8] mb-2">99.7%</div>
                  <div className="text-gray-500">Detection Accuracy</div>
                </div>
              </ConsolePanel>
              <ConsolePanel title="latency_metrics.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#12F6C8] mb-2">&lt;50ms</div>
                  <div className="text-gray-500">Average Latency</div>
                </div>
              </ConsolePanel>
              <ConsolePanel title="throughput_metrics.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#12F6C8] mb-2">10K+</div>
                  <div className="text-gray-500">Analyses/Second</div>
                </div>
              </ConsolePanel>
              <ConsolePanel title="false_positive.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2">0.03%</div>
                  <div className="text-gray-500">False Positive Rate</div>
                </div>
              </ConsolePanel>
              <ConsolePanel title="uptime.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#12F6C8] mb-2">99.99%</div>
                  <div className="text-gray-500">Uptime SLA</div>
                </div>
              </ConsolePanel>
              <ConsolePanel title="coverage.gauge">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#12F6C8] mb-2">150+</div>
                  <div className="text-gray-500">Deepfake Techniques</div>
                </div>
              </ConsolePanel>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Deploy GhostQuant AI?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all">
              Request Demo
            </Link>
            <Link href="/products.html" className="px-8 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
