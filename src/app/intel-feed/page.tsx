'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { getAllArticles, getArticlesByCategory } from '@/lib/articles'
import { Article, ArticleCategory, getCategoryDisplayName, getAllCategories } from '@/lib/intelGenerator'

function CategoryTag({ category, isActive, onClick }: { category: ArticleCategory | 'all'; isActive: boolean; onClick: () => void }) {
  const displayName = category === 'all' ? 'All Intelligence' : getCategoryDisplayName(category as ArticleCategory)
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
        isActive 
          ? 'bg-[#12F6C8] text-black shadow-lg shadow-[#12F6C8]/30' 
          : 'bg-[#0A0A0C] border border-[#12F6C8]/20 text-gray-400 hover:border-[#12F6C8]/50 hover:text-[#12F6C8]'
      }`}
    >
      {displayName}
    </button>
  )
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
      )
    }
  }, [index])

  const threatLevelColor = article.tags.includes('critical') 
    ? 'text-red-400 border-red-400/30' 
    : article.tags.includes('high')
    ? 'text-orange-400 border-orange-400/30'
    : 'text-yellow-400 border-yellow-400/30'

  return (
    <Link href={`/intel-feed/${article.slug}.html`}>
      <div 
        ref={cardRef}
        className="relative p-6 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg overflow-hidden group hover:border-[#12F6C8]/50 transition-all duration-300 cursor-pointer h-full"
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#12F6C8]/40 group-hover:border-[#12F6C8]/80 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#12F6C8]/40 group-hover:border-[#12F6C8]/80 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#12F6C8]/40 group-hover:border-[#12F6C8]/80 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#12F6C8]/40 group-hover:border-[#12F6C8]/80 transition-colors" />
        
        {/* Scanner sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12F6C8]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(18,246,200,0.03) 2px, rgba(18,246,200,0.03) 4px)'
          }} />
        </div>

        <div className="relative z-10">
          {/* Category and threat level */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#12F6C8] text-xs font-mono tracking-wider">
              {getCategoryDisplayName(article.category)}
            </span>
            <span className={`text-xs font-mono px-2 py-1 rounded border ${threatLevelColor}`}>
              {article.tags.find(t => ['critical', 'high', 'elevated', 'moderate'].includes(t))?.toUpperCase() || 'INTEL'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-[#12F6C8] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {article.summary}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function IntelFeedPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 9

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (activeCategory === 'all') {
      setArticles(getAllArticles())
    } else {
      setArticles(getArticlesByCategory(activeCategory))
    }
    setCurrentPage(1)
  }, [activeCategory])

  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const paginatedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#12F6C8 1px, transparent 1px), linear-gradient(90deg, #12F6C8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(18,246,200,0.03) 2px, rgba(18,246,200,0.03) 4px)'
          }} />
        </div>

        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-6">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#12F6C8] animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#12F6C8] animate-ping opacity-75" />
              </div>
              <span className="text-[#12F6C8] text-sm tracking-wider font-mono">LIVE INTELLIGENCE FEED</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">NEWS &</span><br />
              <span className="text-[#12F6C8] glow-text">INTELLIGENCE</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Real-time threat intelligence briefings from G3TI autonomous monitoring systems. 
              Stay informed on emerging threats, attack patterns, and protective countermeasures.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <CategoryTag 
              category="all" 
              isActive={activeCategory === 'all'} 
              onClick={() => setActiveCategory('all')} 
            />
            {getAllCategories().map(category => (
              <CategoryTag 
                key={category}
                category={category} 
                isActive={activeCategory === category} 
                onClick={() => setActiveCategory(category)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-[#0A0A0C] border border-[#12F6C8]/20 text-gray-400 hover:border-[#12F6C8]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-[#12F6C8] text-black'
                          : 'bg-[#0A0A0C] border border-[#12F6C8]/20 text-gray-400 hover:border-[#12F6C8]/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-[#0A0A0C] border border-[#12F6C8]/20 text-gray-400 hover:border-[#12F6C8]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No intelligence briefings available for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need <span className="text-[#12F6C8]">Classified Intelligence</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            Government agencies and enterprise clients can access classified threat briefings 
            and real-time intelligence feeds through our secure portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact.html" 
              className="px-8 py-4 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all"
            >
              Request Access
            </Link>
            <Link 
              href="/government.html" 
              className="px-8 py-4 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all"
            >
              Government Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
