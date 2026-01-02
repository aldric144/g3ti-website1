'use client'

import { DossierPage } from '@/components/DossierPage'

export default function PrivacyPolicyPage() {
  return (
    <DossierPage
      title="Privacy Policy"
      subtitle="How G3TI collects, uses, and protects your information."
      category="legal"
      content={[
        "Global 3 Technology & Intelligence™ (\"G3TI\", \"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
        "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.",
        "We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the \"Last Updated\" date of this Privacy Policy.",
      ]}
      sections={[
        {
          title: "Information We Collect",
          content: [
            "We may collect information about you in a variety of ways including:",
            "• Personal Data: Name, email address, phone number, and other contact information you voluntarily provide",
            "• Usage Data: Information about how you access and use our website and services",
            "• Device Data: Information about your device, browser, and IP address",
            "• Cookies: Data collected through cookies and similar tracking technologies",
          ]
        },
        {
          title: "Use of Your Information",
          content: [
            "We may use information collected about you to:",
            "• Provide, operate, and maintain our services",
            "• Improve, personalize, and expand our services",
            "• Communicate with you about our services",
            "• Process transactions and send related information",
            "• Comply with legal obligations",
          ]
        },
        {
          title: "Data Security",
          content: [
            "We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect or impenetrable.",
          ]
        },
        {
          title: "Contact Us",
          content: [
            "If you have questions or comments about this Privacy Policy, please contact us at privacy@g3ti.com.",
          ]
        }
      ]}
    />
  )
}
