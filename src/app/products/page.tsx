import Link from 'next/link'

const products = [
  { name: 'GhostQuant AI™', href: '/products/ghostquant-ai', description: 'Quantum-resistant cryptographic intelligence platform for next-generation threat detection.' },
  { name: 'ID SHIELD™', href: '/products/id-shield', description: 'Advanced identity protection and synthetic identity detection system.' },
  { name: 'ScamFirewall360™', href: '/products/scamfirewall360', description: 'Comprehensive scam prevention and fraud detection ecosystem.' },
  { name: 'HeartGuard AI™', href: '/products/heartguard-ai', description: 'Domestic violence prediction and victim protection intelligence.' },
  { name: 'HomelandWatch7™', href: '/products/homelandwatch7', description: 'National security threat monitoring and border intelligence platform.' },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#12F6C8]/20 text-[#12F6C8] text-sm font-semibold rounded-full mb-6">CLASSIFIED SYSTEMS</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Intelligence Products</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Full capabilities are proprietary and under active development. Product names represent autonomous intelligence architectures designed for specific threat domains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group bg-[#0D0D0F] p-8 rounded-xl border border-gray-800 hover:border-[#12F6C8] transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#12F6C8] transition-colors">{product.name}</h3>
                <p className="text-sm text-[#0B85E5] mb-4">Names Only</p>
                <p className="text-gray-400">{product.description}</p>
                <div className="mt-6 text-[#12F6C8] group-hover:translate-x-2 transition-transform">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-8">Interested in learning more about our intelligence capabilities?</p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Request Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
