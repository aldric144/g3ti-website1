import Link from 'next/link'

export default function FedRAMPAlignmentPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">COMPLIANCE</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">FedRAMP Alignment Packet</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Federal Cloud Security</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">FedRAMP Compliance Pathway</h2>
            <p className="text-gray-400 mb-4">G3TI is committed to achieving FedRAMP authorization to provide cloud services to federal agencies.</p>
            <p className="text-gray-400">Our security architecture is designed to meet FedRAMP Moderate baseline requirements.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Security Controls</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Access control and identity management</li>
              <li>• Audit and accountability</li>
              <li>• Security assessment and authorization</li>
              <li>• Configuration management</li>
              <li>• Contingency planning</li>
              <li>• Incident response</li>
              <li>• System and communications protection</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request FedRAMP Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
