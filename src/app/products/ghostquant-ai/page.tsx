import Link from 'next/link'

export default function GhostQuantAIPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">CLASSIFIED SYSTEM</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">GhostQuant AI™</h1>
          <p className="text-xl text-gray-400">Quantum-Resistant Cryptographic Intelligence Platform</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">SYSTEM OVERVIEW</h2>
            <p className="text-gray-400 mb-4">GhostQuant AI™ represents the next generation of cryptographic intelligence, designed to protect against both current and future quantum computing threats.</p>
            <p className="text-gray-400">Full capabilities are proprietary and under active development.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">CAPABILITY DOMAINS</h2>
            <ul className="space-y-3 text-gray-400">
              <li>• Post-quantum cryptographic protocols</li>
              <li>• Quantum-safe key exchange mechanisms</li>
              <li>• Future-proof encryption standards</li>
              <li>• Cryptographic agility frameworks</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/products" className="inline-block px-8 py-4 bg-transparent border-2 border-[#12F6C8] text-[#12F6C8] hover:bg-[#12F6C8] hover:text-black font-semibold rounded-lg transition-all duration-300 mr-4">
              View All Products
            </Link>
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
