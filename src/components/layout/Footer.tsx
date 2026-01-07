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
        {/* Main footer content - 5 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1 - Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-[#12F6C8] font-bold text-lg mb-4 tracking-wider">GLOBAL 3 TECHNOLOGY & INTELLIGENCE™</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Autonomous Protective Intelligence for the AI Threat Era
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Veteran-Owned Technology & Intelligence Company
            </p>
            <p className="text-gray-400 text-sm">
              Palm Beach, FL
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">NAVIGATION</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Origin Dossier', href: '/about.html' },
                { label: 'Government & Law Enforcement', href: '/government.html' },
                { label: 'Enterprise', href: '/enterprise.html' },
                { label: 'Contact', href: '/contact.html' },
                { label: 'Request a Demo', href: '/contact.html' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">LEGAL</h4>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy.html' },
                { label: 'Terms of Use', href: '/terms-of-use.html' },
                { label: 'Security Notice', href: '/security-notice.html' },
                { label: 'Intellectual Property', href: '/intellectual-property.html' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Compliance */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">COMPLIANCE</h4>
            <ul className="space-y-3">
              {[
                { label: 'AI Governance', href: '/ai-governance.html' },
                { label: 'Responsible AI', href: '/responsible-ai.html' },
                { label: 'Data Governance', href: '/data-governance.html' },
                { label: 'Zero Trust', href: '/zero-trust.html' },
                { label: 'CJIS/NIST Readiness', href: '/cjis-nist-readiness.html' },
                { label: 'Responsible Disclosure', href: '/responsible-disclosure.html' },
                { label: 'Human Protection Pledge', href: '/human-protection-pledge.html' },
                { label: 'AI Misuse Policy', href: '/ai-misuse-prohibition.html' },
                { label: 'FedRAMP Alignment Packet', href: '/fedramp-alignment.html' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#12F6C8] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Intelligence Dossiers */}
          <div>
            <h4 className="text-[#12F6C8] font-semibold mb-4 tracking-wider text-sm">INTELLIGENCE DOSSIERS</h4>
            <ul className="space-y-3">
              {[
                { label: 'Threat Architecture Whitepaper', href: '/threat-architecture.html' },
                { label: 'Contractor Readiness Binder', href: '/contractor-readiness.html' },
                { label: 'National Security Briefing Packet', href: '/national-security-briefing.html' },
                { label: 'Threat Architecture Addendum', href: '/threat-architecture-addendum.html' },
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

        {/* Tagline */}
        <div className="text-center mb-8 py-4 border-t border-b border-[#12F6C8]/10">
          <p className="text-[#12F6C8]/60 text-sm italic">
            &quot;Autonomous Intelligence Engine Active — Monitoring Global Threat Surfaces in Real Time.&quot;
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                © 2026 Global 3 Technology & Intelligence™. All rights reserved.
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
