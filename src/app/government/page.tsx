'use client';

import Link from 'next/link';

export default function GovernmentPage() {
  const capabilities = [
    {
      title: 'DHS-Ready Features',
      description: 'Full compliance with Department of Homeland Security requirements and FedRAMP authorization pathways.',
    },
    {
      title: 'Border Intelligence',
      description: 'Advanced threat tracking and border security intelligence integration capabilities.',
    },
    {
      title: 'Real-Time Threat Mapping',
      description: 'Live threat visualization and analysis across multiple intelligence domains.',
    },
    {
      title: 'Fusion Center Integration',
      description: 'Seamless integration with state and local fusion centers for coordinated response.',
    },
    {
      title: 'CJIS Compliance',
      description: 'Full Criminal Justice Information Services security policy compliance.',
    },
    {
      title: 'NIST Framework Alignment',
      description: 'Aligned with NIST Cybersecurity Framework and AI Risk Management Framework.',
    },
  ];

  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#0B85E5]/10 border border-[#0B85E5]/30 rounded-full text-[#0B85E5] text-sm font-semibold mb-4">
            GOVERNMENT & LAW ENFORCEMENT
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
            Mission-Critical Intelligence
          </h1>
          <p className="text-xl text-gray-400">
            Protecting communities through advanced AI-powered threat detection and prevention.
          </p>
          <div className="cyber-divider mt-8" />
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl border border-[#0B85E5]/20 hover:border-[#0B85E5]/40 transition-all"
              >
                <h3 className="text-xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-3">
                  {cap.title}
                </h3>
                <p className="text-gray-400">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-[#0D0D0F] py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6 text-center">
            Supporting National Security
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            G3TI provides mission-critical intelligence solutions for federal, state, and local law enforcement agencies. Our DHS-ready platforms integrate seamlessly with existing infrastructure to enhance national security and protect communities.
          </p>
          <p className="text-gray-300 text-lg">
            From border intelligence to fusion center integration, our autonomous protective intelligence systems deliver real-time threat detection and analysis capabilities that traditional security systems cannot match.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
            Partner With G3TI
          </h2>
          <p className="text-gray-400 mb-8">
            Contact us to learn how G3TI can enhance your agency&apos;s protective intelligence capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Request Briefing
            </Link>
            <Link
              href="/fedramp-alignment"
              className="px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300"
            >
              View FedRAMP Alignment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
