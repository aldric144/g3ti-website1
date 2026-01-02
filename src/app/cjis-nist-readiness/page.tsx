'use client'

import { DossierPage } from '@/components/DossierPage'

export default function CJISNISTReadinessPage() {
  return (
    <DossierPage
      title="CJIS/NIST Readiness"
      subtitle="Criminal Justice Information Services and NIST framework compliance documentation."
      category="compliance"
      content={[
        "G3TI maintains full readiness for Criminal Justice Information Services (CJIS) Security Policy compliance and adherence to the NIST Cybersecurity Framework. These standards are essential for supporting law enforcement and government operations.",
        "Our systems are designed from the ground up to meet the stringent security requirements of criminal justice agencies, ensuring that sensitive law enforcement data is protected at all times.",
        "This document outlines our compliance posture and the specific controls implemented to meet CJIS and NIST requirements.",
      ]}
      sections={[
        {
          title: "CJIS Security Policy Compliance",
          content: [
            "G3TI implements all required CJIS Security Policy controls including:",
            "• Personnel security screening and training",
            "• Physical security for all data handling facilities",
            "• Access control and authentication requirements",
            "• Audit and accountability measures",
            "• Configuration management procedures",
            "• Media protection and disposal",
            "• System and communications protection",
          ]
        },
        {
          title: "NIST Cybersecurity Framework",
          content: [
            "G3TI's security program is aligned with the NIST Cybersecurity Framework across all five functions:",
            "• Identify: Asset management, risk assessment, governance",
            "• Protect: Access control, training, data security",
            "• Detect: Continuous monitoring, detection processes",
            "• Respond: Response planning, communications, mitigation",
            "• Recover: Recovery planning, improvements, communications",
          ]
        }
      ]}
    />
  )
}
