'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState('0')
  
  useEffect(() => {
    const numValue = parseInt(value.replace(/,/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numValue / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setDisplayed(value)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(current).toLocaleString())
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <div className="bg-[#0D0D0F]/80 backdrop-blur-sm border border-[#12F6C8]/30 rounded-lg p-6 text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#12F6C8] mb-2">{displayed}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background with world map */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/g3ti/hacker-world-map.jpg)' }}
        />
        
        {/* Animated intro line */}
        {!showContent && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 bg-[#12F6C8] intro-line" />
          </div>
        )}
        
        {showContent && (
          <>
            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Global 3 Technology &amp;<br />Intelligence™
              </h1>
              <p className="text-xl md:text-2xl text-[#12F6C8] font-semibold mb-8">
                Human Protection. AI Precision. National Impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  href="/products"
                  className="px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300"
                >
                  Explore Intelligence
                </Link>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 fade-in" style={{ animationDelay: '0.3s' }}>
              <AnimatedStat value="847" label="Deepfake crimes today" />
              <AnimatedStat value="12,453" label="AI fraud attempts (24h)" />
              <AnimatedStat value="3,421" label="Synthetic IDs flagged monthly" />
              <AnimatedStat value="89,234" label="OSINT signals detected globally" />
            </div>
            
            {/* Threat Briefing Section */}
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 fade-in" style={{ animationDelay: '0.6s' }}>
              {/* World Map Visualization */}
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img 
                  src="/g3ti/hacker-world-map.jpg" 
                  alt="Global threat visualization"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Threat Cards */}
              <div className="space-y-4">
                <div className="bg-[#0D0D0F]/90 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                  <p className="text-gray-300">Deception is now automated.</p>
                  <p className="text-gray-300">Identity is now weaponized.</p>
                  <p className="text-gray-300">Crime moves at machine speed.</p>
                </div>
                <div className="bg-[#0D0D0F]/90 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                  <p className="text-gray-300">Every 11 seconds: digital extortion.</p>
                  <p className="text-gray-300">3000% rise: deepfake voice attacks.</p>
                  <p className="text-gray-300">72% of abuse escalation begins online.</p>
                  <p className="text-gray-300">AI-enabled trafficking networks multiplying.</p>
                </div>
                <div className="bg-[#0D0D0F]/90 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                  <p className="text-gray-300">Legacy security cannot see these threats.</p>
                  <p className="text-gray-300">Legacy intelligence cannot predict them.</p>
                  <p className="text-gray-300">Human-speed response cannot stop them.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      
      {/* G3TI Introduction Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#12F6C8] mb-8 text-center">GLOBAL 3 TECHNOLOGY &amp; INTELLIGENCE™</h2>
          <p className="text-xl text-gray-300 mb-8 text-center">A new class of autonomous protective intelligence.</p>
          
          <div className="space-y-6 text-gray-400">
            <p>G3TI stands at the front line of the world&apos;s fastest-evolving threat landscape, where deception is now automated, identity is weaponized, and crime moves at machine speed.</p>
            <p>Every 11 seconds, a new digital extortion attempt is launched. More than 50% of all global fraud now contains an AI-generated element. Deepfake voice attacks have increased 3,000% since 2022, and synthetic-identity crime has quietly become the fastest-growing form of financial fraud in the United States. Domestic-violence escalations now begin online 72% of the time, and human-trafficking networks increasingly use AI to hide, recruit, and evade detection.</p>
            <p>Traditional security systems cannot see these threats. Traditional intelligence systems cannot predict them. Traditional law enforcement cannot respond fast enough.</p>
            <p className="text-white font-semibold">G3TI was built for the world that exists now — not the world legacy security systems were designed for.</p>
            <p className="text-[#12F6C8] font-semibold text-xl">Human protection is no longer a human-speed problem.</p>
          </div>
          
          <div className="mt-12">
            <p className="text-white mb-4">G3TI develops autonomous intelligence architectures engineered for:</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Synthetic identity detection before a crime begins</li>
              <li>• Voice-clone and deepfake separation in milliseconds</li>
              <li>• Neural behavior modeling that uncovers intention, not just activity</li>
              <li>• AI-generated manipulation forensics across voice, text, and image</li>
              <li>• Domestic-violence escalation prediction powered by behavioral vectors</li>
              <li>• Cross-platform fraud ring mapping connecting global threat actors</li>
              <li>• Rapid OSINT fusion across millions of data points per second</li>
              <li>• Government-grade identity integrity systems that expose the unseen</li>
            </ul>
          </div>
          
          <p className="mt-8 text-gray-400">These are not traditional cybersecurity tools. These are autonomous intelligence organisms that analyze, adapt, and counter-maneuver—without waiting for a human to act.</p>
        </div>
      </section>
      
      {/* Sovereign Intelligence Engine Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#12F6C8] mb-8">🔍 A Sovereign Intelligence Engine Built for the AI Threat Era</h2>
          
          <p className="text-gray-400 mb-6">G3TI&apos;s internal architecture blends:</p>
          <ul className="space-y-2 text-gray-400 mb-8">
            <li>• AI/ML predictive intelligence</li>
            <li>• Emotional-pattern forensics</li>
            <li>• Digital deception signatures</li>
            <li>• Neural network threat modeling</li>
            <li>• National-security-grade OSINT scanning</li>
            <li>• Identity-protection ecosystems</li>
            <li>• Autonomous anomaly detection</li>
            <li>• Patent-ready cyber defense technologies</li>
          </ul>
          
          <p className="text-gray-400 mb-6">This fusion allows G3TI to detect threats before they manifest, not after the damage is done.</p>
          
          <div className="space-y-4 text-gray-300">
            <p>When criminals evolve, our systems evolve faster.</p>
            <p>When deception becomes algorithmic, our detection becomes anticipatory.</p>
            <p>When bad actors hide behind machines, our intelligence sees through them.</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="text-white font-semibold">We are not a software company. We are a defensive intelligence organism.</p>
            <p className="text-gray-400">G3TI does not sell apps. G3TI does not follow industry cycles. G3TI does not rely on yesterday&apos;s threat models.</p>
            <p className="text-[#12F6C8] font-semibold">We invent new ones.</p>
            <p className="text-gray-400">Because the dangers facing the world are not incremental — they are exponential.</p>
            <p className="text-gray-400">And humanity deserves technology capable of confronting them.</p>
            <p className="text-white font-semibold mt-8">We are not reacting to the AI revolution. We are redefining it for human protection.</p>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">THE NEW CLASS OF INTELLIGENCE</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">$12.5B</div>
              <div className="text-sm text-gray-400">lost to scams in 2023</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">400%</div>
              <div className="text-sm text-gray-400">increase in deepfake crimes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">$3.4B</div>
              <div className="text-sm text-gray-400">in elder fraud losses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">82%</div>
              <div className="text-sm text-gray-400">rise in online child targeting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">500%</div>
              <div className="text-sm text-gray-400">Digital domestic violence increase</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#12F6C8]">Exploding</div>
              <div className="text-sm text-gray-400">AI-generated fraud worldwide</div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">Fear is being industrialized. Deception automated.</p>
          <p className="text-center text-white font-semibold">Protection has not kept up—until now.</p>
        </div>
      </section>
      
      {/* G3TI Difference Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">THE G3TI DIFFERENCE</h2>
          <p className="text-gray-400 mb-6">We build patentable protective-intelligence ecosystems designed to:</p>
          <ul className="space-y-2 text-gray-400 mb-8">
            <li>• Detect deception patterns</li>
            <li>• Predict emerging threats</li>
            <li>• Neutralize scams and fraud</li>
            <li>• Protect identities &amp; families</li>
            <li>• Strengthen law enforcement</li>
            <li>• Support national security</li>
          </ul>
          
          <p className="text-gray-400 mb-4">Our systems fuse:</p>
          <ul className="space-y-2 text-gray-400">
            <li>• AI/ML predictive intelligence</li>
            <li>• Behavioral deception analysis</li>
            <li>• Digital forensics</li>
            <li>• OSINT threat pipelines</li>
            <li>• Identity-integrity models</li>
            <li>• Government-grade security frameworks</li>
            <li>• Invention-level engineering</li>
          </ul>
          
          <p className="text-white font-semibold mt-8 text-center">We are not chasing the AI revolution. We are redefining it for human protection.</p>
        </div>
      </section>
      
      {/* Veteran-Led Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">VETERAN-LED. MISSION-DRIVEN.</h2>
          <p className="text-gray-400 text-lg">Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.</p>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">CONFIDENTIAL SYSTEMS</h2>
          <p className="text-gray-400 text-center mb-12">Full capabilities are proprietary and under active development.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'GhostQuant AI™', href: '/products/ghostquant-ai' },
              { name: 'ID SHIELD™', href: '/products/id-shield' },
              { name: 'ScamFirewall360™', href: '/products/scamfirewall360' },
              { name: 'HeartGuard AI™', href: '/products/heartguard-ai' },
              { name: 'HomelandWatch7™', href: '/products/homelandwatch7' },
            ].map((product) => (
              <Link 
                key={product.name}
                href={product.href}
                className="group bg-[#0D0D0F] p-8 rounded-xl border border-gray-800 hover:border-[#12F6C8] transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#12F6C8] transition-colors">{product.name}</h3>
                <p className="text-sm text-[#0B85E5] mb-3">Names Only</p>
                <p className="text-gray-400 text-sm">Full capabilities are proprietary and under active development.</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Government Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Government &amp; Law Enforcement</h2>
              <p className="text-gray-400 mb-6">Mission-critical intelligence solutions for federal, state, and local law enforcement agencies. Our DHS-ready platforms integrate seamlessly with existing infrastructure to enhance national security and protect communities.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>DHS-ready features and FedRAMP compliance</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Border intelligence and threat tracking</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Real-time threat mapping and analysis</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Fusion center integration</li>
              </ul>
              <Link href="/government" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden h-96">
              <img src="/g3ti/detective.jpg" alt="Law enforcement intelligence" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Enterprise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden h-96">
              <img src="/g3ti/teamwork.jpg" alt="Enterprise teamwork" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Enterprise Solutions</h2>
              <p className="text-gray-400 mb-6">Enterprise-grade security and intelligence solutions protecting organizations across industries. From financial institutions to healthcare providers, our AI-powered platforms safeguard your operations and customers.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Financial institutions fraud detection</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Healthcare data protection and compliance</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Educational institution safety solutions</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Corporate cyber defense and threat prevention</li>
              </ul>
              <Link href="/enterprise" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">CALL TO ACTION</h2>
          <p className="text-xl text-gray-400 mb-4">We protect what the world isn&apos;t prepared for.</p>
          <p className="text-lg text-white font-semibold mb-8">Join the future of intelligence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </Link>
            <Link href="/about" className="px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
