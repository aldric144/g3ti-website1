'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ZeroTrustPage() {
  return (
    <DossierPage
      title="Zero Trust Architecture"
      subtitle="G3TI's implementation of zero trust security principles."
      category="compliance"
      content={[
        "G3TI implements a comprehensive Zero Trust Architecture across all systems and operations. In the modern threat environment, traditional perimeter-based security is insufficient. Our zero trust approach assumes no implicit trust and continuously verifies every access request.",
        "This architecture is fundamental to protecting our systems, our clients' data, and the integrity of our intelligence operations.",
        "Zero trust is not just a technology implementation—it's a security philosophy that permeates every aspect of our operations.",
      ]}
      sections={[
        {
          title: "Core Principles",
          content: [
            "• Never Trust, Always Verify: Every access request is authenticated and authorized",
            "• Least Privilege Access: Users and systems receive minimum necessary permissions",
            "• Assume Breach: Systems designed assuming adversaries may already be present",
            "• Continuous Monitoring: Real-time analysis of all system activities",
            "• Micro-Segmentation: Network divided into secure zones with strict access controls",
          ]
        },
        {
          title: "Implementation",
          content: [
            "G3TI's zero trust implementation includes:",
            "• Multi-factor authentication for all access",
            "• Identity-based access controls",
            "• Encrypted communications for all data flows",
            "• Continuous endpoint verification",
            "• Automated threat detection and response",
          ]
        }
      ]}
    />
  )
}
