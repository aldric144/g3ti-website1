'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ResponsibleAIPage() {
  return (
    <DossierPage
      title="Responsible AI Commitment"
      subtitle="Our pledge to develop AI systems that protect and empower humanity."
      category="compliance"
      content={[
        "G3TI's mission is human protection. Every AI system we develop is designed with this singular purpose in mind. Our Responsible AI Commitment outlines the ethical principles that guide our work and our pledge to the communities we serve.",
        "We believe that AI technology, properly developed and deployed, can be a powerful force for protecting vulnerable populations, preventing crime, and enhancing public safety. We also recognize that AI systems can cause harm if developed without proper safeguards.",
        "This commitment represents our promise to develop AI responsibly, transparently, and in service of human welfare.",
      ]}
      sections={[
        {
          title: "Our Commitments",
          content: [
            "• We will never develop AI systems designed to harm individuals or communities",
            "• We will maintain human oversight of all autonomous decision-making",
            "• We will be transparent about AI capabilities and limitations",
            "• We will actively work to identify and mitigate bias in our systems",
            "• We will protect the privacy and dignity of all individuals",
            "• We will collaborate with civil society to ensure our systems serve the public good",
          ]
        },
        {
          title: "Accountability Measures",
          content: [
            "G3TI maintains robust accountability measures including regular third-party audits, public reporting on AI system performance, and accessible channels for reporting concerns about our systems.",
          ]
        }
      ]}
    />
  )
}
