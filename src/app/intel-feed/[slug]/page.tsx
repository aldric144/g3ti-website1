import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { getCategoryDisplayName } from '@/lib/intelGenerator'

// Generate static params for all articles
export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

function ArticleContent({ content }: { content: string }) {
  // Simple markdown-like rendering
  const lines = content.split('\n')
  
  return (
    <div className="prose prose-invert max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold text-[#12F6C8] mt-8 mb-4">{line.replace('## ', '')}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="text-white font-semibold my-2">{line.replace(/\*\*/g, '')}</p>
        }
        if (line.startsWith('- **')) {
          const parts = line.replace('- **', '').split('**')
          return (
            <div key={i} className="flex items-start gap-3 my-2">
              <div className="w-2 h-2 rounded-full bg-[#12F6C8] mt-2 flex-shrink-0" />
              <p className="text-gray-300">
                <span className="text-white font-semibold">{parts[0]}</span>
                {parts[1]}
              </p>
            </div>
          )
        }
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
          const num = line.charAt(0)
          const text = line.substring(3)
          const parts = text.split('**')
          return (
            <div key={i} className="flex items-start gap-3 my-2">
              <div className="w-6 h-6 rounded-full bg-[#12F6C8]/20 border border-[#12F6C8]/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[#12F6C8] text-sm font-mono">{num}</span>
              </div>
              <p className="text-gray-300">
                {parts.length > 1 ? (
                  <>
                    <span className="text-white font-semibold">{parts[1]}</span>
                    {parts[2]}
                  </>
                ) : text}
              </p>
            </div>
          )
        }
        if (line.startsWith('---')) {
          return <hr key={i} className="border-[#12F6C8]/20 my-6" />
        }
        if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
          return <p key={i} className="text-gray-500 italic text-sm my-4">{line.replace(/\*/g, '')}</p>
        }
        if (line.trim() === '') {
          return <div key={i} className="h-4" />
        }
        return <p key={i} className="text-gray-300 leading-relaxed my-2">{line}</p>
      })}
    </div>
  )
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const cleanSlug = params.slug?.replace('.html', '') || ''
  const article = getArticleBySlug(cleanSlug)

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Intelligence Briefing Not Found</h1>
          <p className="text-gray-400 mb-8">The requested briefing could not be located.</p>
          <Link 
            href="/intel-feed.html" 
            className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg"
          >
            Return to Intel Feed
          </Link>
        </div>
      </div>
    )
  }

  const threatLevel = article.tags.find(t => ['critical', 'high', 'elevated', 'moderate'].includes(t)) || 'intel'
  const threatLevelColor = threatLevel === 'critical' 
    ? 'text-red-400 border-red-400/30 bg-red-400/10' 
    : threatLevel === 'high'
    ? 'text-orange-400 border-orange-400/30 bg-orange-400/10'
    : 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* SEO Meta - would be in head in production */}
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
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

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/intel-feed.html" className="hover:text-[#12F6C8] transition-colors">Intel Feed</Link>
            <span>/</span>
            <span className="text-[#12F6C8]">{getCategoryDisplayName(article.category)}</span>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-mono px-3 py-1 rounded border ${threatLevelColor}`}>
              THREAT LEVEL: {threatLevel.toUpperCase()}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded border border-[#12F6C8]/30 text-[#12F6C8] bg-[#12F6C8]/10">
              {getCategoryDisplayName(article.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{article.author}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg">
            <p className="text-gray-300 leading-relaxed">{article.summary}</p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#12F6C8]/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#12F6C8]/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#12F6C8]/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#12F6C8]/40" />

            <ArticleContent content={article.body} />
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h4 className="text-sm font-mono text-gray-500 mb-3">TAGS</h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs font-mono bg-[#0A0A0C] border border-[#12F6C8]/20 text-gray-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <Link 
              href="/intel-feed.html"
              className="flex items-center gap-2 text-[#12F6C8] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Intel Feed
            </Link>
            
            <Link 
              href="/contact.html"
              className="px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all"
            >
              Request Briefing
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Informed on <span className="text-[#12F6C8]">Emerging Threats</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to G3TI intelligence briefings for real-time threat updates.
          </p>
          <Link 
            href="/intel-feed.html"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all"
          >
            View All Intelligence Briefings
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
