import DossierPage from '@/components/DossierPage';

export default function ThreatArchitecturePage() {
  return (
    <DossierPage
      title="Threat Architecture Whitepaper"
      subtitle="Understanding the Modern AI-Enabled Threat Landscape"
      classification="INTELLIGENCE DOSSIER"
      sections={[
        {
          title: "EXECUTIVE SUMMARY",
          content: [
            "The global threat landscape has fundamentally transformed. Artificial intelligence has weaponized deception, automated fraud, and accelerated criminal operations beyond human-speed response capabilities.",
            "This whitepaper examines the architectural foundations of modern AI-enabled threats and presents G3TI's autonomous protective intelligence framework for countering them."
          ]
        },
        {
          title: "THE AI THREAT EVOLUTION",
          content: [
            "Every 11 seconds, a new digital extortion attempt is launched. More than 50% of all global fraud now contains an AI-generated element.",
            "Deepfake voice attacks have increased 3,000% since 2022. Synthetic-identity crime has become the fastest-growing form of financial fraud in the United States.",
            "Domestic-violence escalations now begin online 72% of the time. Human-trafficking networks increasingly use AI to hide, recruit, and evade detection."
          ]
        },
        {
          title: "THREAT VECTORS",
          content: [
            "SYNTHETIC IDENTITY FRAUD: AI-generated identities that pass traditional verification systems.",
            "DEEPFAKE MANIPULATION: Voice cloning and video synthesis for social engineering attacks.",
            "AUTOMATED SOCIAL ENGINEERING: AI-powered phishing and manipulation at scale.",
            "BEHAVIORAL EXPLOITATION: Machine learning models that predict and exploit human vulnerabilities."
          ]
        },
        {
          title: "G3TI COUNTERMEASURES",
          content: [
            "G3TI's autonomous protective intelligence architecture addresses these threats through multi-layered detection and response systems.",
            "Our systems analyze, adapt, and counter-maneuver without waiting for human intervention—matching machine-speed threats with machine-speed protection."
          ]
        }
      ]}
    />
  );
}
