import DossierPage from '@/components/DossierPage';

export default function AboutPage() {
  return (
    <DossierPage
      title="Origin Dossier"
      subtitle="The Genesis of Global 3 Technology & Intelligence™"
      classification="DECLASSIFIED"
      sections={[
        {
          title: "FOUNDING VISION",
          content: [
            "Global 3 Technology & Intelligence™ (G3TI) was founded with a singular mission: to protect humanity from the emerging threats of the AI era.",
            "In a world where deception is automated, identity is weaponized, and crime moves at machine speed, traditional security systems have become obsolete. G3TI was built to fill this critical gap.",
            "We are not a software company. We are a defensive intelligence organism."
          ]
        },
        {
          title: "LEADERSHIP",
          content: [
            "Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.",
            "Dr. Marshall's unique combination of military service, intelligence expertise, and victim advocacy has shaped G3TI's human-first approach to autonomous protective intelligence.",
            "Our leadership team brings together decades of experience in national security, artificial intelligence, cybersecurity, and victim protection services."
          ]
        },
        {
          title: "MISSION",
          content: [
            "Human Protection. AI Precision. National Impact.",
            "We develop autonomous intelligence architectures that detect threats before they manifest, not after the damage is done.",
            "When criminals evolve, our systems evolve faster. When deception becomes algorithmic, our detection becomes anticipatory. When bad actors hide behind machines, our intelligence sees through them."
          ]
        },
        {
          title: "VALUES",
          content: [
            "PROTECTION FIRST: Every system we build prioritizes human safety above all else.",
            "INNOVATION WITHOUT COMPROMISE: We invent new threat models because the dangers facing the world are exponential, not incremental.",
            "VETERAN INTEGRITY: As a veteran-owned company, we operate with the discipline, honor, and commitment that military service instills.",
            "MISSION DRIVEN: We are not chasing the AI revolution. We are redefining it for human protection."
          ]
        },
        {
          title: "HEADQUARTERS",
          content: [
            "Global 3 Technology & Intelligence™ is headquartered in Palm Beach, Florida.",
            "Our location positions us at the intersection of federal government partnerships, international intelligence cooperation, and cutting-edge technology development."
          ]
        }
      ]}
    />
  );
}
