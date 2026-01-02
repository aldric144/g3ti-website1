'use client'

import { DossierPage } from '@/components/DossierPage'

export default function SecurityNoticePage() {
  return (
    <DossierPage
      title="Security Notice"
      subtitle="Important security information for G3TI users and partners."
      category="legal"
      content={[
        "Global 3 Technology & Intelligence™ takes security seriously. This Security Notice provides important information about our security practices and your responsibilities when using our services.",
        "As a company providing protective intelligence solutions, we maintain the highest security standards across all our operations. We expect our users and partners to maintain similar vigilance.",
        "This notice is intended to help you understand our security posture and how to interact with us securely.",
      ]}
      sections={[
        {
          title: "Our Security Practices",
          content: [
            "G3TI implements comprehensive security measures including:",
            "• End-to-end encryption for all sensitive communications",
            "• Multi-factor authentication for all system access",
            "• Regular security audits and penetration testing",
            "• 24/7 security monitoring and incident response",
            "• Employee security training and background checks",
          ]
        },
        {
          title: "Secure Communications",
          content: [
            "When communicating with G3TI:",
            "• Use official G3TI email addresses (@g3ti.com) only",
            "• Verify the identity of anyone claiming to represent G3TI",
            "• Never share sensitive information through unsecured channels",
            "• Report any suspicious communications to security@g3ti.com",
          ]
        },
        {
          title: "Reporting Security Concerns",
          content: [
            "If you identify a security vulnerability or have security concerns, please report them immediately to security@g3ti.com. We take all reports seriously and will respond promptly.",
          ]
        }
      ]}
    />
  )
}
