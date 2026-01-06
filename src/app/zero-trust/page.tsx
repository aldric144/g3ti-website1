import Link from 'next/link'

export default function ZeroTrustPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">COMPLIANCE</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Zero Trust</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Zero Trust Security Architecture</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Zero Trust Principles</h2>
            <p className="text-gray-400 mb-4">G3TI implements a comprehensive zero-trust security architecture that assumes no implicit trust and continuously verifies every access request.</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Never trust, always verify</li>
              <li>• Least privilege access</li>
              <li>• Micro-segmentation</li>
              <li>• Continuous monitoring and validation</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Implementation</h2>
            <p className="text-gray-400">Our zero-trust implementation aligns with federal government requirements and provides the security foundation for our autonomous intelligence platforms.</p>
          </div>

          <div className="text-center">
            <Link href="/" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
