import Link from 'next/link'

export default function HumanProtectionPledgePage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">COMPLIANCE</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Human Protection Pledge</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Commitment to Humanity</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Our Pledge</h2>
            <p className="text-gray-400 mb-4">Global 3 Technology &amp; Intelligence™ pledges to develop and deploy autonomous intelligence systems that prioritize human protection above all else.</p>
            <p className="text-[#12F6C8] font-semibold text-xl">Human Protection. AI Precision. National Impact.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Commitment Areas</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Protecting victims of crime and abuse</li>
              <li>• Defending against AI-enabled threats</li>
              <li>• Supporting law enforcement missions</li>
              <li>• Safeguarding national security</li>
              <li>• Preserving human dignity and rights</li>
            </ul>
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
