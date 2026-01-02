'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ThreatArchitecturePage() {
  return (
    <DossierPage
      title="Threat Architecture Whitepaper"
      subtitle="A comprehensive analysis of the evolving AI-enabled threat landscape and G3TI's autonomous defense architectures."
      category="intelligence"
      content={[
        "The global threat landscape has fundamentally transformed. What was once a domain of human adversaries operating at human speed has become an algorithmic battlefield where AI-generated attacks, synthetic identities, and automated deception systems operate at machine velocity.",
        "This whitepaper examines the architectural foundations of modern threats and presents G3TI's framework for autonomous protective intelligence—systems designed not merely to respond to attacks, but to anticipate, adapt, and neutralize them before damage occurs.",
        "Traditional cybersecurity operates on a detect-and-respond model that assumes human-speed threats. This model is obsolete. When deepfake voice attacks can be generated in milliseconds, when synthetic identities can be manufactured at scale, when AI-powered social engineering can target thousands simultaneously—human-speed response is no longer viable.",
        "G3TI's Threat Architecture represents a paradigm shift: from reactive security to predictive intelligence, from signature-based detection to behavioral anticipation, from human-dependent response to autonomous counter-maneuver.",
      ]}
      sections={[
        {
          title: "The AI Threat Taxonomy",
          content: [
            "Modern threats fall into distinct categories that require specialized detection and response architectures:",
            "• Synthetic Identity Fraud: AI-generated personas combining real and fabricated data to create untraceable identities",
            "• Deepfake Manipulation: Voice, video, and image synthesis used for impersonation, fraud, and disinformation",
            "• Automated Social Engineering: AI-powered phishing and manipulation campaigns that adapt in real-time",
            "• Algorithmic Exploitation: Machine learning systems designed to find and exploit vulnerabilities at scale",
          ]
        },
        {
          title: "G3TI Defense Architecture",
          content: [
            "G3TI's autonomous intelligence architecture operates across multiple layers:",
            "• Neural Behavior Modeling: Pattern recognition systems that identify malicious intent before action",
            "• Real-time Forensics: Millisecond-level analysis of voice, text, and image authenticity",
            "• Predictive Threat Mapping: OSINT fusion that anticipates attack vectors before deployment",
            "• Autonomous Response: Counter-maneuver systems that neutralize threats without human intervention",
          ]
        }
      ]}
    />
  )
}
