'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface NavItem {
  label: string
  href: string
  branches?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Government', href: '/government.html' },
  { label: 'Enterprise', href: '/enterprise.html' },
  { label: 'Products', href: '/products.html', branches: [
    { label: 'GhostQuant AI', href: '/products/ghostquant.html' },
    { label: 'GhostID', href: '/products/ghostid.html' },
    { label: 'ChildShield', href: '/products/childshield.html' },
    { label: 'RTCC-UIP', href: '/products/rtcc-uip.html' },
    { label: 'HeartGuard AI', href: '/products/heartguard.html' },
  ]},
  { label: 'Dossiers', href: '/dossiers.html', branches: [
    { label: 'Threat Architecture', href: '/dossiers/threat-architecture.html' },
    { label: 'Contractor Readiness', href: '/dossiers/contractor-readiness.html' },
    { label: 'National Security', href: '/dossiers/national-security.html' },
    { label: 'Addendum', href: '/dossiers/addendum.html' },
  ]},
  { label: 'Compliance', href: '/compliance.html', branches: [
    { label: 'AI Governance', href: '/compliance/ai-governance.html' },
    { label: 'NIST/CJIS', href: '/compliance/nist-cjis.html' },
    { label: 'Zero Trust', href: '/compliance/zero-trust.html' },
    { label: 'Data Governance', href: '/compliance/data-governance.html' },
  ]},
  { label: 'Contact', href: '/contact.html' },
]

function Synapse({ active }: { active: boolean }) {
  return (
    <div className={`
      absolute w-3 h-3 rounded-full transition-all duration-300
      ${active ? 'bg-[#12F6C8] shadow-lg shadow-[#12F6C8]/50 scale-125' : 'bg-[#12F6C8]/30 scale-100'}
    `}>
      {active && (
        <>
          <div className="absolute inset-0 rounded-full bg-[#12F6C8] animate-ping opacity-50" />
          <div className="absolute inset-[-4px] rounded-full border border-[#12F6C8]/30 animate-pulse" />
        </>
      )}
    </div>
  )
}

function NeuralThread({ progress }: { progress: number }) {
  return (
    <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 pointer-events-none">
      {/* Base thread */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12F6C8]/20 to-transparent" />
      
      {/* Active pulse */}
      <div 
        className="absolute top-0 h-full bg-gradient-to-r from-transparent via-[#12F6C8] to-transparent transition-all duration-500"
        style={{ 
          left: `${progress * 100}%`,
          width: '100px',
          transform: 'translateX(-50%)',
          opacity: 0.8,
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#12F6C8]/50 blur-md transition-all duration-500"
        style={{ 
          left: `${progress * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

function NavLink({ item, index, onHover }: { 
  item: NavItem
  index: number
  onHover: (index: number | null) => void
}){
  const [showBranches, setShowBranches] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href.replace('.html', ''))
  const linkRef = useRef<HTMLDivElement>(null)
  const branchesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showBranches && branchesRef.current) {
      gsap.fromTo(branchesRef.current.children,
        { opacity: 0, y: -10, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }, [showBranches])

  return (
    <div 
      ref={linkRef}
      className="relative flex flex-col items-center"
      onMouseEnter={() => {
        onHover(index)
        if (item.branches) setShowBranches(true)
      }}
      onMouseLeave={() => {
        onHover(null)
        setShowBranches(false)
      }}
    >
      {/* Synapse node */}
      <div className="relative mb-2">
        <Synapse active={isActive || showBranches} />
      </div>

      {/* Nav link */}
      <Link
        href={item.href}
        className={`
          relative px-4 py-2 text-sm font-medium tracking-wider uppercase
          transition-all duration-300 group
          ${isActive ? 'text-[#12F6C8]' : 'text-gray-400 hover:text-[#12F6C8]'}
        `}
      >
        <span className="relative z-10">{item.label}</span>
        
        {/* Hover glow */}
        <div className={`
          absolute inset-0 rounded-lg bg-[#12F6C8]/5 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `} />
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#12F6C8] rounded-full" />
        )}
      </Link>

      {/* Branch network */}
      {item.branches && showBranches && (
        <div 
          ref={branchesRef}
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50"
        >
          {/* Connection line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-[#12F6C8] to-transparent -mt-4" />
          
          <div className="bg-[#0D0D0F]/95 backdrop-blur-md border border-[#12F6C8]/20 rounded-lg p-2 min-w-[200px]">
            {item.branches.map((branch) => (
              <Link
                key={branch.href}
                href={branch.href}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-[#12F6C8] hover:bg-[#12F6C8]/5 rounded-md transition-all duration-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#12F6C8]/50" />
                {branch.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ThoughtRibbon() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const progress = hoveredIndex !== null ? hoveredIndex / (navItems.length - 1) : 0.5

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#12F6C8] to-[#0B85E5] flex items-center justify-center">
                <span className="text-black font-bold text-lg">G3</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-[#12F6C8]/20 blur-md group-hover:blur-lg transition-all duration-300" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[#12F6C8] font-bold text-lg tracking-wider">G3TI</div>
              <div className="text-gray-500 text-xs tracking-widest">D.I.E. SYSTEM</div>
            </div>
          </Link>

          {/* Neural navigation */}
          <div className="hidden lg:flex items-center relative">
            <NeuralThread progress={progress} />
            
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  item={item}
                  index={index}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-[#12F6C8]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom border glow */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-[#12F6C8]/30 to-transparent
        transition-opacity duration-500
        ${isScrolled ? 'opacity-100' : 'opacity-0'}
      `} />
    </nav>
  )
}
