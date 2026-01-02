'use client'

import { DossierPage } from '@/components/DossierPage'

export default function NationalSecurityBriefingPage() {
  return (
    <DossierPage
      title="National Security Briefing Packet"
      subtitle="Strategic intelligence assessment for national security stakeholders."
      category="intelligence"
      content={[
        "This National Security Briefing Packet provides a strategic assessment of AI-enabled threats to national security and presents G3TI's capabilities for supporting federal defense and intelligence operations.",
        "The convergence of artificial intelligence, automated deception, and digital infrastructure vulnerabilities has created a threat environment unlike any in human history. Nation-state actors, criminal organizations, and terrorist groups are rapidly adopting AI-powered attack capabilities.",
        "Traditional intelligence and security frameworks were designed for a world of human-speed threats. The AI threat era demands new approaches—autonomous systems capable of detecting, analyzing, and countering threats at machine speed.",
        "G3TI's autonomous intelligence architectures represent a critical capability for national security operations, providing the speed, scale, and sophistication required to defend against AI-enabled adversaries.",
      ]}
      sections={[
        {
          title: "Strategic Threat Assessment",
          content: [
            "• Nation-state AI weapon development accelerating across multiple adversary nations",
            "• Criminal adoption of AI tools democratizing sophisticated attack capabilities",
            "• Critical infrastructure increasingly vulnerable to AI-powered exploitation",
            "• Disinformation and influence operations reaching unprecedented scale and sophistication",
            "• Synthetic identity fraud threatening financial system integrity",
          ]
        },
        {
          title: "G3TI National Security Capabilities",
          content: [
            "• Border security and immigration fraud detection",
            "• Counter-terrorism intelligence support",
            "• Critical infrastructure protection",
            "• Disinformation detection and attribution",
            "• Human trafficking network identification",
            "• Cyber threat intelligence fusion",
          ]
        },
        {
          title: "Deployment Readiness",
          content: [
            "G3TI systems are designed for rapid deployment in support of national security operations, with secure cloud and on-premise options available to meet classification requirements.",
          ]
        }
      ]}
    />
  )
}
