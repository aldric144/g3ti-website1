import Link from 'next/link'

export default function ResponsibleAIPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">COMPLIANCE</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Responsible AI</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Responsible AI Commitment</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Our Commitment</h2>
            <p className="text-gray-400 mb-4">G3TI is committed to developing and deploying AI systems that are safe, beneficial, and aligned with human values.</p>
            <p className="text-gray-400">Our mission of human protection guides every aspect of our AI development.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Responsible AI Principles</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Safety and security by design</li>
              <li>• Fairness and non-discrimination</li>
              <li>• Privacy and data protection</li>
              <li>• Transparency and explainability</li>
              <li>• Human-centered development</li>
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
