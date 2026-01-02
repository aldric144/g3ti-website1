'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Animated counter component
function AnimatedCounter({ end, label, duration = 2000 }: { end: number; label: string; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <div className="intel-card p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-cyber-teal mb-2">{count.toLocaleString()}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

// Stats data
const liveStats = [
  { value: 847, label: 'Deepfake crimes today' },
  { value: 12453, label: 'AI fraud attempts (24h)' },
  { value: 3421, label: 'Synthetic IDs flagged monthly' },
  { value: 89234, label: 'OSINT signals detected globally' },
]

// Threat facts
const threatFacts = [
  ['Deception is now automated.', 'Identity is now weaponized.', 'Crime moves at machine speed.'],
  ['Every 11 seconds: digital extortion.', '3000% rise: deepfake voice attacks.', '72% of abuse escalation begins online.', 'AI-enabled trafficking networks multiplying.'],
  ['Legacy security cannot see these threats.', 'Legacy intelligence cannot predict them.', 'Human-speed response cannot stop them.'],
]

// Intelligence stats
const intelligenceStats = [
  { value: '$12.5B', label: 'lost to scams in 2023' },
  { value: '400%', label: 'increase in deepfake crimes' },
  { value: '$3.4B', label: 'in elder fraud losses' },
  { value: '82%', label: 'rise in online child targeting' },
  { value: '500%', label: 'Digital domestic violence increase' },
  { value: 'Exploding', label: 'AI-generated fraud worldwide' },
]

// Products
const products = [
  { name: 'GhostQuant AI™', href: '/products/ghostquant-ai' },
  { name: 'ID SHIELD™', href: '/products/id-shield' },
  { name: 'ScamFirewall360™', href: '/products/scamfirewall360' },
  { name: 'HeartGuard AI™', href: '/products/heartguard-ai' },
  { name: 'HomelandWatch7™', href: '/products/homelandwatch7' },
]

// Capabilities
const capabilities = [
  '• Synthetic identity detection before a crime begins',
  '• Voice-clone and deepfake separation in milliseconds',
  '• Neural behavior modeling that uncovers intention, not just activity',
  '• AI-generated manipulation forensics across voice, text, and image',
  '• Domestic-violence escalation prediction powered by behavioral vectors',
  '• Cross-platform fraud ring mapping connecting global threat actors',
  '• Rapid OSINT fusion across millions of data points per second',
  '• Government-grade identity integrity systems that expose the unseen',
]

// Architecture components
const architectureComponents = [
  'AI/ML predictive intelligence',
  'Emotional-pattern forensics',
  'Digital deception signatures',
  'Neural network threat modeling',
  'National-security-grade OSINT scanning',
  'Identity-protection ecosystems',
  'Autonomous anomaly detection',
  'Patent-ready cyber defense technologies',
]

// G3TI Difference points
const differencePoints = [
  '• Detect deception patterns',
  '• Predict emerging threats',
  '• Neutralize scams and fraud',
  '• Protect identities & families',
  '• Strengthen law enforcement',
  '• Support national security',
]

const systemsFusion = [
  '• AI/ML predictive intelligence',
  '• Behavioral deception analysis',
  '• Digital forensics',
  '• OSINT threat pipelines',
  '• Identity-integrity models',
  '• Government-grade security frameworks',
  '• Invention-level engineering',
]

export default function HomePage() {
  return (
    <div className="neural-grid">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-neural-dark via-neural-dark to-transparent" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Global 3 Technology &<br />Intelligence™
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-cyber-teal font-medium mb-8"
          >
            Human Protection. AI Precision. National Impact.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              Explore Intelligence
            </Link>
          </motion.div>

          {/* Live Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {liveStats.map((stat, index) => (
              <AnimatedCounter key={index} end={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>

        {/* Threat Facts Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="relative">
            <Image
              src="/g3ti/world-map-threat.jpg"
              alt="Global Threat Map"
              width={600}
              height={400}
              className="rounded-lg opacity-80"
              priority
            />
          </div>
          <div className="space-y-4">
            {threatFacts.map((group, groupIndex) => (
              <div key={groupIndex} className="intel-card p-6 rounded-lg">
                {group.map((fact, factIndex) => (
                  <p key={factIndex} className="text-gray-300 mb-1">{fact}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Divider */}
      <div className="cyber-divider" />

      {/* Mission Statement Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="classified-header text-center mb-4">CLASSIFIED BRIEFING</h2>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            GLOBAL 3 TECHNOLOGY & INTELLIGENCE™
          </h2>
          <p className="text-xl text-cyber-teal text-center mb-8">
            A new class of autonomous protective intelligence.
          </p>
          
          <div className="space-y-6 text-gray-300">
            <p>
              G3TI stands at the front line of the world&apos;s fastest-evolving threat landscape, where deception is now automated, identity is weaponized, and crime moves at machine speed.
            </p>
            <p>
              Every 11 seconds, a new digital extortion attempt is launched. More than 50% of all global fraud now contains an AI-generated element. Deepfake voice attacks have increased 3,000% since 2022, and synthetic-identity crime has quietly become the fastest-growing form of financial fraud in the United States. Domestic-violence escalations now begin online 72% of the time, and human-trafficking networks increasingly use AI to hide, recruit, and evade detection.
            </p>
            <p>
              Traditional security systems cannot see these threats. Traditional intelligence systems cannot predict them. Traditional law enforcement cannot respond fast enough.
            </p>
            <p className="text-white font-semibold">
              G3TI was built for the world that exists now — not the world legacy security systems were designed for.
            </p>
            <p className="text-cyber-teal font-semibold text-xl">
              Human protection is no longer a human-speed problem.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-gray-300 mb-6">G3TI develops autonomous intelligence architectures engineered for:</p>
            <ul className="space-y-2">
              {capabilities.map((cap, index) => (
                <li key={index} className="text-gray-400">{cap}</li>
              ))}
            </ul>
          </div>

          <div className="mt-12 space-y-6 text-gray-300">
            <p>
              These are not traditional cybersecurity tools. These are autonomous intelligence organisms that analyze, adapt, and counter-maneuver—without waiting for a human to act.
            </p>
            
            <div className="intel-card p-6 rounded-lg">
              <p className="text-cyber-teal font-semibold mb-4">🔍 A Sovereign Intelligence Engine Built for the AI Threat Era</p>
              <p className="mb-4">G3TI&apos;s internal architecture blends:</p>
              <ul className="space-y-1">
                {architectureComponents.map((comp, index) => (
                  <li key={index} className="text-gray-400">{comp}</li>
                ))}
              </ul>
            </div>

            <p>
              This fusion allows G3TI to detect threats before they manifest, not after the damage is done.
            </p>
            <p>
              When criminals evolve, our systems evolve faster. When deception becomes algorithmic, our detection becomes anticipatory. When bad actors hide behind machines, our intelligence sees through them.
            </p>
            <p className="text-white font-semibold">
              We are not a software company. We are a defensive intelligence organism.
            </p>
            <p>
              G3TI does not sell apps. G3TI does not follow industry cycles. G3TI does not rely on yesterday&apos;s threat models.
            </p>
            <p className="text-cyber-teal font-semibold">We invent new ones.</p>
            <p>
              Because the dangers facing the world are not incremental — they are exponential.
            </p>
            <p>
              And humanity deserves technology capable of confronting them.
            </p>
            <p className="text-white font-semibold">
              We are not reacting to the AI revolution. We are redefining it for human protection.
            </p>
          </div>
        </div>
      </section>

      {/* Cyber Divider */}
      <div className="cyber-divider" />

      {/* Intelligence Stats Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            THE NEW CLASS OF INTELLIGENCE
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {intelligenceStats.map((stat, index) => (
              <div key={index} className="intel-card p-6 rounded-lg text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyber-teal mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg">Fear is being industrialized. Deception automated.</p>
            <p className="text-cyber-teal font-semibold text-xl mt-2">Protection has not kept up—until now.</p>
          </div>
        </div>
      </section>

      {/* G3TI Difference Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            THE G3TI DIFFERENCE
          </h2>
          
          <p className="text-gray-300 mb-6">We build patentable protective-intelligence ecosystems designed to:</p>
          <ul className="space-y-2 mb-8">
            {differencePoints.map((point, index) => (
              <li key={index} className="text-gray-400">{point}</li>
            ))}
          </ul>

          <p className="text-gray-300 mb-4">Our systems fuse:</p>
          <ul className="space-y-2">
            {systemsFusion.map((item, index) => (
              <li key={index} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <p className="text-cyber-teal font-semibold text-xl mt-8 text-center">
            We are not chasing the AI revolution. We are redefining it for human protection.
          </p>
        </div>
      </section>

      {/* Veteran-Led Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            VETERAN-LED. MISSION-DRIVEN.
          </h2>
          <p className="text-gray-300 text-lg">
            Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.
          </p>
        </div>
      </section>

      {/* Confidential Systems Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            CONFIDENTIAL SYSTEMS
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Full capabilities are proprietary and under active development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Link 
                key={index}
                href={product.href}
                className="intel-card p-6 rounded-lg hover:border-cyber-teal transition-all group"
              >
                <h3 className="text-xl font-bold text-white group-hover:text-cyber-teal transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-cyber-teal text-sm mb-2">Names Only</p>
                <p className="text-gray-500 text-sm">
                  Full capabilities are proprietary and under active development.
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/products"
              className="text-cyber-teal hover:text-cyber-teal-dark transition-colors font-semibold"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Government Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Government & Law Enforcement
            </h2>
            <p className="text-gray-300 mb-6">
              Mission-critical intelligence solutions for federal, state, and local law enforcement agencies. Our DHS-ready platforms integrate seamlessly with existing infrastructure to enhance national security and protect communities.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-400">▸ DHS-ready features and FedRAMP compliance</li>
              <li className="text-gray-400">▸ Border intelligence and threat tracking</li>
              <li className="text-gray-400">▸ Real-time threat mapping and analysis</li>
              <li className="text-gray-400">▸ Fusion center integration</li>
            </ul>
            <Link 
              href="/government"
              className="text-cyber-teal hover:text-cyber-teal-dark transition-colors font-semibold"
            >
              Learn More →
            </Link>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src="/g3ti/close-up-of-detective-holding-suspect-person.jpg"
              alt="Law Enforcement"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-lg overflow-hidden order-2 md:order-1">
            <Image
              src="/g3ti/portrait-teamwork-and-success-with-a-female.jpg"
              alt="Enterprise Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Enterprise Solutions
            </h2>
            <p className="text-gray-300 mb-6">
              Enterprise-grade security and intelligence solutions protecting organizations across industries. From financial institutions to healthcare providers, our AI-powered platforms safeguard your operations and customers.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-gray-400">▸ Financial institutions fraud detection</li>
              <li className="text-gray-400">▸ Healthcare data protection and compliance</li>
              <li className="text-gray-400">▸ Educational institution safety solutions</li>
              <li className="text-gray-400">▸ Corporate cyber defense and threat prevention</li>
            </ul>
            <Link 
              href="/enterprise"
              className="text-cyber-teal hover:text-cyber-teal-dark transition-colors font-semibold"
            >
              Explore Solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="classified-header mb-4">CALL TO ACTION</h2>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            We protect what the world isn&apos;t prepared for.
          </h2>
          <p className="text-cyber-teal text-xl mb-8">Join the future of intelligence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
