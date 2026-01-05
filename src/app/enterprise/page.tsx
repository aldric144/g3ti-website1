'use client';

import Link from 'next/link';

export default function EnterprisePage() {
  const industries = [
    {
      title: 'Financial Services',
      description: 'Advanced fraud detection and synthetic identity prevention for banks, credit unions, and financial institutions.',
    },
    {
      title: 'Healthcare',
      description: 'Patient data protection, HIPAA compliance, and healthcare fraud prevention systems.',
    },
    {
      title: 'Education',
      description: 'Campus safety solutions, student protection systems, and institutional security platforms.',
    },
    {
      title: 'Corporate Security',
      description: 'Enterprise-grade cyber defense, insider threat detection, and corporate intelligence systems.',
    },
    {
      title: 'Insurance',
      description: 'Claims fraud detection, risk assessment intelligence, and policyholder protection.',
    },
    {
      title: 'Telecommunications',
      description: 'Network security, subscriber fraud prevention, and communication integrity systems.',
    },
  ];

  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#0B85E5]/10 border border-[#0B85E5]/30 rounded-full text-[#0B85E5] text-sm font-semibold mb-4">
            ENTERPRISE SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
            Enterprise-Grade Intelligence
          </h1>
          <p className="text-xl text-gray-400">
            Protecting organizations across industries with AI-powered security solutions.
          </p>
          <div className="cyber-divider mt-8" />
        </div>
      </section>

      {/* Industries Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl border border-[#0B85E5]/20 hover:border-[#0B85E5]/40 transition-all"
              >
                <h3 className="text-xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-400">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-[#0D0D0F] py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6 text-center">
            Why Enterprise Leaders Choose G3TI
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Enterprise-grade security and intelligence solutions protecting organizations across industries. From financial institutions to healthcare providers, our AI-powered platforms safeguard your operations and customers.
            </p>
            <p>
              Our autonomous protective intelligence systems provide real-time threat detection, fraud prevention, and security analytics that scale with your organization&apos;s needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
            Protect Your Organization
          </h2>
          <p className="text-gray-400 mb-8">
            Contact us to learn how G3TI can enhance your enterprise security posture.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Request Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
