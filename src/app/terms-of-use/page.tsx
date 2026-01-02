'use client'

import { DossierPage } from '@/components/DossierPage'

export default function TermsOfUsePage() {
  return (
    <DossierPage
      title="Terms of Use"
      subtitle="Terms and conditions governing use of G3TI services."
      category="legal"
      content={[
        "Welcome to Global 3 Technology & Intelligence™. These Terms of Use (\"Terms\") govern your access to and use of our website, products, and services. By accessing or using our services, you agree to be bound by these Terms.",
        "If you do not agree to these Terms, you may not access or use our services. We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
        "Please read these Terms carefully before using our services.",
      ]}
      sections={[
        {
          title: "Use of Services",
          content: [
            "You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:",
            "• Use our services in any way that violates applicable laws or regulations",
            "• Attempt to gain unauthorized access to our systems or networks",
            "• Interfere with or disrupt the integrity or performance of our services",
            "• Transmit any malicious code or harmful content",
            "• Impersonate any person or entity",
          ]
        },
        {
          title: "Intellectual Property",
          content: [
            "All content, features, and functionality of our services are owned by G3TI and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.",
          ]
        },
        {
          title: "Limitation of Liability",
          content: [
            "To the fullest extent permitted by law, G3TI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.",
          ]
        },
        {
          title: "Governing Law",
          content: [
            "These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.",
          ]
        }
      ]}
    />
  )
}
