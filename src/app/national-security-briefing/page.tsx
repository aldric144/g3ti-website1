import Link from 'next/link'

export default function NationalSecurityBriefingPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">INTELLIGENCE DOSSIER</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">National Security Briefing Packet</h1>
          <p className="text-xl text-gray-400">Strategic Intelligence Assessment for National Security Leaders</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Briefing Overview</h2>
            <p className="text-gray-400 mb-4">This briefing packet provides national security leaders with a comprehensive assessment of AI-enabled threats and G3TI&apos;s autonomous intelligence capabilities.</p>
            <p className="text-gray-400">Content is classified and available to authorized government personnel upon request.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Briefing Topics</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Current threat landscape assessment</li>
              <li>• AI-enabled threat projections</li>
              <li>• G3TI capability overview</li>
              <li>• Integration with existing infrastructure</li>
              <li>• Implementation roadmap</li>
              <li>• Resource requirements</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Intended Audience</h2>
            <p className="text-gray-400">This briefing is designed for senior government officials, national security advisors, and law enforcement leadership.</p>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300">
              Request Briefing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
