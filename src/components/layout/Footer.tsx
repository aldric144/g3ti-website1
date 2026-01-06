'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-[#12F6C8]/10">
      {/* Neural mesh background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-mesh" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="#12F6C8" />
              <line x1="25" y1="25" x2="50" y2="0" stroke="#12F6C8" strokeWidth="0.5" opacity="0.3" />
              <line x1="25" y1="25" x2="50" y2="50" stroke="#12F6C8" strokeWidth="0.5" opacity="0.3" />
              <line x1="25" y1="25" x2="0" y2="50" stroke="#12F6C8" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-mesh)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#12F6C8] to-[#0B85E5] flex items-center justify-center">
                <span className="text-black font-bold text-xl">G3</span>
              </div>
              <div>
                <div className="text-[#12F6C8] font-bold text-xl tracking-wider">G3TI</div>
                <div className="text-gray-500 text-xs tracking-widest">DIGITAL INTELLIGENCE ENVIRONMENT</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Global 3 Technology & Intelligence™ — Autonomous Protective Intelligence for the AI Threat Era. 
              Veteran-Owned Technology & Intelligence Company headquartered in Palm Beach, FL.
            </p>
            {/* Global tagline */}
            <div className="p-4 rounded-lg bg-[#12F6C8]/5 border border-[#12F6C8]/20">
              <p className="text-[#12F6C8] text-sm italic">
                &quot;We don&apos;t make technology — we make technology intelligent.&quot;
              </p>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">NAVIGATION</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Government', href: '/government.html' },
                { label: 'Enterprise', href: '/enterprise.html' },
                { label: 'Products', href: '/products.html' },
                { label: 'Contact', href: '/contact.html' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence column */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">INTELLIGENCE</h4>
            <ul className="space-y-3">
              {[
                { label: 'Threat Architecture', href: '/dossiers/threat-architecture.html' },
                { label: 'Contractor Readiness', href: '/dossiers/contractor-readiness.html' },
                { label: 'National Security', href: '/dossiers/national-security.html' },
                { label: 'Addendum', href: '/dossiers/addendum.html' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance column */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">COMPLIANCE</h4>
            <ul className="space-y-3">
              {[
                { label: 'AI Governance', href: '/compliance/ai-governance.html' },
                { label: 'NIST/CJIS', href: '/compliance/nist-cjis.html' },
                { label: 'Zero Trust', href: '/compliance/zero-trust.html' },
                { label: 'Data Governance', href: '/compliance/data-governance.html' },
                { label: 'Privacy Policy', href: '/legal/privacy.html' },
                { label: 'Terms of Use', href: '/legal/terms.html' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#12F6C8]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                © 2026 Global 3 Technology & Intelligence™. All rights reserved.
              </span>
              <span className="text-[#12F6C8]/50">|</span>
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <span className="text-lg">🇺🇸</span> Veteran-Owned
              </span>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#12F6C8] animate-pulse" />
              <span className="text-[#12F6C8]/60 text-xs tracking-wider">
                D.I.E. SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#12F6C8]/30 to-transparent" />
    </footer>
  )
}
