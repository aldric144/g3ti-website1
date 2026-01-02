'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ResponsibleDisclosurePage() {
  return (
    <DossierPage
      title="Responsible Disclosure Policy"
      subtitle="Guidelines for reporting security vulnerabilities to G3TI."
      category="compliance"
      content={[
        "G3TI is committed to the security of our systems and the protection of our users. We welcome responsible disclosure of security vulnerabilities from security researchers and the broader community.",
        "This policy outlines how to report vulnerabilities, what to expect from us, and the protections we offer to good-faith security researchers.",
        "We believe that working with skilled security researchers is essential to maintaining the integrity of our protective intelligence systems.",
      ]}
      sections={[
        {
          title: "Reporting Guidelines",
          content: [
            "If you believe you have discovered a security vulnerability in G3TI systems:",
            "• Report the vulnerability to security@g3ti.com",
            "• Provide detailed information about the vulnerability",
            "• Include steps to reproduce the issue",
            "• Allow reasonable time for us to address the issue before public disclosure",
            "• Do not access, modify, or delete data belonging to others",
          ]
        },
        {
          title: "Our Commitment",
          content: [
            "G3TI commits to:",
            "• Acknowledging receipt of your report within 48 hours",
            "• Providing regular updates on our investigation",
            "• Not pursuing legal action against good-faith researchers",
            "• Crediting researchers who report valid vulnerabilities (if desired)",
            "• Working to remediate confirmed vulnerabilities promptly",
          ]
        }
      ]}
    />
  )
}
