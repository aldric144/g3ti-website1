'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface CorticalSlideProps {
  children: ReactNode
}

export default function CorticalSlide({ children }: CorticalSlideProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !particlesRef.current) return

    const tl = gsap.timeline()

    // Create particle burst effect
    const particles = particlesRef.current.children
    gsap.set(particles, {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      scale: 0,
      opacity: 0,
    })

    // Transition in sequence
    tl.to(overlayRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
    })
    .to(particles, {
      scale: 1,
      opacity: 1,
      stagger: 0.02,
      duration: 0.3,
    }, '-=0.2')
    .to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2')
    .to(overlayRef.current, {
      scaleX: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'right center',
    }, '-=0.3')
    .to(particles, {
      scale: 0,
      opacity: 0,
      stagger: 0.01,
      duration: 0.3,
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <div className="relative">
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-gradient-to-r from-[#12F6C8]/20 via-[#0B85E5]/20 to-[#12F6C8]/20 pointer-events-none"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Particle stream */}
      <div ref={particlesRef} className="fixed inset-0 z-[61] pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#12F6C8]"
            style={{
              boxShadow: '0 0 10px #12F6C8, 0 0 20px #12F6C8',
            }}
          />
        ))}
      </div>

      {/* Neural pathway light trails */}
      <div className="fixed inset-0 z-[59] pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#12F6C8" stopOpacity="0" />
              <stop offset="50%" stopColor="#12F6C8" stopOpacity="1" />
              <stop offset="100%" stopColor="#0B85E5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="relative z-10"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        {children}
      </div>
    </div>
  )
}
