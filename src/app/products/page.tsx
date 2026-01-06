'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

// Level 13 Tactical Glyph SVG Components
function TacticalGlyph({ type, color }: { type: string; color: string }) {
  const glyphs: Record<string, JSX.Element> = {
    quantum: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="32" r="20" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="32" cy="32" r="4" fill={color} />
        <path d="M32 8v8M32 48v8M8 32h8M48 32h8" strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M32 6L8 16v16c0 14 10 22 24 28 14-6 24-14 24-28V16L32 6z" />
        <circle cx="32" cy="32" r="6" fill={color} fillOpacity="0.3" />
        <path d="M28 32l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    firewall: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="8" y="20" width="48" height="28" rx="2" />
        <path d="M8 28h48M8 36h48M8 44h48" strokeOpacity="0.5" />
        <circle cx="32" cy="32" r="8" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    guardian: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="20" r="10" />
        <path d="M16 54c0-12 7-18 16-18s16 6 16 18" />
        <circle cx="32" cy="54" r="6" strokeDasharray="2 2" />
      </svg>
    ),
    homeland: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M32 8L8 24v28l24 8 24-8V24L32 8z" />
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="3" fill={color} />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="32" r="24" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="16" />
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="3" fill={color} />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="32" r="24" />
        <ellipse cx="32" cy="32" rx="10" ry="24" />
        <path d="M8 32h48M12 20h40M12 44h40" strokeOpacity="0.5" />
      </svg>
    ),
    infrastructure: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="8" y="40" width="12" height="16" />
        <rect x="26" y="32" width="12" height="24" />
        <rect x="44" y="36" width="12" height="20" />
        <path d="M14 40V28l18-12 18 12v8" strokeLinejoin="round" />
      </svg>
    ),
    patrol: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M32 8l20 12v20L32 56 12 40V20L32 8z" />
        <circle cx="32" cy="32" r="6" fill={color} fillOpacity="0.2" />
      </svg>
    ),
    monitor: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="8" y="12" width="48" height="32" rx="2" />
        <path d="M24 52h16M32 44v8" strokeLinecap="round" />
        <circle cx="44" cy="28" r="8" strokeDasharray="2 2" />
      </svg>
    ),
    vault: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="12" y="16" width="40" height="36" rx="4" />
        <circle cx="32" cy="34" r="10" />
        <circle cx="32" cy="34" r="4" fill={color} fillOpacity="0.3" />
      </svg>
    ),
    matrix: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="8" y="8" width="48" height="48" rx="2" />
        <path d="M8 20h48M8 32h48M8 44h48" strokeOpacity="0.3" />
        <path d="M20 8v48M32 8v48M44 8v48" strokeOpacity="0.3" />
        <circle cx="32" cy="32" r="4" fill={color} />
      </svg>
    ),
    elder: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="18" r="10" />
        <path d="M20 54c0-10 5-16 12-16s12 6 12 16" />
        <path d="M16 32l-4 22M48 32l4 22" strokeLinecap="round" />
      </svg>
    ),
    child: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="32" cy="20" r="12" />
        <path d="M20 56c0-12 5-18 12-18s12 6 12 18" />
        <circle cx="28" cy="18" r="2" fill={color} />
        <circle cx="36" cy="18" r="2" fill={color} />
      </svg>
    ),
  }
  return <div className="w-10 h-10">{glyphs[type] || glyphs.shield}</div>
}

// HUD Scanning Overlay
function ScanningOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[#12F6C8]/40">SYS.SCAN.ACTIVE</div>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-[#12F6C8]/40 animate-pulse">[LEVEL 13 CLEARANCE]</div>
    </div>
  )
}

function ProductCard({ name, tagline, glyphType, description, features, href, color, classification }: { 
  name: string; 
  tagline: string; 
  glyphType: string; 
  description: string; 
  features: string[]; 
  href: string;
  color: string;
  classification: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <Link href={href}>
      <div 
        ref={cardRef}
        className="p-6 bg-[#0D0D0F] rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          borderColor: isHovered ? color : 'rgba(18, 246, 200, 0.1)',
          boxShadow: isHovered ? `0 10px 40px ${color}20` : undefined
        }}
      >
        {/* HUD Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: color }} />
        
        {/* Classification Badge */}
        <div className="absolute top-3 right-6 text-[8px] font-mono tracking-widest opacity-50" style={{ color }}>{classification}</div>
        
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
            <TacticalGlyph type={glyphType} color={color} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
            <p className="text-xs font-mono tracking-wider uppercase" style={{ color }}>{tagline}</p>
          </div>
        </div>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span key={i} className="text-[10px] px-2 py-1 rounded font-mono tracking-wider uppercase border" style={{ borderColor: `${color}30`, color }}>
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#12F6C8]/10 flex items-center justify-between">
          <span className="text-gray-500 text-xs font-mono tracking-wider">ACCESS CONSOLE</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform" style={{ color }}>→</span>
        </div>
      </div>
    </Link>
  )
}

function ProductCategory({ title, subtitle, description, products }: { 
  title: string;
  subtitle: string;
  description: string; 
  products: Array<{ name: string; tagline: string; glyphType: string; description: string; features: string[]; href: string; color: string; classification: string }> 
}) {
  return (
    <div className="mb-16 relative">
      <div className="mb-8">
        <div className="text-[10px] font-mono text-[#12F6C8]/60 tracking-[0.3em] mb-2">{subtitle}</div>
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  )
}

function ProductStats() {
  const stats = [
    { value: '14', label: 'AUTONOMOUS SYSTEMS', sublabel: 'Active Deployment' },
    { value: '847K+', label: 'THREATS NEUTRALIZED', sublabel: 'Last 30 Days' },
    { value: '99.97%', label: 'OPERATIONAL UPTIME', sublabel: 'System Integrity' },
    { value: '24/7/365', label: 'CONTINUOUS MONITORING', sublabel: 'Global Coverage' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 bg-[#050505] rounded-xl text-center relative overflow-hidden border border-[#12F6C8]/5 hover:border-[#12F6C8]/20 transition-colors">
          <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-[#12F6C8]/30" />
          <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-[#12F6C8]/30" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-[#12F6C8]/30" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-[#12F6C8]/30" />
          <div className="text-3xl font-bold text-[#12F6C8] font-mono">{stat.value}</div>
          <div className="text-[10px] font-mono text-gray-400 tracking-wider mt-1">{stat.label}</div>
          <div className="text-[8px] font-mono text-gray-600 tracking-wider">{stat.sublabel}</div>
        </div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  // SECURITY & ENCRYPTION DIVISION
  const securityProducts = [
    {
      name: 'GhostQuant AI',
      tagline: 'Quantum-Resistant Encryption Engine',
      glyphType: 'quantum',
      description: 'Post-quantum cryptographic defense system utilizing lattice-based algorithms and zero-knowledge proof architecture. Designed for classified communications requiring immunity to quantum decryption attacks.',
      features: ['CRYSTALS-Kyber', 'Zero-Knowledge', 'NSA Suite B'],
      href: '/products/ghostquant-ai.html',
      color: '#12F6C8',
      classification: 'TS//SCI',
    },
    {
      name: 'ID SHIELD',
      tagline: 'Identity Fortress Protocol',
      glyphType: 'shield',
      description: 'Autonomous identity protection matrix providing continuous dark web surveillance, synthetic identity detection, and real-time credential breach response across federal and civilian networks.',
      features: ['Dark Web SIGINT', 'Biometric Lock', 'Breach Response'],
      href: '/products/id-shield.html',
      color: '#0B85E5',
      classification: 'SECRET',
    },
    {
      name: 'ScamFirewall360',
      tagline: 'Adversarial Deception Countermeasures',
      glyphType: 'firewall',
      description: 'Multi-vector fraud interdiction system employing behavioral AI to detect, classify, and neutralize social engineering attacks, phishing campaigns, and financial deception operations.',
      features: ['Behavioral AI', 'Multi-Vector', 'Real-Time Block'],
      href: '/products/scamfirewall360.html',
      color: '#F59E0B',
      classification: 'FOUO',
    },
  ]

  // PROTECTION & INTELLIGENCE DIVISION
  const protectionProducts = [
    {
      name: 'HeartGuard AI',
      tagline: 'Protective Intelligence Network',
      glyphType: 'guardian',
      description: 'Autonomous protective intelligence system providing continuous threat assessment for high-value individuals. Monitors digital footprints, detects predatory behavior patterns, and initiates protective countermeasures.',
      features: ['Threat Assessment', 'Predator Detection', 'Safe Zone Mapping'],
      href: '/products/heartguard-ai.html',
      color: '#EF4444',
      classification: 'SENSITIVE',
    },
    {
      name: 'HomelandWatch7',
      tagline: 'National Security Intelligence Fusion',
      glyphType: 'homeland',
      description: 'Multi-INT fusion platform integrating SIGINT, HUMINT, GEOINT, and OSINT streams for comprehensive threat landscape analysis. Deployed across federal agencies for national security operations.',
      features: ['Multi-INT Fusion', 'Threat Mapping', 'CJIS Compliant'],
      href: '/products/homelandwatch7.html',
      color: '#8B5CF6',
      classification: 'TS//SCI',
    },
  ]

  // GOVERNMENT / NATIONAL SECURITY DIVISION
  const governmentProducts = [
    {
      name: 'CounterAI Sentinel',
      tagline: 'Autonomous Threat Counterintelligence',
      glyphType: 'target',
      description: 'Adversarial AI detection and neutralization platform. Autonomously identifies AI-generated threats, deepfake operations, and synthetic media campaigns targeting government infrastructure.',
      features: ['Deepfake Detection', 'AI Threat Hunting', 'Zero-Day Response'],
      href: '#',
      color: '#DC2626',
      classification: 'TS//SCI//NOFORN',
    },
    {
      name: 'OSINT Recon360',
      tagline: 'Open-Source Intelligence Fusion Grid',
      glyphType: 'globe',
      description: 'Global OSINT aggregation and analysis platform processing millions of data points from public sources. Provides geospatial intelligence, pattern recognition, and predictive threat modeling.',
      features: ['Global OSINT', 'Pattern Analysis', 'Predictive Intel'],
      href: '#',
      color: '#2563EB',
      classification: 'SECRET//REL',
    },
    {
      name: 'InfraGuard Nexus',
      tagline: 'Critical Infrastructure Protection AI',
      glyphType: 'infrastructure',
      description: 'Autonomous protection system for critical infrastructure including power grids, water systems, and transportation networks. Monitors SCADA/ICS systems for anomalies and cyber-physical threats.',
      features: ['SCADA/ICS', 'Grid Defense', 'Resilience AI'],
      href: '#',
      color: '#7C3AED',
      classification: 'TS//SCI',
    },
    {
      name: 'BlueShield Patrol AI',
      tagline: 'Law Enforcement Tactical Intelligence',
      glyphType: 'patrol',
      description: 'Real-time tactical intelligence platform for law enforcement operations. Provides situational awareness, threat assessment, and officer safety protocols through autonomous AI analysis.',
      features: ['Tactical Intel', 'Officer Safety', 'Predictive Patrol'],
      href: '#',
      color: '#1D4ED8',
      classification: 'LES',
    },
  ]

  // ENTERPRISE SECURITY DIVISION
  const enterpriseProducts = [
    {
      name: 'CyberTrace Monitor',
      tagline: 'Enterprise Intrusion Detection Matrix',
      glyphType: 'monitor',
      description: 'Enterprise-grade network defense system providing continuous traffic analysis, anomaly detection, and automated incident response. Integrates with SOC operations for unified threat management.',
      features: ['Network Defense', 'Anomaly AI', 'SOC Integration'],
      href: '#',
      color: '#059669',
      classification: 'PROPRIETARY',
    },
    {
      name: 'VaultLock Quantum',
      tagline: 'Post-Quantum Data Fortress',
      glyphType: 'vault',
      description: 'Quantum-resistant data protection vault utilizing hybrid cryptographic architecture. Provides military-grade encryption for enterprise data at rest and in transit against future quantum threats.',
      features: ['Quantum-Safe', 'Hybrid Crypto', 'Data Fortress'],
      href: '#',
      color: '#4F46E5',
      classification: 'CONFIDENTIAL',
    },
    {
      name: 'FraudMatrix Enterprise',
      tagline: 'Behavioral Fraud Intelligence Engine',
      glyphType: 'matrix',
      description: 'Advanced fraud detection platform utilizing behavioral biometrics and transaction pattern analysis. Identifies sophisticated fraud schemes through machine learning and anomaly correlation.',
      features: ['Behavioral AI', 'Pattern Matrix', 'Risk Scoring'],
      href: '#',
      color: '#CA8A04',
      classification: 'PROPRIETARY',
    },
  ]

  // PROTECTIVE SERVICES DIVISION
  const protectiveServicesProducts = [
    {
      name: 'ElderGuard AI',
      tagline: 'Senior Protection Intelligence',
      glyphType: 'elder',
      description: 'Specialized protective intelligence system designed to detect and prevent exploitation of vulnerable populations. Monitors financial transactions, communication patterns, and social engineering attempts.',
      features: ['Exploitation Defense', 'Financial Guard', 'Alert Network'],
      href: '#',
      color: '#9333EA',
      classification: 'SENSITIVE',
    },
    {
      name: 'ChildShield Vision',
      tagline: 'Minor Protection Surveillance System',
      glyphType: 'child',
      description: 'Advanced protective surveillance system for minor safety. Detects predatory behavior patterns, inappropriate content exposure, and cyberbullying through behavioral AI analysis.',
      features: ['Predator Detection', 'Content Shield', 'Behavioral AI'],
      href: '#',
      color: '#EC4899',
      classification: 'SENSITIVE',
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] relative">
      <ScanningOverlay />
      
      {/* Hero */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#12F6C8]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-[#12F6C8]/10 via-[#0B85E5]/10 to-[#12F6C8]/10 rounded-full blur-3xl opacity-30" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#12F6C8 1px, transparent 1px), linear-gradient(90deg, #12F6C8 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-[10px] font-mono tracking-[0.3em]">LEVEL 13 // AUTONOMOUS INTELLIGENCE ARSENAL</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">AUTONOMOUS</span><br />
            <span className="text-[#12F6C8]">INTELLIGENCE SYSTEMS</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Fourteen autonomous AI systems engineered for national security, critical infrastructure protection, 
            and enterprise defense. Each system operates as an independent intelligence node within the G3TI 
            command architecture.
          </p>
          <p className="text-[#12F6C8]/60 text-sm font-mono tracking-wider">
            &quot;We don&apos;t make technology — we make technology intelligent.&quot;
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-[#0D0D0F] border-y border-[#12F6C8]/10">
        <div className="max-w-7xl mx-auto">
          <ProductStats />
        </div>
      </section>

      {/* Security Products */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Security & Encryption Division"
            subtitle="DIVISION // SEC-CRYPT"
            description="Quantum-resistant encryption and identity protection systems for classified operations"
            products={securityProducts}
          />
        </div>
      </section>

      {/* Protection Products */}
      <section className="py-16 px-4 bg-[#0D0D0F] relative">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Protection & Intelligence Division"
            subtitle="DIVISION // PROT-INT"
            description="Autonomous protective intelligence for high-value assets and national security operations"
            products={protectionProducts}
          />
        </div>
      </section>

      {/* Government / National Security Products */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Government & National Security Division"
            subtitle="DIVISION // GOV-NATSEC"
            description="Mission-critical intelligence systems for federal agencies and law enforcement operations"
            products={governmentProducts}
          />
        </div>
      </section>

      {/* Enterprise Security Products */}
      <section className="py-16 px-4 bg-[#0D0D0F] relative">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Enterprise Security Division"
            subtitle="DIVISION // ENT-SEC"
            description="Enterprise-grade autonomous defense systems for critical business operations"
            products={enterpriseProducts}
          />
        </div>
      </section>

      {/* Protective Services Products */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <ProductCategory
            title="Protective Services Division"
            subtitle="DIVISION // PROT-SVC"
            description="Specialized protective intelligence for vulnerable population defense"
            products={protectiveServicesProducts}
          />
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#12F6C8]/20">
                  <th className="text-left p-4 text-gray-400">Feature</th>
                  <th className="p-4 text-[#12F6C8]">GhostQuant</th>
                  <th className="p-4 text-[#0B85E5]">ID SHIELD</th>
                  <th className="p-4 text-[#F59E0B]">ScamFirewall</th>
                  <th className="p-4 text-[#EF4444]">HeartGuard</th>
                  <th className="p-4 text-[#8B5CF6]">HomelandWatch</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'AI-Powered', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'Real-Time Monitoring', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'Encryption', values: ['✓', '✓', '○', '○', '✓'] },
                  { feature: 'Identity Protection', values: ['○', '✓', '✓', '○', '○'] },
                  { feature: 'Family Features', values: ['○', '✓', '○', '✓', '○'] },
                  { feature: 'Government Ready', values: ['✓', '○', '○', '○', '✓'] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#12F6C8]/10">
                    <td className="p-4 text-white">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className={`p-4 text-center ${val === '✓' ? 'text-green-400' : 'text-gray-600'}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#12F6C8]/5 to-[#0B85E5]/5 border-y border-[#12F6C8]/20 relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#12F6C8 1px, transparent 1px), linear-gradient(90deg, #12F6C8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-[10px] font-mono text-[#12F6C8]/60 tracking-[0.3em] mb-4">INITIATE CONTACT PROTOCOL</div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">Request Intelligence Briefing</h2>
          <p className="text-gray-500 mb-8 text-sm">Authorized personnel may request detailed capability briefings and deployment assessments.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact.html" className="px-8 py-4 bg-[#12F6C8] text-black font-bold rounded hover:bg-[#12F6C8]/90 transition-all font-mono text-sm tracking-wider">
              REQUEST BRIEFING
            </Link>
            <Link href="/government.html" className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded hover:bg-[#12F6C8]/10 transition-all font-mono text-sm tracking-wider">
              GOVERNMENT OPS
            </Link>
            <Link href="/enterprise.html" className="px-8 py-4 border border-[#0B85E5]/50 text-[#0B85E5] rounded hover:bg-[#0B85E5]/10 transition-all font-mono text-sm tracking-wider">
              ENTERPRISE OPS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
