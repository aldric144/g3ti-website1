'use client'

import { DossierPage } from '@/components/DossierPage'

export default function HumanProtectionPledgePage() {
  return (
    <DossierPage
      title="Human Protection Pledge"
      subtitle="G3TI's foundational commitment to protecting human life and dignity."
      category="compliance"
      content={[
        "The Human Protection Pledge is the foundational document of G3TI's mission. Every system we build, every capability we develop, and every decision we make is guided by this singular purpose: protecting human beings from harm.",
        "In an era of AI-enabled threats, automated deception, and digital exploitation, human protection requires new approaches. G3TI exists to develop and deploy these approaches—autonomous intelligence systems that defend humanity at machine speed.",
        "This pledge represents our solemn commitment to the people we serve and the communities we protect.",
      ]}
      sections={[
        {
          title: "Our Pledge",
          content: [
            "We pledge to:",
            "• Develop technology solely for the protection of human life and dignity",
            "• Never create systems designed to harm, exploit, or deceive",
            "• Prioritize the safety of vulnerable populations in all our work",
            "• Maintain transparency about our capabilities and limitations",
            "• Collaborate with law enforcement, government, and civil society",
            "• Continuously improve our systems to address emerging threats",
            "• Hold ourselves accountable to the highest ethical standards",
          ]
        },
        {
          title: "Protected Populations",
          content: [
            "G3TI's protective intelligence systems are specifically designed to defend:",
            "• Children from online exploitation and trafficking",
            "• Elderly individuals from fraud and financial abuse",
            "• Domestic violence survivors from escalating threats",
            "• Communities from organized criminal networks",
            "• Critical infrastructure from cyber attacks",
            "• Democratic institutions from disinformation",
          ]
        }
      ]}
    />
  )
}
