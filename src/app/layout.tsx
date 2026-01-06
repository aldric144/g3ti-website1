import type { Metadata } from "next";
import "./globals.css";
import ExperienceProvider from "@/components/layout/ExperienceProvider";
import ThoughtRibbon from "@/components/layout/ThoughtRibbon";
import Footer from "@/components/layout/Footer";
import CorticalSlide from "@/components/animations/CorticalSlide";

export const metadata: Metadata = {
  title: "G3TI | Digital Intelligence Environment",
  description: "Global 3 Technology & Intelligence - Autonomous Protective Intelligence for the AI Threat Era. We don't make technology — we make technology intelligent.",
  keywords: "G3TI, autonomous intelligence, AI security, threat detection, cybersecurity, deepfake detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-white min-h-screen antialiased">
        <ExperienceProvider>
          <ThoughtRibbon />
          <CorticalSlide>
            <main className="pt-20">
              {children}
            </main>
          </CorticalSlide>
          <Footer />
        </ExperienceProvider>
      </body>
    </html>
  );
}
