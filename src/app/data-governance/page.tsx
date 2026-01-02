'use client'

import { DossierPage } from '@/components/DossierPage'

export default function DataGovernancePage() {
  return (
    <DossierPage
      title="Data Governance Policy"
      subtitle="Comprehensive data management and protection standards."
      category="compliance"
      content={[
        "G3TI's Data Governance Policy establishes the standards and procedures for managing data throughout its lifecycle. As an intelligence company handling sensitive information, we maintain the highest standards of data protection and management.",
        "Our data governance framework ensures that all data is collected, processed, stored, and disposed of in accordance with applicable laws, regulations, and ethical standards.",
        "This policy applies to all G3TI personnel, contractors, and partners who handle data in any capacity.",
      ]}
      sections={[
        {
          title: "Data Classification",
          content: [
            "All data handled by G3TI is classified according to sensitivity levels:",
            "• Public: Information approved for public release",
            "• Internal: Business information for internal use only",
            "• Confidential: Sensitive business or client information",
            "• Restricted: Highly sensitive information requiring special handling",
          ]
        },
        {
          title: "Data Protection Standards",
          content: [
            "• Encryption at rest and in transit for all sensitive data",
            "• Access controls based on least-privilege principles",
            "• Regular audits of data access and handling",
            "• Secure disposal procedures for all data types",
            "• Incident response procedures for data breaches",
          ]
        },
        {
          title: "Compliance",
          content: [
            "G3TI data governance practices are designed to comply with GDPR, CCPA, HIPAA, and other applicable data protection regulations.",
          ]
        }
      ]}
    />
  )
}
