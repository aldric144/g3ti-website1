'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  getAllArticles, 
  addArticle, 
  getSchedulerState, 
  setDailySchedule, 
  setWeeklySchedule,
  updateLastGenerated,
  getPublishedCount,
  getDraftCount,
  getScheduledCount
} from '@/lib/articles'
import { generateArticle, Article, getAllCategories, getCategoryDisplayName, ArticleCategory } from '@/lib/intelGenerator'

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="p-4 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg">
      <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function ArticleRow({ article }: { article: Article }) {
  const statusColor = article.status === 'published' 
    ? 'text-green-400 bg-green-400/10 border-green-400/30'
    : article.status === 'scheduled'
    ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
    : 'text-gray-400 bg-gray-400/10 border-gray-400/30'

  return (
    <tr className="border-b border-[#12F6C8]/10 hover:bg-[#12F6C8]/5 transition-colors">
      <td className="py-4 px-4">
        <div className="text-white font-medium line-clamp-1">{article.title}</div>
        <div className="text-gray-500 text-xs mt-1">{article.slug}</div>
      </td>
      <td className="py-4 px-4">
        <span className="text-[#12F6C8] text-sm">{getCategoryDisplayName(article.category)}</span>
      </td>
      <td className="py-4 px-4">
        <span className={`text-xs font-mono px-2 py-1 rounded border ${statusColor}`}>
          {article.status.toUpperCase()}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-400 text-sm">
        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      <td className="py-4 px-4">
        <Link 
          href={`/intel-feed/${article.slug}.html`}
          className="text-[#12F6C8] hover:text-white text-sm transition-colors"
        >
          View
        </Link>
      </td>
    </tr>
  )
}

export default function AdminIntelFeedPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [schedulerState, setSchedulerStateLocal] = useState(getSchedulerState())
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'random'>('random')
  const [stats, setStats] = useState({ published: 0, draft: 0, scheduled: 0 })

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
      )
    }
    refreshData()
  }, [])

  const refreshData = () => {
    setArticles(getAllArticles())
    setSchedulerStateLocal(getSchedulerState())
    setStats({
      published: getPublishedCount(),
      draft: getDraftCount(),
      scheduled: getScheduledCount()
    })
  }

  const handleGenerateArticle = async () => {
    setIsGenerating(true)
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const category = selectedCategory === 'random' ? undefined : selectedCategory
    const newArticle = generateArticle(category)
    addArticle(newArticle)
    updateLastGenerated()
    
    refreshData()
    setIsGenerating(false)
  }

  const handleDailyToggle = () => {
    const newValue = !schedulerState.dailyEnabled
    setDailySchedule(newValue)
    setSchedulerStateLocal({ ...schedulerState, dailyEnabled: newValue })
  }

  const handleWeeklyToggle = () => {
    const newValue = !schedulerState.weeklyEnabled
    setWeeklySchedule(newValue)
    setSchedulerStateLocal({ ...schedulerState, weeklyEnabled: newValue })
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <section className="relative py-12 px-4 border-b border-[#12F6C8]/20">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#12F6C8 1px, transparent 1px), linear-gradient(90deg, #12F6C8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12F6C8]/10 border border-[#12F6C8]/30 mb-4">
                <span className="text-[#12F6C8] text-xs font-mono">ADMIN PANEL</span>
              </div>
              <h1 className="text-3xl font-bold text-white">
                Intel Feed <span className="text-[#12F6C8]">Publisher</span>
              </h1>
              <p className="text-gray-400 mt-2">Manage and generate intelligence briefings</p>
            </div>
            
            <Link 
              href="/intel-feed.html"
              className="px-4 py-2 border border-[#12F6C8]/50 text-[#12F6C8] rounded-lg hover:bg-[#12F6C8]/10 transition-all"
            >
              View Public Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Articles" value={articles.length} color="text-[#12F6C8]" />
            <StatCard label="Published" value={stats.published} color="text-green-400" />
            <StatCard label="Scheduled" value={stats.scheduled} color="text-yellow-400" />
            <StatCard label="Drafts" value={stats.draft} color="text-gray-400" />
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generate Article */}
            <div className="p-6 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Generate New Article</h3>
              
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ArticleCategory | 'random')}
                  className="w-full p-3 bg-[#050505] border border-[#12F6C8]/20 rounded-lg text-white focus:border-[#12F6C8]/50 focus:outline-none"
                >
                  <option value="random">Random Category</option>
                  {getAllCategories().map(cat => (
                    <option key={cat} value={cat}>{getCategoryDisplayName(cat)}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateArticle}
                disabled={isGenerating}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#12F6C8]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Generate New Article
                  </>
                )}
              </button>

              {schedulerState.lastGenerated && (
                <p className="text-gray-500 text-xs mt-3">
                  Last generated: {new Date(schedulerState.lastGenerated).toLocaleString()}
                </p>
              )}
            </div>

            {/* Scheduler */}
            <div className="p-6 bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Publishing Schedule</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#050505] rounded-lg">
                  <div>
                    <div className="text-white font-medium">Daily Publishing</div>
                    <div className="text-gray-500 text-sm">Generate one article every day</div>
                  </div>
                  <button
                    onClick={handleDailyToggle}
                    className={`w-14 h-7 rounded-full transition-colors relative ${
                      schedulerState.dailyEnabled ? 'bg-[#12F6C8]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                      schedulerState.dailyEnabled ? 'translate-x-8' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#050505] rounded-lg">
                  <div>
                    <div className="text-white font-medium">Weekly Publishing</div>
                    <div className="text-gray-500 text-sm">Generate articles every Monday</div>
                  </div>
                  <button
                    onClick={handleWeeklyToggle}
                    className={`w-14 h-7 rounded-full transition-colors relative ${
                      schedulerState.weeklyEnabled ? 'bg-[#12F6C8]' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                      schedulerState.weeklyEnabled ? 'translate-x-8' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#050505] rounded-lg border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-400">
                    Scheduled publishing requires a backend cron job. Toggle settings are saved but automatic generation is not yet implemented.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Placeholders */}
      <section className="py-8 px-4 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Social Media Integration</h3>
          <p className="text-gray-400 text-sm mb-6">Phase 2: Auto-post to social platforms (coming soon)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0A0A0C] border border-[#12F6C8]/10 rounded-lg opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white font-medium">LinkedIn</span>
              </div>
              <p className="text-gray-500 text-sm">Not connected</p>
            </div>

            <div className="p-4 bg-[#0A0A0C] border border-[#12F6C8]/10 rounded-lg opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-white font-medium">X (Twitter)</span>
              </div>
              <p className="text-gray-500 text-sm">Not connected</p>
            </div>

            <div className="p-4 bg-[#0A0A0C] border border-[#12F6C8]/10 rounded-lg opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                <span className="text-white font-medium">Medium</span>
              </div>
              <p className="text-gray-500 text-sm">Not connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Table */}
      <section className="py-8 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">All Articles</h3>
          
          <div className="bg-[#0A0A0C] border border-[#12F6C8]/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#12F6C8]/20 bg-[#050505]">
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                                    {articles.map((article) => (
                                      <ArticleRow key={article.id} article={article} />
                                    ))}
                </tbody>
              </table>
            </div>

            {articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No articles yet. Generate your first article above.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
