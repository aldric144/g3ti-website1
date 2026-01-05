'use client';

import Link from 'next/link';

interface Section {
  title: string;
  content: string[];
}

interface DossierPageProps {
  title: string;
  subtitle: string;
  classification?: string;
  sections: Section[];
}

export default function DossierPage({ title, subtitle, classification = 'CONFIDENTIAL', sections }: DossierPageProps) {
  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-full text-[#12F6C8] text-sm font-semibold mb-4">
              {classification}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-400">{subtitle}</p>
          </div>
          <div className="cyber-divider mb-8" />
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="glass-card rounded-xl p-8 border border-[#12F6C8]/10">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-[#12F6C8] mb-6">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
