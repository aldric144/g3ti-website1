import Link from 'next/link'

export default function ThreatArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">INTELLIGENCE DOSSIER</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Threat Architecture Whitepaper</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Threat Landscape Analysis</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Executive Summary</h2>
            <p className="text-gray-400 mb-4">The global threat landscape has fundamentally transformed. Deception is now automated, identity is weaponized, and crime moves at machine speed.</p>
            <p className="text-gray-400">This whitepaper provides a comprehensive analysis of emerging AI-enabled threats and the autonomous intelligence architectures required to counter them.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Key Threat Vectors</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Synthetic identity fraud</li>
              <li>• Deepfake voice and video attacks</li>
              <li>• AI-generated manipulation</li>
              <li>• Automated social engineering</li>
              <li>• Cross-platform fraud networks</li>
              <li>• AI-enabled human trafficking</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">G3TI Response Architecture</h2>
            <p className="text-gray-400">G3TI&apos;s autonomous intelligence systems are engineered to detect, predict, and neutralize these threats before they manifest.</p>
          </div>

          <div className="text-center">
            <Link href="/threat-architecture-addendum" className="inline-block px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300 mr-4">
              View Addendum
            </Link>
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request Full Document
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
