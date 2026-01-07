'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

function BinderTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
        active 
          ? 'bg-[#0D0D0F] text-[#12F6C8] border-t-2 border-x border-[#12F6C8]/30 border-t-[#12F6C8]' 
          : 'bg-[#050505] text-gray-500 hover:text-gray-300 border border-transparent'
      }`}
    >
      {label}
    </button>
  )
}

function ChecklistItem({ text, checked, onToggle }: { text: string; checked: boolean; onToggle: () => void }) {
  return (
    <div 
      className="flex items-start gap-3 p-3 bg-[#050505] rounded-lg cursor-pointer hover:bg-[#0D0D0F] transition-all"
      onClick={onToggle}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked ? 'bg-[#12F6C8] border-[#12F6C8]' : 'border-gray-600'
      }`}>
        {checked && <span className="text-black text-xs">✓</span>}
      </div>
      <span className={`text-sm ${checked ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{text}</span>
    </div>
  )
}

function RequirementCard({ title, status, items }: { title: string; status: 'complete' | 'in-progress' | 'pending'; items: string[] }) {
  const statusColors = {
    'complete': 'border-green-500/30 bg-green-500/5',
    'in-progress': 'border-yellow-500/30 bg-yellow-500/5',
    'pending': 'border-gray-500/30 bg-gray-500/5',
  }

  const statusLabels = {
    'complete': { text: 'COMPLETE', color: 'text-green-400' },
    'in-progress': { text: 'IN PROGRESS', color: 'text-yellow-400' },
    'pending': { text: 'PENDING', color: 'text-gray-400' },
  }

  return (
    <div className={`p-5 rounded-xl border ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className={`text-xs font-mono ${statusLabels[status].color}`}>{statusLabels[status].text}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProgressRing({ percentage, label }: { percentage: number; label: string }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="text-center">
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="45" fill="none" stroke="#12F6C8" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000"
        />
        <text x="50" y="50" textAnchor="middle" dy="0.3em" className="fill-[#12F6C8] text-2xl font-bold">
          {percentage}%
        </text>
      </svg>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  )
}

export default function ContractorReadinessPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [checklist, setChecklist] = useState([
    { text: 'Complete security clearance verification', checked: true },
    { text: 'Submit facility security plan', checked: true },
    { text: 'Install required security infrastructure', checked: true },
    { text: 'Complete personnel security training', checked: false },
    { text: 'Establish secure communication channels', checked: false },
    { text: 'Submit compliance documentation', checked: false },
  ])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const toggleChecklist = (index: number) => {
    setChecklist(prev => prev.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ))
  }

  const completedCount = checklist.filter(item => item.checked).length
  const completionPercentage = Math.round((completedCount / checklist.length) * 100)

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <section className="py-8 px-4 border-b border-[#12F6C8]/10">
        <div ref={headerRef} className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#12F6C8]/20 to-[#0B85E5]/20 border border-[#12F6C8]/30 flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <div className="text-[#12F6C8] text-sm font-mono mb-1">INTELLIGENCE DOSSIER // CONTRACTOR BINDER</div>
              <h1 className="text-3xl font-bold text-white">CONTRACTOR READINESS</h1>
            </div>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Comprehensive readiness assessment and compliance checklist for government contractors 
            seeking to integrate G3TI protective intelligence solutions.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-1 border-b border-[#12F6C8]/10">
            <BinderTab label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <BinderTab label="Requirements" active={activeTab === 'requirements'} onClick={() => setActiveTab('requirements')} />
            <BinderTab label="Checklist" active={activeTab === 'checklist'} onClick={() => setActiveTab('checklist')} />
            <BinderTab label="Timeline" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h2 className="text-xl font-bold text-white mb-4">Contractor Readiness Program</h2>
                  <p className="text-gray-400 mb-4">
                    The G3TI Contractor Readiness Program ensures that all government contractors meet 
                    the stringent security and compliance requirements necessary to deploy our protective 
                    intelligence solutions in sensitive environments.
                  </p>
                  <p className="text-gray-400">
                    This binder contains all documentation, checklists, and requirements needed to 
                    achieve full readiness certification.
                  </p>
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h2 className="text-xl font-bold text-white mb-4">Key Milestones</h2>
                  <div className="space-y-4">
                    {[
                      { phase: 'Phase 1', title: 'Initial Assessment', status: 'complete' },
                      { phase: 'Phase 2', title: 'Security Infrastructure', status: 'complete' },
                      { phase: 'Phase 3', title: 'Personnel Training', status: 'in-progress' },
                      { phase: 'Phase 4', title: 'Final Certification', status: 'pending' },
                    ].map((milestone, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-[#050505] rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          milestone.status === 'complete' ? 'bg-green-500/20 text-green-400' :
                          milestone.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {milestone.status === 'complete' ? '✓' : milestone.status === 'in-progress' ? '◐' : '○'}
                        </div>
                        <div>
                          <div className="text-[#12F6C8] text-sm font-mono">{milestone.phase}</div>
                          <div className="text-white font-semibold">{milestone.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Readiness Score</h3>
                  <ProgressRing percentage={completionPercentage} label="Overall Completion" />
                </div>

                <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tasks Completed</span>
                      <span className="text-[#12F6C8] font-mono">{completedCount}/{checklist.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Days to Deadline</span>
                      <span className="text-[#12F6C8] font-mono">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="text-yellow-400 font-mono">IN PROGRESS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RequirementCard
                title="Security Clearance"
                status="complete"
                items={['Facility Clearance Level (FCL)', 'Personnel Security Clearances', 'Safeguarding Requirements']}
              />
              <RequirementCard
                title="Infrastructure"
                status="complete"
                items={['Secure Network Environment', 'Encrypted Communications', 'Physical Security Controls']}
              />
              <RequirementCard
                title="Compliance"
                status="in-progress"
                items={['NIST 800-171 Compliance', 'CMMC Level 2 Certification', 'DFARS Requirements']}
              />
              <RequirementCard
                title="Training"
                status="in-progress"
                items={['Security Awareness Training', 'Incident Response Procedures', 'Data Handling Protocols']}
              />
              <RequirementCard
                title="Documentation"
                status="pending"
                items={['System Security Plan (SSP)', 'Plan of Action & Milestones', 'Continuous Monitoring Plan']}
              />
              <RequirementCard
                title="Assessment"
                status="pending"
                items={['Third-Party Assessment', 'Vulnerability Scanning', 'Penetration Testing']}
              />
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="max-w-2xl mx-auto">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Readiness Checklist</h2>
                  <span className="text-[#12F6C8] font-mono">{completedCount}/{checklist.length} Complete</span>
                </div>
                <div className="space-y-3">
                  {checklist.map((item, i) => (
                    <ChecklistItem key={i} text={item.text} checked={item.checked} onToggle={() => toggleChecklist(i)} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#12F6C8]/10">
                  <div className="h-2 bg-[#050505] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <div className="text-center text-gray-400 mt-2">{completionPercentage}% Complete</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="max-w-3xl mx-auto">
              <div className="p-6 bg-[#0D0D0F] rounded-xl border border-[#12F6C8]/20">
                <h2 className="text-xl font-bold text-white mb-6">Implementation Timeline</h2>
                <div className="space-y-0">
                  {[
                    { week: 'Week 1-2', title: 'Initial Assessment', desc: 'Security posture evaluation and gap analysis', status: 'complete' },
                    { week: 'Week 3-4', title: 'Infrastructure Setup', desc: 'Deploy secure network and communication systems', status: 'complete' },
                    { week: 'Week 5-6', title: 'Personnel Training', desc: 'Security awareness and protocol training', status: 'current' },
                    { week: 'Week 7-8', title: 'Documentation', desc: 'Complete all required compliance documentation', status: 'upcoming' },
                    { week: 'Week 9-10', title: 'Assessment', desc: 'Third-party security assessment and testing', status: 'upcoming' },
                    { week: 'Week 11-12', title: 'Certification', desc: 'Final review and readiness certification', status: 'upcoming' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          item.status === 'complete' ? 'bg-green-500' :
                          item.status === 'current' ? 'bg-yellow-500 animate-pulse' :
                          'bg-gray-600'
                        }`} />
                        {i < 5 && <div className="w-px h-16 bg-gray-700" />}
                      </div>
                      <div className="pb-8">
                        <div className="text-[#12F6C8] text-sm font-mono">{item.week}</div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-[#12F6C8]/10">
            <div className="flex items-center justify-between">
              <Link href="/threat-architecture.html" className="text-gray-400 hover:text-[#12F6C8] transition-colors">
                ← Threat Architecture
              </Link>
              <Link href="/national-security-briefing.html" className="text-[#12F6C8] hover:underline">
                National Security Briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
