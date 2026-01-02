'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ContractorReadinessPage() {
  return (
    <DossierPage
      title="Contractor Readiness Binder"
      subtitle="Federal contractor qualification documentation and compliance readiness materials."
      category="intelligence"
      content={[
        "This Contractor Readiness Binder provides comprehensive documentation of G3TI's qualifications, capabilities, and compliance posture for federal contracting opportunities.",
        "G3TI maintains readiness for federal procurement across multiple contract vehicles and is prepared to support mission-critical intelligence operations for Department of Homeland Security, Department of Defense, and law enforcement agencies at federal, state, and local levels.",
        "Our veteran-led organization brings deep understanding of government operations, security requirements, and the unique challenges facing public sector agencies in the AI threat era.",
        "All G3TI systems are designed from the ground up to meet federal security requirements, including FedRAMP alignment, CJIS compliance, and NIST cybersecurity framework adherence.",
      ]}
      sections={[
        {
          title: "Organizational Qualifications",
          content: [
            "• Veteran-Owned Small Business (VOSB)",
            "• Experienced leadership with national security backgrounds",
            "• Proven track record in protective intelligence",
            "• Active security clearance readiness",
            "• Established quality management systems",
          ]
        },
        {
          title: "Technical Capabilities",
          content: [
            "• AI/ML-powered threat detection and analysis",
            "• Real-time OSINT fusion and processing",
            "• Synthetic identity detection systems",
            "• Deepfake forensics and authentication",
            "• Behavioral analysis and prediction",
            "• Secure cloud and on-premise deployment options",
          ]
        },
        {
          title: "Compliance Posture",
          content: [
            "• FedRAMP alignment (documentation available)",
            "• CJIS Security Policy compliance",
            "• NIST Cybersecurity Framework adherence",
            "• SOC 2 Type II readiness",
            "• HIPAA compliance capabilities",
          ]
        }
      ]}
    />
  )
}
