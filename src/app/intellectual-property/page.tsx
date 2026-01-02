'use client'

import { DossierPage } from '@/components/DossierPage'

export default function IntellectualPropertyPage() {
  return (
    <DossierPage
      title="Intellectual Property Notice"
      subtitle="Trademarks, patents, and proprietary technology of G3TI."
      category="legal"
      content={[
        "Global 3 Technology & Intelligence™ owns and protects a substantial portfolio of intellectual property including trademarks, patents, trade secrets, and proprietary technologies. This notice provides information about our intellectual property rights.",
        "All G3TI intellectual property is protected by applicable laws and international treaties. Unauthorized use of our intellectual property is strictly prohibited and will be vigorously enforced.",
        "This notice is intended to inform users, partners, and the public about our intellectual property rights and the protections we maintain.",
      ]}
      sections={[
        {
          title: "Trademarks",
          content: [
            "The following are trademarks of Global 3 Technology & Intelligence™:",
            "• Global 3 Technology & Intelligence™",
            "• G3TI™",
            "• GhostQuant AI™",
            "• ID SHIELD™",
            "• ScamFirewall360™",
            "• HeartGuard AI™",
            "• HomelandWatch7™",
            "These marks may not be used without express written permission from G3TI.",
          ]
        },
        {
          title: "Patents and Trade Secrets",
          content: [
            "G3TI maintains an active patent portfolio covering our autonomous intelligence technologies. Additionally, significant aspects of our systems are protected as trade secrets.",
            "Patent applications are pending for multiple G3TI technologies. Specific patent information is available upon request for authorized parties.",
          ]
        },
        {
          title: "Proprietary Technology",
          content: [
            "All G3TI software, algorithms, methodologies, and technical documentation are proprietary and confidential. Access to proprietary technology is provided only under appropriate non-disclosure agreements.",
          ]
        }
      ]}
    />
  )
}
