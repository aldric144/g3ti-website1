import Link from 'next/link'

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">LEGAL</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Use</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Terms and Conditions</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Acceptance of Terms</h2>
            <p className="text-gray-400">By accessing and using the Global 3 Technology &amp; Intelligence™ website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Use of Services</h2>
            <p className="text-gray-400 mb-4">Our services are provided for lawful purposes only. Users agree not to:</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Use services for any unlawful purpose</li>
              <li>• Attempt to gain unauthorized access to systems</li>
              <li>• Interfere with the proper functioning of services</li>
              <li>• Misrepresent identity or affiliation</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Intellectual Property</h2>
            <p className="text-gray-400">All content, trademarks, and intellectual property on this website are owned by Global 3 Technology &amp; Intelligence™ and protected by applicable laws.</p>
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
