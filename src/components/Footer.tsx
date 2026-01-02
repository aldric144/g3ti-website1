'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <>
      {/* Primary Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h4 className="text-cyber-teal font-bold text-xl mb-2">G3TI</h4>
              <p className="text-gray-400 text-sm">Global 3 Technology & Intelligence™</p>
              <p className="text-gray-500 text-xs mt-2">Human Protection. AI Precision. National Impact.</p>
            </div>

            {/* Products */}
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Products</h5>
              <ul className="space-y-2">
                <li><Link href="/products/ghostquant-ai" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">GhostQuant AI™</Link></li>
                <li><Link href="/products/id-shield" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">ID SHIELD™</Link></li>
                <li><Link href="/products/scamfirewall360" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">ScamFirewall360™</Link></li>
                <li><Link href="/products/heartguard-ai" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">HeartGuard AI™</Link></li>
                <li><Link href="/products/homelandwatch7" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">HomelandWatch7™</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Solutions</h5>
              <ul className="space-y-2">
                <li><Link href="/government" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Government & Law Enforcement</Link></li>
                <li><Link href="/enterprise" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Enterprise</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Company</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-gray-500 text-sm">© 2025 Global 3 Technology & Intelligence™. All rights reserved.</p>
            <p className="text-gray-600 text-xs mt-2">🇺🇸 Proud Veteran-Owned Company 🇺🇸</p>
          </div>
        </div>
      </footer>

      {/* Secondary Footer - Intelligence Dossiers */}
      <footer className="bg-neural-darker border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-cyber-teal font-bold text-lg tracking-wider">GLOBAL 3 TECHNOLOGY & INTELLIGENCE™</h3>
            <p className="text-gray-400 text-sm mt-2">Autonomous Protective Intelligence for the AI Threat Era</p>
            <p className="text-gray-500 text-xs mt-1">Veteran-Owned Technology & Intelligence Company</p>
            <p className="text-gray-600 text-xs">Palm Beach, FL</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Origin Dossier</Link></li>
                <li><Link href="/government" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Government & Law Enforcement</Link></li>
                <li><Link href="/enterprise" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Enterprise</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Contact</Link></li>
                <li><button className="text-cyber-teal hover:text-cyber-teal-dark text-sm transition-colors">Request a Demo</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Terms of Use</Link></li>
                <li><Link href="/security-notice" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Security Notice</Link></li>
                <li><Link href="/intellectual-property" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Intellectual Property</Link></li>
              </ul>
            </div>

            {/* Compliance */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Compliance</h4>
              <ul className="space-y-2">
                <li><Link href="/ai-governance" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">AI Governance</Link></li>
                <li><Link href="/responsible-ai" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Responsible AI</Link></li>
                <li><Link href="/data-governance" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Data Governance</Link></li>
                <li><Link href="/zero-trust" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Zero Trust</Link></li>
                <li><Link href="/cjis-nist-readiness" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">CJIS/NIST Readiness</Link></li>
                <li><Link href="/responsible-disclosure" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Responsible Disclosure</Link></li>
                <li><Link href="/human-protection-pledge" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Human Protection Pledge</Link></li>
                <li><Link href="/ai-misuse-prohibition" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">AI Misuse Policy</Link></li>
                <li><Link href="/fedramp-alignment" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">FedRAMP Alignment Packet</Link></li>
              </ul>
            </div>

            {/* Intelligence Dossiers */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Intelligence Dossiers</h4>
              <ul className="space-y-2">
                <li><Link href="/threat-architecture" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Threat Architecture Whitepaper</Link></li>
                <li><Link href="/contractor-readiness" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Contractor Readiness Binder</Link></li>
                <li><Link href="/national-security-briefing" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">National Security Briefing Packet</Link></li>
                <li><Link href="/threat-architecture-addendum" className="text-gray-400 hover:text-cyber-teal text-sm transition-colors">Threat Architecture Addendum</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-cyber-teal text-xs font-mono tracking-wider">
              &quot;Autonomous Intelligence Engine Active — Monitoring Global Threat Surfaces in Real Time.&quot;
            </p>
            <p className="text-gray-600 text-xs mt-4">© 2026 Global 3 Technology & Intelligence™. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
