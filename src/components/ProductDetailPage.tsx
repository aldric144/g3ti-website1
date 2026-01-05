'use client';

import Link from 'next/link';

interface ProductDetailPageProps {
  name: string;
  tagline: string;
}

export default function ProductDetailPage({ name, tagline }: ProductDetailPageProps) {
  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-full text-[#12F6C8] text-sm font-semibold mb-4">
            CONFIDENTIAL SYSTEM
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
            {name}
          </h1>
          <p className="text-xl text-gray-400">{tagline}</p>
          <div className="cyber-divider mt-8" />
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-8 border border-[#12F6C8]/10 text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
              Classified Intelligence System
            </h2>
            <p className="text-gray-400 mb-6">
              Full capabilities are proprietary and under active development. This system represents cutting-edge autonomous protective intelligence technology.
            </p>
            <p className="text-[#12F6C8] font-semibold">
              Contact us for authorized briefings and partnership inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Back Links */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 text-center"
          >
            View All Products
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300 text-center"
          >
            Request Briefing
          </Link>
        </div>
      </section>
    </div>
  );
}
