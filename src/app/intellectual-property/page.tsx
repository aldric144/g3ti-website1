import Link from 'next/link'

export default function IntellectualPropertyPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">LEGAL</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Intellectual Property</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ IP Protection</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Proprietary Technology</h2>
            <p className="text-gray-400 mb-4">Global 3 Technology &amp; Intelligence™ develops proprietary autonomous intelligence technologies protected by intellectual property laws.</p>
            <p className="text-gray-400">Our innovations represent significant investments in research and development for human protection.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Trademarks</h2>
            <p className="text-gray-400 mb-4">The following are trademarks of Global 3 Technology &amp; Intelligence™:</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Global 3 Technology &amp; Intelligence™</li>
              <li>• G3TI™</li>
              <li>• GhostQuant AI™</li>
              <li>• ID SHIELD™</li>
              <li>• ScamFirewall360™</li>
              <li>• HeartGuard AI™</li>
              <li>• HomelandWatch7™</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Patent Portfolio</h2>
            <p className="text-gray-400">G3TI maintains an active patent portfolio protecting our autonomous intelligence innovations. Patent applications are pending for multiple technologies.</p>
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
