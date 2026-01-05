'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Live Stats Component
function LiveStats() {
  const stats = [
    { value: 847, label: 'Deepfake crimes today' },
    { value: 12453, label: 'AI fraud attempts (24h)' },
    { value: 3421, label: 'Synthetic IDs flagged monthly' },
    { value: 89234, label: 'OSINT signals detected globally' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card rounded-xl p-6 text-center border border-[#12F6C8]/20 hover:border-[#12F6C8]/40 transition-all"
        >
          <div className="text-3xl lg:text-4xl font-bold text-[#12F6C8] font-[family-name:var(--font-rajdhani)]">
            <AnimatedCounter end={stat.value} />
          </div>
          <div className="text-xs lg:text-sm text-gray-400 mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// Threat Briefing Card
function ThreatCard({ lines }: { lines: string[] }) {
  return (
    <div className="glass-card rounded-xl p-6 border border-[#12F6C8]/10 hover:border-[#12F6C8]/30 transition-all">
      {lines.map((line, index) => (
        <p key={index} className="text-gray-300 text-sm lg:text-base mb-1">{line}</p>
      ))}
    </div>
  );
}

// World Map Component
function WorldMap() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B85E5]/20 to-[#12F6C8]/10 rounded-xl">
        {/* Simplified world map visualization */}
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-60">
          {/* World map paths - simplified continents */}
          <path
            d="M150,120 Q200,100 250,120 T350,110 Q400,130 450,120 T550,130"
            fill="none"
            stroke="#12F6C8"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M100,180 Q150,160 200,180 T300,170 Q350,190 400,180"
            fill="none"
            stroke="#12F6C8"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Data points */}
          {[
            { x: 200, y: 150 },
            { x: 350, y: 120 },
            { x: 500, y: 140 },
            { x: 600, y: 180 },
            { x: 250, y: 200 },
            { x: 450, y: 220 },
          ].map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#12F6C8"
                className="map-point"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="none"
                stroke="#12F6C8"
                strokeWidth="1"
                opacity="0.3"
                className="map-point"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
          {/* Connection lines */}
          <path
            d="M200,150 Q275,100 350,120"
            fill="none"
            stroke="#12F6C8"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M350,120 Q425,100 500,140"
            fill="none"
            stroke="#12F6C8"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M500,140 Q550,160 600,180"
            fill="none"
            stroke="#12F6C8"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
        {/* Floating numbers overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['14.213', '22.218', '7.891', '31.456'].map((num, i) => (
            <span
              key={i}
              className="absolute text-[#12F6C8]/20 text-2xl font-mono"
              style={{
                top: `${20 + i * 20}%`,
                right: `${10 + i * 5}%`,
              }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="neural-grid min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className={`text-center mb-12 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
              Global 3 Technology &<br />Intelligence™
            </h1>
            <p className="text-xl sm:text-2xl text-[#12F6C8] font-semibold mb-8">
              Human Protection. AI Precision. National Impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glow px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
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

          {/* Live Stats */}
          <LiveStats />

          {/* World Map and Threat Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* World Map */}
            <div className="order-2 lg:order-1">
              <WorldMap />
            </div>

            {/* Threat Briefing Cards */}
            <div className="order-1 lg:order-2 space-y-4">
              <ThreatCard
                lines={[
                  'Deception is now automated.',
                  'Identity is now weaponized.',
                  'Crime moves at machine speed.',
                ]}
              />
              <ThreatCard
                lines={[
                  'Every 11 seconds: digital extortion.',
                  '3000% rise: deepfake voice attacks.',
                  '72% of abuse escalation begins online.',
                  'AI-enabled trafficking networks multiplying.',
                ]}
              />
              <ThreatCard
                lines={[
                  'Legacy security cannot see these threats.',
                  'Legacy intelligence cannot predict them.',
                  'Human-speed response cannot stop them.',
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-[#12F6C8]/20 to-transparent animate-scan" />
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-rajdhani)] text-[#12F6C8] mb-8 text-center">
            GLOBAL 3 TECHNOLOGY & INTELLIGENCE™
          </h2>
          <div className="space-y-6 text-gray-300 text-lg">
            <p className="text-xl text-white font-semibold">A new class of autonomous protective intelligence.</p>
            <p>
              G3TI stands at the front line of the world&apos;s fastest-evolving threat landscape, where deception is now automated, identity is weaponized, and crime moves at machine speed.
            </p>
            <p>
              Every 11 seconds, a new digital extortion attempt is launched. More than 50% of all global fraud now contains an AI-generated element. Deepfake voice attacks have increased 3,000% since 2022, and synthetic-identity crime has quietly become the fastest-growing form of financial fraud in the United States. Domestic-violence escalations now begin online 72% of the time, and human-trafficking networks increasingly use AI to hide, recruit, and evade detection.
            </p>
            <p>
              Traditional security systems cannot see these threats. Traditional intelligence systems cannot predict them. Traditional law enforcement cannot respond fast enough.
            </p>
            <p className="text-[#12F6C8] font-semibold">
              G3TI was built for the world that exists now — not the world legacy security systems were designed for.
            </p>
            <p className="text-xl text-white font-semibold">
              Human protection is no longer a human-speed problem.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 mb-6">G3TI develops autonomous intelligence architectures engineered for:</p>
          <ul className="space-y-3 text-gray-300 mb-8">
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Synthetic identity detection before a crime begins</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Voice-clone and deepfake separation in milliseconds</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Neural behavior modeling that uncovers intention, not just activity</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>AI-generated manipulation forensics across voice, text, and image</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Domestic-violence escalation prediction powered by behavioral vectors</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Cross-platform fraud ring mapping connecting global threat actors</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Rapid OSINT fusion across millions of data points per second</li>
            <li className="flex items-start"><span className="text-[#12F6C8] mr-3">•</span>Government-grade identity integrity systems that expose the unseen</li>
          </ul>
          <p className="text-gray-300">
            These are not traditional cybersecurity tools. These are autonomous intelligence organisms that analyze, adapt, and counter-maneuver—without waiting for a human to act.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-12">
            THE NEW CLASS OF INTELLIGENCE
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { value: '$12.5B', label: 'lost to scams in 2023' },
              { value: '400%', label: 'increase in deepfake crimes' },
              { value: '$3.4B', label: 'in elder fraud losses' },
              { value: '82%', label: 'rise in online child targeting' },
              { value: '500%', label: 'Digital domestic violence increase' },
              { value: 'Exploding', label: 'AI-generated fraud worldwide' },
            ].map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-6 border border-[#12F6C8]/10">
                <div className="text-2xl lg:text-3xl font-bold text-[#12F6C8] font-[family-name:var(--font-rajdhani)]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xl text-gray-400 mt-12">
            Fear is being industrialized. Deception automated.
          </p>
          <p className="text-xl text-white font-semibold mt-2">
            Protection has not kept up—until now.
          </p>
        </div>
      </section>

      {/* G3TI Difference Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-8 text-center">
            THE G3TI DIFFERENCE
          </h2>
          <p className="text-gray-300 mb-6">We build patentable protective-intelligence ecosystems designed to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              '• Detect deception patterns',
              '• Predict emerging threats',
              '• Neutralize scams and fraud',
              '• Protect identities & families',
              '• Strengthen law enforcement',
              '• Support national security',
            ].map((item, index) => (
              <p key={index} className="text-gray-300">{item}</p>
            ))}
          </div>
          <p className="text-gray-300 mb-4">Our systems fuse:</p>
          <ul className="space-y-2 text-gray-300 mb-8">
            <li>• AI/ML predictive intelligence</li>
            <li>• Behavioral deception analysis</li>
            <li>• Digital forensics</li>
            <li>• OSINT threat pipelines</li>
            <li>• Identity-integrity models</li>
            <li>• Government-grade security frameworks</li>
            <li>• Invention-level engineering</li>
          </ul>
          <p className="text-[#12F6C8] font-semibold text-center text-xl">
            We are not chasing the AI revolution. We are redefining it for human protection.
          </p>
        </div>
      </section>

      {/* Veteran Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
            VETERAN-LED. MISSION-DRIVEN.
          </h2>
          <p className="text-xl text-gray-300">
            Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4 text-center">
            CONFIDENTIAL SYSTEMS
          </h2>
          <p className="text-gray-400 text-center mb-12">Full capabilities are proprietary and under active development.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group glass-card p-8 rounded-xl border border-gray-800 hover:border-[#12F6C8] transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-2 group-hover:text-[#12F6C8] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-[#12F6C8] mb-3">Names Only</p>
                <p className="text-gray-400">Full capabilities are proprietary and under active development.</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
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
              <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
                Government & Law Enforcement
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Mission-critical intelligence solutions for federal, state, and local law enforcement agencies. Our DHS-ready platforms integrate seamlessly with existing infrastructure to enhance national security and protect communities.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>DHS-ready features and FedRAMP compliance</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Border intelligence and threat tracking</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Real-time threat mapping and analysis</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Fusion center integration</li>
              </ul>
              <Link
                href="/government"
                className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden h-96 bg-gradient-to-br from-[#0B85E5]/20 to-[#12F6C8]/10">
              <div className="w-full h-full flex items-center justify-center text-[#12F6C8]/30 text-6xl">
                🛡️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden h-96 bg-gradient-to-br from-[#0B85E5]/20 to-[#12F6C8]/10">
              <div className="w-full h-full flex items-center justify-center text-[#12F6C8]/30 text-6xl">
                🏢
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
                Enterprise Solutions
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Enterprise-grade security and intelligence solutions protecting organizations across industries. From financial institutions to healthcare providers, our AI-powered platforms safeguard your operations and customers.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Financial institutions fraud detection</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Healthcare data protection and compliance</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Educational institution safety solutions</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-2">▸</span>Corporate cyber defense and threat prevention</li>
              </ul>
              <Link
                href="/enterprise"
                className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-8">
            CALL TO ACTION
          </h2>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto mb-8">
            We protect what the world isn&apos;t prepared for.
          </p>
          <p className="text-xl text-white font-semibold mb-12">
            Join the future of intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
