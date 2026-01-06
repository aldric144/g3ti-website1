'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function TableOfContents({ sections, activeSection }: { sections: { id: string; title: string }[]; activeSection: string }) {
  return (
    <div className="sticky top-24 p-4 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
      <h3 className="text-white font-bold mb-4">Contents</h3>
      <nav className="space-y-2">
        {sections.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block text-sm py-1 px-2 rounded transition-all ${
              activeSection === section.id
                ? 'text-[#12F6C8] bg-[#12F6C8]/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  )
}

function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-[#12F6C8]/20">{title}</h2>
      <div className="text-gray-400 space-y-4">{children}</div>
    </section>
  )
}

function DataFlowVisual() {
  return (
    <div className="p-6 bg-[#050505] rounded-xl border border-[#12F6C8]/10 my-8">
      <h4 className="text-white font-semibold mb-4 text-center">Data Flow Overview</h4>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {['Collection', 'Processing', 'Storage', 'Usage', 'Deletion'].map((stage, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 flex items-center justify-center mx-auto mb-2">
              <span className="text-[#12F6C8] font-bold text-sm">{i + 1}</span>
            </div>
            <span className="text-xs text-gray-500">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = 'introduction'
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150) {
          current = section.id
        }
      })
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'collection', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Information' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'security', title: 'Data Security' },
    { id: 'retention', title: 'Data Retention' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'children', title: 'Children\'s Privacy' },
    { id: 'changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Us' },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12F6C8]/5 via-transparent to-transparent" />
        
        <div ref={headerRef} className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
            <span className="text-[#12F6C8] text-sm tracking-wider">LEGAL DOCUMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">PRIVACY</span>{' '}
            <span className="text-[#12F6C8] glow-text">POLICY</span>
          </h1>
          <p className="text-gray-400 mb-4">
            Last Updated: January 1, 2026 | Effective Date: January 1, 2026
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Global 3 Technology & Intelligence™ is committed to protecting your privacy. 
            This policy explains how we collect, use, and safeguard your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <TableOfContents sections={sections} activeSection={activeSection} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="p-8 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <PolicySection id="introduction" title="1. Introduction">
                  <p>
                    Global 3 Technology & Intelligence™ ("G3TI," "we," "us," or "our") respects your privacy 
                    and is committed to protecting your personal data. This privacy policy explains how we 
                    collect, use, disclose, and safeguard your information when you use our services, 
                    visit our website, or interact with our products.
                  </p>
                  <p>
                    By using our services, you consent to the data practices described in this policy. 
                    If you do not agree with our policies and practices, please do not use our services.
                  </p>
                </PolicySection>

                <DataFlowVisual />

                <PolicySection id="collection" title="2. Information We Collect">
                  <p>We collect several types of information from and about users of our services:</p>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-[#050505] rounded-lg">
                      <h4 className="text-[#12F6C8] font-semibold mb-2">Personal Information</h4>
                      <p className="text-sm">Name, email address, phone number, organization, and job title when you contact us or create an account.</p>
                    </div>
                    <div className="p-4 bg-[#050505] rounded-lg">
                      <h4 className="text-[#12F6C8] font-semibold mb-2">Technical Information</h4>
                      <p className="text-sm">IP address, browser type, device information, operating system, and usage data collected automatically.</p>
                    </div>
                    <div className="p-4 bg-[#050505] rounded-lg">
                      <h4 className="text-[#12F6C8] font-semibold mb-2">Service Data</h4>
                      <p className="text-sm">Information processed through our security products, subject to separate data processing agreements.</p>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection id="usage" title="3. How We Use Information">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 mt-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and security alerts</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, investigate, and prevent security incidents</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </PolicySection>

                <PolicySection id="sharing" title="4. Information Sharing">
                  <p>We do not sell your personal information. We may share information in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 mt-4">
                    <li>With service providers who assist in our operations</li>
                    <li>To comply with legal obligations or respond to lawful requests</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                </PolicySection>

                <PolicySection id="security" title="5. Data Security">
                  <p>
                    We implement industry-leading security measures to protect your information, including:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {['AES-256 Encryption', 'Zero-Trust Architecture', 'SOC 2 Compliance', '24/7 Monitoring'].map((item, i) => (
                      <div key={i} className="p-3 bg-[#050505] rounded-lg text-center">
                        <span className="text-[#12F6C8]">🔒</span>
                        <span className="text-sm text-gray-300 ml-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </PolicySection>

                <PolicySection id="retention" title="6. Data Retention">
                  <p>
                    We retain personal information for as long as necessary to fulfill the purposes for which 
                    it was collected, including to satisfy legal, accounting, or reporting requirements. 
                    Retention periods vary based on the type of data and applicable regulations.
                  </p>
                </PolicySection>

                <PolicySection id="rights" title="7. Your Rights">
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul className="list-disc list-inside space-y-2 mt-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, contact us at privacy@g3ti.com.</p>
                </PolicySection>

                <PolicySection id="cookies" title="8. Cookies & Tracking">
                  <p>
                    We use cookies and similar tracking technologies to collect information about your 
                    browsing activities. You can control cookies through your browser settings.
                  </p>
                </PolicySection>

                <PolicySection id="children" title="9. Children's Privacy">
                  <p>
                    Our services are not intended for children under 13. We do not knowingly collect 
                    personal information from children under 13. If we learn we have collected such 
                    information, we will delete it promptly.
                  </p>
                </PolicySection>

                <PolicySection id="changes" title="10. Policy Changes">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any 
                    changes by posting the new policy on this page and updating the "Last Updated" date.
                  </p>
                </PolicySection>

                <PolicySection id="contact" title="11. Contact Us">
                  <p>If you have questions about this privacy policy, please contact us:</p>
                  <div className="mt-4 p-4 bg-[#050505] rounded-lg">
                    <p className="text-[#12F6C8] font-mono">privacy@g3ti.com</p>
                    <p className="text-gray-500 text-sm mt-2">Global 3 Technology & Intelligence™</p>
                    <p className="text-gray-500 text-sm">Palm Beach, FL</p>
                  </div>
                </PolicySection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 px-4 border-t border-[#12F6C8]/10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link href="/legal/terms-of-use.html" className="text-[#12F6C8] hover:underline">Terms of Use</Link>
          <Link href="/legal/security-notice.html" className="text-[#12F6C8] hover:underline">Security Notice</Link>
          <Link href="/legal/intellectual-property.html" className="text-[#12F6C8] hover:underline">Intellectual Property</Link>
        </div>
      </section>
    </div>
  )
}
