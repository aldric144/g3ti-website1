import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Global 3 Technology & Intelligence™ | G3TI',
  description: 'Securing People, Nations, and the Digital Future. Advanced intelligence technology protecting communities through AI-powered threat detection and prevention.',
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100 dark:bg-[#0D0D0F] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#12F6C8]">G3TI</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">Global 3 Technology & Intelligence™</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">Products</Link>
            <Link href="/government" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">Government & Law Enforcement</Link>
            <Link href="/enterprise" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">Enterprise</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-[#12F6C8] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <>
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold text-[#12F6C8] mb-4">G3TI</h4>
              <p className="text-gray-400 text-sm">Global 3 Technology & Intelligence™</p>
              <p className="text-gray-400 text-sm mt-2">Human Protection. AI Precision. National Impact.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Products</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/products/ghostquant-ai" className="hover:text-[#12F6C8]">GhostQuant AI™</Link></li>
                <li><Link href="/products/id-shield" className="hover:text-[#12F6C8]">ID SHIELD™</Link></li>
                <li><Link href="/products/scamfirewall360" className="hover:text-[#12F6C8]">ScamFirewall360™</Link></li>
                <li><Link href="/products/heartguard-ai" className="hover:text-[#12F6C8]">HeartGuard AI™</Link></li>
                <li><Link href="/products/homelandwatch7" className="hover:text-[#12F6C8]">HomelandWatch7™</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Solutions</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/government" className="hover:text-[#12F6C8]">Government & Law Enforcement</Link></li>
                <li><Link href="/enterprise" className="hover:text-[#12F6C8]">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-[#12F6C8]">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#12F6C8]">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Global 3 Technology & Intelligence™. All rights reserved.</p>
            <p className="mt-2">🇺🇸 Proud Veteran-Owned Company 🇺🇸</p>
          </div>
        </div>
      </footer>
      
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-[#12F6C8] mb-4">GLOBAL 3 TECHNOLOGY & INTELLIGENCE™</h3>
              <p className="text-gray-400 text-sm">Autonomous Protective Intelligence for the AI Threat Era</p>
              <p className="text-gray-400 text-sm mt-2">Veteran-Owned Technology & Intelligence Company</p>
              <p className="text-gray-400 text-sm">Palm Beach, FL</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#12F6C8]">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-[#12F6C8]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#12F6C8]">Origin Dossier</Link></li>
                <li><Link href="/government" className="hover:text-[#12F6C8]">Government & Law Enforcement</Link></li>
                <li><Link href="/enterprise" className="hover:text-[#12F6C8]">Enterprise</Link></li>
                <li><Link href="/contact" className="hover:text-[#12F6C8]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#12F6C8]">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-[#12F6C8]">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-[#12F6C8]">Terms of Use</Link></li>
                <li><Link href="/security-notice" className="hover:text-[#12F6C8]">Security Notice</Link></li>
                <li><Link href="/intellectual-property" className="hover:text-[#12F6C8]">Intellectual Property</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#12F6C8]">Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/ai-governance" className="hover:text-[#12F6C8]">AI Governance</Link></li>
                <li><Link href="/responsible-ai" className="hover:text-[#12F6C8]">Responsible AI</Link></li>
                <li><Link href="/data-governance" className="hover:text-[#12F6C8]">Data Governance</Link></li>
                <li><Link href="/zero-trust" className="hover:text-[#12F6C8]">Zero Trust</Link></li>
                <li><Link href="/cjis-nist-readiness" className="hover:text-[#12F6C8]">CJIS/NIST Readiness</Link></li>
                <li><Link href="/responsible-disclosure" className="hover:text-[#12F6C8]">Responsible Disclosure</Link></li>
                <li><Link href="/human-protection-pledge" className="hover:text-[#12F6C8]">Human Protection Pledge</Link></li>
                <li><Link href="/ai-misuse-prohibition" className="hover:text-[#12F6C8]">AI Misuse Policy</Link></li>
                <li><Link href="/fedramp-alignment" className="hover:text-[#12F6C8]">FedRAMP Alignment Packet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#12F6C8]">Intelligence Dossiers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/threat-architecture" className="hover:text-[#12F6C8]">Threat Architecture Whitepaper</Link></li>
                <li><Link href="/contractor-readiness" className="hover:text-[#12F6C8]">Contractor Readiness Binder</Link></li>
                <li><Link href="/national-security-briefing" className="hover:text-[#12F6C8]">National Security Briefing Packet</Link></li>
                <li><Link href="/threat-architecture-addendum" className="hover:text-[#12F6C8]">Threat Architecture Addendum</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-[#12F6C8] text-sm italic mb-4">&quot;Autonomous Intelligence Engine Active — Monitoring Global Threat Surfaces in Real Time.&quot;</p>
            <p className="text-gray-400 text-sm">© 2026 Global 3 Technology & Intelligence™. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-white min-h-screen">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
