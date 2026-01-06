import Link from 'next/link'

export default function GovernmentPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">MISSION CRITICAL</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Government &amp; Law Enforcement</h1>
          <p className="text-xl text-gray-400">Mission-critical intelligence solutions for federal, state, and local agencies protecting national security and communities.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#12F6C8]">DHS-Ready Intelligence Platforms</h2>
              <p className="text-gray-400 mb-6">Our platforms are designed to meet the rigorous requirements of federal agencies while providing cutting-edge autonomous intelligence capabilities.</p>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>FedRAMP compliance pathway</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>CJIS security policy alignment</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>NIST cybersecurity framework integration</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>Zero-trust architecture</li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden h-80">
              <img src="/g3ti/detective.jpg" alt="Law enforcement" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Border Intelligence</h3>
              <p className="text-gray-400">Real-time threat detection and tracking for border security operations.</p>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Fusion Center Integration</h3>
              <p className="text-gray-400">Seamless integration with existing fusion center infrastructure and protocols.</p>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Threat Mapping</h3>
              <p className="text-gray-400">Advanced geospatial threat analysis and predictive intelligence.</p>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Human Trafficking Detection</h3>
              <p className="text-gray-400">AI-powered identification of trafficking networks and victim rescue support.</p>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Deepfake Forensics</h3>
              <p className="text-gray-400">Real-time detection and analysis of synthetic media threats.</p>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">OSINT Intelligence</h3>
              <p className="text-gray-400">Comprehensive open-source intelligence gathering and analysis.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Request Government Briefing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
