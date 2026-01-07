'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function AcceptanceBox() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20 mb-8">
      <div className="flex items-start gap-4">
        <button
          onClick={() => setAccepted(!accepted)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            accepted ? 'bg-[#12F6C8] border-[#12F6C8]' : 'border-[#12F6C8]/50'
          }`}
        >
          {accepted && <span className="text-black text-sm">✓</span>}
        </button>
        <div>
          <p className="text-white font-semibold mb-2">Terms Acknowledgment</p>
          <p className="text-gray-400 text-sm">
            By using G3TI services, you acknowledge that you have read, understood, and agree 
            to be bound by these Terms of Use. If you do not agree to these terms, you must 
            not use our services.
          </p>
        </div>
      </div>
    </div>
  )
}

function TermSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="border-b border-[#12F6C8]/10 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#12F6C8] font-mono">{number}</span>
          <span className="text-white font-semibold">{title}</span>
        </div>
        <span className={`text-[#12F6C8] transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {expanded && (
        <div className="pb-6 pl-12 text-gray-400 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}

function HighlightBox({ type, children }: { type: 'warning' | 'info' | 'important'; children: React.ReactNode }) {
  const styles = {
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    info: 'border-blue-500/30 bg-blue-500/5',
    important: 'border-red-500/30 bg-red-500/5',
  }

  const icons = {
    warning: '⚠️',
    info: 'ℹ️',
    important: '❗',
  }

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-4`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}

export default function TermsOfUsePage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B85E5]/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#0B85E5]/10 border border-[#0B85E5]/30 mb-6">
            <span className="text-[#0B85E5] text-sm tracking-wider">LEGAL AGREEMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">TERMS OF</span>{' '}
            <span className="text-[#12F6C8] glow-text">USE</span>
          </h1>
          <p className="text-gray-400 mb-4">
            Last Updated: January 1, 2026 | Version 3.0
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These terms govern your use of G3TI services and products. 
            Please read them carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AcceptanceBox />

          <div className="p-8 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
            <TermSection number="1.0" title="Acceptance of Terms">
              <p>
                By accessing or using the services provided by Global 3 Technology & Intelligence™ 
                ("G3TI," "we," "us," or "our"), you agree to be bound by these Terms of Use 
                ("Terms"). These Terms apply to all visitors, users, and others who access or 
                use our services.
              </p>
              <HighlightBox type="important">
                <p className="text-red-400">
                  If you do not agree to these Terms, you must immediately discontinue use of our services.
                </p>
              </HighlightBox>
            </TermSection>

            <TermSection number="2.0" title="Description of Services">
              <p>
                G3TI provides autonomous intelligence and security services, including but not 
                limited to threat detection, identity protection, fraud prevention, and compliance 
                solutions. Our services are designed for government agencies, enterprises, and 
                individuals seeking advanced security capabilities.
              </p>
            </TermSection>

            <TermSection number="3.0" title="User Accounts">
              <p>
                To access certain features of our services, you may be required to create an account. 
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information is accurate and current</li>
              </ul>
            </TermSection>

            <TermSection number="4.0" title="Acceptable Use">
              <p>You agree not to use our services to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit malicious code or interfere with our systems</li>
                <li>Attempt to gain unauthorized access to our services</li>
                <li>Use our services for any illegal or harmful purpose</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
              <HighlightBox type="warning">
                <p className="text-yellow-400">
                  Violation of acceptable use policies may result in immediate termination of your 
                  account and potential legal action.
                </p>
              </HighlightBox>
            </TermSection>

            <TermSection number="5.0" title="Intellectual Property">
              <p>
                All content, features, and functionality of our services are owned by G3TI and 
                are protected by international copyright, trademark, patent, trade secret, and 
                other intellectual property laws. You may not copy, modify, distribute, sell, 
                or lease any part of our services without our express written permission.
              </p>
            </TermSection>

            <TermSection number="6.0" title="Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, G3TI SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY 
                LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR 
                ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <HighlightBox type="info">
                <p className="text-blue-400">
                  Our total liability shall not exceed the amount you paid us in the twelve (12) 
                  months preceding the claim.
                </p>
              </HighlightBox>
            </TermSection>

            <TermSection number="7.0" title="Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless G3TI and its officers, directors, 
                employees, and agents from and against any claims, liabilities, damages, judgments, 
                awards, losses, costs, expenses, or fees arising out of or relating to your violation 
                of these Terms or your use of our services.
              </p>
            </TermSection>

            <TermSection number="8.0" title="Termination">
              <p>
                We may terminate or suspend your access to our services immediately, without prior 
                notice or liability, for any reason, including breach of these Terms. Upon termination, 
                your right to use our services will immediately cease.
              </p>
            </TermSection>

            <TermSection number="9.0" title="Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the 
                State of Florida, without regard to its conflict of law provisions. Any disputes 
                arising under these Terms shall be resolved in the courts of Palm Beach County, Florida.
              </p>
            </TermSection>

            <TermSection number="10.0" title="Changes to Terms">
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of any 
                changes by posting the new Terms on this page and updating the "Last Updated" date. 
                Your continued use of our services after such changes constitutes acceptance of the 
                new Terms.
              </p>
            </TermSection>

            <TermSection number="11.0" title="Contact Information">
              <p>For questions about these Terms, please contact us:</p>
              <div className="mt-4 p-4 bg-[#050505] rounded-lg">
                <p className="text-[#12F6C8] font-mono">legal@g3ti.com</p>
                <p className="text-gray-500 text-sm mt-2">Global 3 Technology & Intelligence™</p>
                <p className="text-gray-500 text-sm">Palm Beach, FL</p>
              </div>
            </TermSection>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link href="/privacy-policy.html" className="text-[#12F6C8] hover:underline">Privacy Policy</Link>
          <Link href="/security-notice.html" className="text-[#12F6C8] hover:underline">Security Notice</Link>
          <Link href="/intellectual-property.html" className="text-[#12F6C8] hover:underline">Intellectual Property</Link>
        </div>
      </section>
    </div>
  )
}
