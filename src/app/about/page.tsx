import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">DECLASSIFIED</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Origin Dossier</h1>
          <p className="text-xl text-gray-400">The Genesis of Global 3 Technology &amp; Intelligence™</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Founding Vision */}
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">FOUNDING VISION</h2>
            <div className="space-y-4 text-gray-400">
              <p>Global 3 Technology &amp; Intelligence™ (G3TI) was founded with a singular mission: to protect humanity from the emerging threats of the AI era.</p>
              <p>In a world where deception is automated, identity is weaponized, and crime moves at machine speed, traditional security systems have become obsolete. G3TI was built to fill this critical gap.</p>
              <p className="text-white font-semibold">We are not a software company. We are a defensive intelligence organism.</p>
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">LEADERSHIP</h2>
            <div className="space-y-4 text-gray-400">
              <p>Founded by Dr. Aldric Marshall — U.S. veteran, national security expert, Director of Victim Services, and global advocate for human protection.</p>
              <p>Dr. Marshall&apos;s unique combination of military service, intelligence expertise, and victim advocacy has shaped G3TI&apos;s human-first approach to autonomous protective intelligence.</p>
              <p>Our leadership team brings together decades of experience in national security, artificial intelligence, cybersecurity, and victim protection services.</p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">MISSION</h2>
            <p className="text-xl text-white font-semibold mb-4">Human Protection. AI Precision. National Impact.</p>
            <div className="space-y-4 text-gray-400">
              <p>We develop autonomous intelligence architectures that detect threats before they manifest, not after the damage is done.</p>
              <p>When criminals evolve, our systems evolve faster. When deception becomes algorithmic, our detection becomes anticipatory. When bad actors hide behind machines, our intelligence sees through them.</p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">VALUES</h2>
            <div className="space-y-4 text-gray-400">
              <p><span className="text-white font-semibold">PROTECTION FIRST:</span> Every system we build prioritizes human safety above all else.</p>
              <p><span className="text-white font-semibold">INNOVATION WITHOUT COMPROMISE:</span> We invent new threat models because the dangers facing the world are exponential, not incremental.</p>
              <p><span className="text-white font-semibold">VETERAN INTEGRITY:</span> As a veteran-owned company, we operate with the discipline, honor, and commitment that military service instills.</p>
              <p><span className="text-white font-semibold">MISSION DRIVEN:</span> We are not chasing the AI revolution. We are redefining it for human protection.</p>
            </div>
          </div>

          {/* Headquarters */}
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">HEADQUARTERS</h2>
            <div className="space-y-4 text-gray-400">
              <p>Global 3 Technology &amp; Intelligence™ is headquartered in Palm Beach, Florida.</p>
              <p>Our location positions us at the intersection of federal government partnerships, international intelligence cooperation, and cutting-edge technology development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
