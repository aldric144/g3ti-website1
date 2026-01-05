import DossierPage from '@/components/DossierPage';

export default function PrivacyPolicyPage() {
  return (
    <DossierPage
      title="Privacy Policy"
      subtitle="How We Collect, Use, and Protect Your Information"
      classification="LEGAL"
      sections={[
        {
          title: "INFORMATION COLLECTION",
          content: [
            "G3TI collects information you provide directly, such as when you contact us, request a demo, or engage with our services.",
            "We may also collect technical information automatically, including IP addresses, browser type, and usage data."
          ]
        },
        {
          title: "USE OF INFORMATION",
          content: [
            "We use collected information to provide and improve our services.",
            "To communicate with you about our products and services.",
            "To comply with legal obligations and protect our rights.",
            "To analyze and improve our website and services."
          ]
        },
        {
          title: "INFORMATION SHARING",
          content: [
            "We do not sell your personal information.",
            "We may share information with service providers who assist our operations.",
            "We may disclose information when required by law or to protect our rights."
          ]
        },
        {
          title: "DATA SECURITY",
          content: [
            "We implement appropriate technical and organizational measures to protect your information.",
            "Our security practices align with industry standards and regulatory requirements."
          ]
        },
        {
          title: "YOUR RIGHTS",
          content: [
            "You may request access to, correction of, or deletion of your personal information.",
            "Contact us at the information provided below to exercise your rights."
          ]
        },
        {
          title: "CONTACT",
          content: [
            "Global 3 Technology & Intelligence™",
            "Palm Beach, FL",
            "For privacy inquiries, please use our contact form."
          ]
        }
      ]}
    />
  );
}
