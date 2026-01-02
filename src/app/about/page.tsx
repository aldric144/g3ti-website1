'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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

export default function AboutPage() {
  return (
    <div className="neural-grid min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="classified-header text-center mb-4">ORIGIN DOSSIER</h1>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              GLOBAL 3 TECHNOLOGY & INTELLIGENCE™
            </h1>
            <p className="text-xl text-cyber-teal text-center mb-12">
              A new class of autonomous protective intelligence.
            </p>
          </motion.div>

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
            <p className="text-white font-semibold text-lg">
              G3TI was built for the world that exists now — not the world legacy security systems were designed for.
            </p>
            <p className="text-cyber-teal font-semibold text-xl">
              Human protection is no longer a human-speed problem.
            </p>
          </div>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Capabilities Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Autonomous Intelligence Architectures
          </h2>
          <p className="text-gray-300 mb-6">G3TI develops autonomous intelligence architectures engineered for:</p>
          <ul className="space-y-3">
            {capabilities.map((cap, index) => (
              <li key={index} className="text-gray-400 text-lg">{cap}</li>
            ))}
          </ul>
          <p className="text-gray-300 mt-8">
            These are not traditional cybersecurity tools. These are autonomous intelligence organisms that analyze, adapt, and counter-maneuver—without waiting for a human to act.
          </p>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Architecture Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="intel-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-cyber-teal mb-6">
              🔍 A Sovereign Intelligence Engine Built for the AI Threat Era
            </h2>
            <p className="text-gray-300 mb-6">G3TI&apos;s internal architecture blends:</p>
            <ul className="space-y-2">
              {architectureComponents.map((comp, index) => (
                <li key={index} className="text-gray-400">{comp}</li>
              ))}
            </ul>
          </div>
          <p className="text-gray-300 mt-8">
            This fusion allows G3TI to detect threats before they manifest, not after the damage is done.
          </p>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto space-y-6 text-gray-300">
          <p>
            When criminals evolve, our systems evolve faster. When deception becomes algorithmic, our detection becomes anticipatory. When bad actors hide behind machines, our intelligence sees through them.
          </p>
          <p className="text-white font-semibold text-xl">
            We are not a software company. We are a defensive intelligence organism.
          </p>
          <p>
            G3TI does not sell apps. G3TI does not follow industry cycles. G3TI does not rely on yesterday&apos;s threat models.
          </p>
          <p className="text-cyber-teal font-semibold text-2xl">We invent new ones.</p>
          <p>
            Because the dangers facing the world are not incremental — they are exponential.
          </p>
          <p>
            And humanity deserves technology capable of confronting them.
          </p>
          <p className="text-white font-semibold text-xl">
            We are not reacting to the AI revolution. We are redefining it for human protection.
          </p>
        </div>
      </section>

      <div className="cyber-divider" />

      {/* Founder Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            VETERAN-LED. MISSION-DRIVEN.
          </h2>
          <p className="text-gray-300 text-lg">
            Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neural-darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Learn More?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-cyber-teal text-neural-dark font-semibold rounded-lg hover:bg-cyber-teal-dark transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-3 border border-cyber-teal text-cyber-teal font-semibold rounded-lg hover:bg-cyber-teal/10 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
