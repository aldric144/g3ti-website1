import Link from 'next/link'

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0F] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">ENTERPRISE GRADE</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Enterprise Solutions</h1>
          <p className="text-xl text-gray-400">Enterprise-grade security and intelligence solutions protecting organizations across industries.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-xl overflow-hidden h-80">
              <img src="/g3ti/teamwork.jpg" alt="Enterprise teamwork" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#12F6C8]">Protect Your Organization</h2>
              <p className="text-gray-400 mb-6">From financial institutions to healthcare providers, our AI-powered platforms safeguard your operations and customers against evolving threats.</p>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>Financial institutions fraud detection</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>Healthcare data protection and compliance</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>Educational institution safety solutions</li>
                <li className="flex items-start text-gray-400"><span className="text-[#0B85E5] mr-3">▸</span>Corporate cyber defense and threat prevention</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Financial Services</h3>
              <p className="text-gray-400 mb-4">Protect against synthetic identity fraud, account takeover, and AI-generated financial crimes.</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Real-time fraud detection</li>
                <li>• Synthetic identity prevention</li>
                <li>• Transaction anomaly analysis</li>
              </ul>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Healthcare</h3>
              <p className="text-gray-400 mb-4">Secure patient data and ensure HIPAA compliance with advanced threat detection.</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Patient data protection</li>
                <li>• HIPAA compliance monitoring</li>
                <li>• Medical identity fraud prevention</li>
              </ul>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Education</h3>
              <p className="text-gray-400 mb-4">Protect students and staff with comprehensive safety and threat detection systems.</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Campus safety monitoring</li>
                <li>• Online threat detection</li>
                <li>• Student protection systems</li>
              </ul>
            </div>
            <div className="bg-[#0D0D0F] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-[#12F6C8]">Corporate</h3>
              <p className="text-gray-400 mb-4">Enterprise-wide cyber defense and threat prevention for modern organizations.</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Executive protection intelligence</li>
                <li>• Corporate espionage detection</li>
                <li>• Insider threat monitoring</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Request Enterprise Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
