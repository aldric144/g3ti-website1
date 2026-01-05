import DossierPage from '@/components/DossierPage';

export default function TermsOfUsePage() {
  return (
    <DossierPage
      title="Terms of Use"
      subtitle="Terms and Conditions for Using G3TI Services"
      classification="LEGAL"
      sections={[
        {
          title: "ACCEPTANCE OF TERMS",
          content: [
            "By accessing or using G3TI services, you agree to be bound by these Terms of Use.",
            "If you do not agree to these terms, do not use our services."
          ]
        },
        {
          title: "USE OF SERVICES",
          content: [
            "You may use our services only for lawful purposes and in accordance with these terms.",
            "You agree not to use our services in any way that violates applicable laws or regulations.",
            "You agree not to attempt to gain unauthorized access to our systems or networks."
          ]
        },
        {
          title: "INTELLECTUAL PROPERTY",
          content: [
            "All content, features, and functionality of our services are owned by G3TI and protected by intellectual property laws.",
            "You may not reproduce, distribute, or create derivative works without our express written permission."
          ]
        },
        {
          title: "LIMITATION OF LIABILITY",
          content: [
            "G3TI shall not be liable for any indirect, incidental, special, or consequential damages.",
            "Our total liability shall not exceed the amount paid by you for our services."
          ]
        },
        {
          title: "GOVERNING LAW",
          content: [
            "These terms shall be governed by the laws of the State of Florida.",
            "Any disputes shall be resolved in the courts of Palm Beach County, Florida."
          ]
        }
      ]}
    />
  );
}
