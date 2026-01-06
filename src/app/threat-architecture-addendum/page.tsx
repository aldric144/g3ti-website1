import Link from 'next/link'

export default function ThreatArchitectureAddendumPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">INTELLIGENCE DOSSIER</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Threat Architecture Addendum</h1>
          <p className="text-xl text-gray-400">Supplementary Analysis and Technical Specifications</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Technical Addendum</h2>
            <p className="text-gray-400 mb-4">This addendum provides additional technical specifications and implementation details for the threat architectures described in the primary whitepaper.</p>
            <p className="text-gray-400">Content is classified and available upon request to authorized parties.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Covered Topics</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Detection algorithm specifications</li>
              <li>• Neural network architectures</li>
              <li>• Integration protocols</li>
              <li>• Performance benchmarks</li>
              <li>• Deployment considerations</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/threat-architecture" className="inline-block px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300 mr-4">
              View Main Whitepaper
            </Link>
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
