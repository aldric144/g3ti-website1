import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Global 3 Technology & Intelligence™ | Autonomous Protective Intelligence',
  description: 'G3TI develops autonomous intelligence architectures for synthetic identity detection, deepfake separation, neural behavior modeling, and government-grade security systems. Human Protection. AI Precision. National Impact.',
  keywords: 'autonomous intelligence, AI security, deepfake detection, synthetic identity, fraud prevention, national security, law enforcement technology, OSINT, threat intelligence',
  authors: [{ name: 'Global 3 Technology & Intelligence™' }],
  openGraph: {
    title: 'Global 3 Technology & Intelligence™',
    description: 'Autonomous Protective Intelligence for the AI Threat Era',
    url: 'https://g3ti.com',
    siteName: 'G3TI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global 3 Technology & Intelligence™',
    description: 'Autonomous Protective Intelligence for the AI Threat Era',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-neural-dark text-gray-200 antialiased`}>
        <div className="scanline-overlay" />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
