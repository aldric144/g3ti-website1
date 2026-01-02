'use client'

import { DossierPage } from '@/components/DossierPage'

export default function FedRAMPAlignmentPage() {
  return (
    <DossierPage
      title="FedRAMP Alignment Packet"
      subtitle="Federal Risk and Authorization Management Program compliance documentation."
      category="compliance"
      content={[
        "G3TI maintains alignment with the Federal Risk and Authorization Management Program (FedRAMP) security requirements. This alignment enables G3TI to support federal government cloud deployments with the security assurance required for government operations.",
        "Our FedRAMP alignment demonstrates our commitment to meeting the highest federal security standards and our readiness to support government missions.",
        "This packet provides an overview of our FedRAMP alignment status and the security controls implemented across our cloud infrastructure.",
      ]}
      sections={[
        {
          title: "FedRAMP Control Implementation",
          content: [
            "G3TI implements security controls aligned with FedRAMP requirements across all control families:",
            "• Access Control (AC)",
            "• Audit and Accountability (AU)",
            "• Security Assessment and Authorization (CA)",
            "• Configuration Management (CM)",
            "• Contingency Planning (CP)",
            "• Identification and Authentication (IA)",
            "• Incident Response (IR)",
            "• Maintenance (MA)",
            "• Media Protection (MP)",
            "• Physical and Environmental Protection (PE)",
            "• Planning (PL)",
            "• Personnel Security (PS)",
            "• Risk Assessment (RA)",
            "• System and Services Acquisition (SA)",
            "• System and Communications Protection (SC)",
            "• System and Information Integrity (SI)",
          ]
        },
        {
          title: "Cloud Infrastructure",
          content: [
            "G3TI cloud deployments utilize FedRAMP-authorized infrastructure providers and implement additional security controls to ensure comprehensive protection of government data.",
          ]
        },
        {
          title: "Continuous Monitoring",
          content: [
            "G3TI maintains continuous monitoring capabilities aligned with FedRAMP requirements, including automated vulnerability scanning, security event monitoring, and regular security assessments.",
          ]
        }
      ]}
    />
  )
}
