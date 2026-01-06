import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">LEGAL</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-400">Global 3 Technology &amp; Intelligence™ Privacy Commitment</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Our Commitment to Privacy</h2>
            <p className="text-gray-400 mb-4">Global 3 Technology &amp; Intelligence™ is committed to protecting the privacy and security of all individuals who interact with our platforms and services.</p>
            <p className="text-gray-400">As a company dedicated to human protection, we hold ourselves to the highest standards of data privacy and security.</p>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Information Collection</h2>
            <p className="text-gray-400 mb-4">We collect only the information necessary to provide our services and improve our protective intelligence capabilities.</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Contact information provided through our website</li>
              <li>• Technical data for security and performance optimization</li>
              <li>• Communication records for service improvement</li>
            </ul>
          </div>

          <div className="bg-[#0D0D0F] border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#12F6C8] mb-6">Data Protection</h2>
            <p className="text-gray-400">All data is protected using enterprise-grade security measures consistent with our commitment to national security standards.</p>
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
