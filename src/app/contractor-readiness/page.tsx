import Link from 'next/link'

export default function ContractorReadinessPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">INTELLIGENCE DOSSIER</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contractor Readiness Binder</h1>
          <p className="text-xl text-gray-400">Federal Contractor Qualification Documentation</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Contractor Qualifications</h2>
            <p className="text-gray-400 mb-4">Global 3 Technology &amp; Intelligence™ maintains comprehensive documentation demonstrating our readiness to serve as a federal contractor.</p>
            <p className="text-gray-400">This binder contains all required certifications, compliance documentation, and capability statements.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Documentation Included</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Company capability statement</li>
              <li>• Past performance references</li>
              <li>• Security clearance documentation</li>
              <li>• Compliance certifications</li>
              <li>• Insurance and bonding information</li>
              <li>• Key personnel qualifications</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Veteran-Owned Status</h2>
            <p className="text-gray-400">G3TI is a verified veteran-owned small business, eligible for set-aside contracts and preferential consideration in federal procurement.</p>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request Contractor Package
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
