'use client';

import Link from 'next/link';

const products = [
  {
    name: 'GhostQuant AI™',
    href: '/products/ghostquant-ai',
    description: 'Advanced quantum-resistant AI threat detection and neutralization system.',
  },
  {
    name: 'ID SHIELD™',
    href: '/products/id-shield',
    description: 'Comprehensive identity protection and synthetic identity detection platform.',
  },
  {
    name: 'ScamFirewall360™',
    href: '/products/scamfirewall360',
    description: 'Real-time scam detection and prevention across all communication channels.',
  },
  {
    name: 'HeartGuard AI™',
    href: '/products/heartguard-ai',
    description: 'Domestic violence prediction and intervention intelligence system.',
  },
  {
    name: 'HomelandWatch7™',
    href: '/products/homelandwatch7',
    description: 'National security threat monitoring and border intelligence platform.',
  },
];

export default function ProductsPage() {
  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-full text-[#12F6C8] text-sm font-semibold mb-4">
            CONFIDENTIAL SYSTEMS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
            Intelligence Products
          </h1>
          <p className="text-xl text-gray-400">
            Full capabilities are proprietary and under active development.
          </p>
          <div className="cyber-divider mt-8" />
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group glass-card p-8 rounded-xl border border-gray-800 hover:border-[#12F6C8] transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-2 group-hover:text-[#12F6C8] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-[#12F6C8] mb-3">Names Only</p>
                <p className="text-gray-400">
                  Full capabilities are proprietary and under active development.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-8">
            Interested in learning more about our intelligence systems? Contact us for authorized briefings.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Request Briefing
          </Link>
        </div>
      </section>
    </div>
  );
}
