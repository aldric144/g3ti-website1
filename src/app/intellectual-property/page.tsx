import DossierPage from '@/components/DossierPage';

export default function IntellectualPropertyPage() {
  return (
    <DossierPage
      title="Intellectual Property Protection"
      subtitle="Protecting G3TI's Innovations and Trademarks"
      classification="LEGAL"
      sections={[
        {
          title: "TRADEMARKS",
          content: [
            "Global 3 Technology & Intelligence™, G3TI™, and associated logos are trademarks of Global 3 Technology & Intelligence.",
            "GhostQuant AI™, ID SHIELD™, ScamFirewall360™, HeartGuard AI™, and HomelandWatch7™ are trademarks of G3TI.",
            "Unauthorized use of our trademarks is prohibited."
          ]
        },
        {
          title: "COPYRIGHTS",
          content: [
            "All content on this website, including text, graphics, logos, and software, is the property of G3TI and protected by copyright laws.",
            "You may not reproduce, distribute, or create derivative works without express written permission."
          ]
        },
        {
          title: "PATENTS",
          content: [
            "G3TI's autonomous protective intelligence technologies may be protected by patents or pending patent applications.",
            "Unauthorized use of our patented technologies is prohibited."
          ]
        },
        {
          title: "TRADE SECRETS",
          content: [
            "G3TI's proprietary algorithms, methodologies, and technical processes are protected as trade secrets.",
            "Unauthorized access, use, or disclosure of our trade secrets is prohibited and may result in legal action."
          ]
        },
        {
          title: "ENFORCEMENT",
          content: [
            "G3TI actively monitors for and enforces its intellectual property rights.",
            "If you believe your intellectual property rights have been infringed, please contact us."
          ]
        }
      ]}
    />
  );
}
