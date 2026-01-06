'use client'

import { useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

const bootMessages = [
  '> Initializing G3TI Autonomous Intelligence Core...',
  '> Validating neural lattice integrity...',
  '> Establishing Zero-Trust perimeter...',
  '> Synchronizing threat architecture nodes...',
  '> D.I.E. Environment Loaded.',
]

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const typeText = useCallback((text: string, lineIndex: number) => {
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          if (lineIndex < bootMessages.length - 1) {
            setCurrentLine(lineIndex + 1)
          } else {
            setIsComplete(true)
          }
        }, 300)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentLine < bootMessages.length && !isComplete) {
      const cleanup = typeText(bootMessages[currentLine], currentLine)
      return cleanup
    }
  }, [currentLine, isComplete, typeText])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        const bootElement = document.getElementById('boot-sequence')
        if (bootElement) {
          gsap.to(bootElement, {
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete()
            }
          })
        }
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isComplete, onComplete])

  return (
    <div
      id="boot-sequence"
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(18, 246, 200, 0.03) 2px, rgba(18, 246, 200, 0.03) 4px)',
        }} />
      </div>

      {/* Particle effect background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#12F6C8] rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Terminal window */}
      <div className="relative w-full max-w-3xl mx-4 bg-black/80 border border-[#12F6C8]/30 rounded-lg shadow-2xl shadow-[#12F6C8]/10">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#12F6C8]/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-4 text-[#12F6C8]/60 text-sm font-mono">G3TI_CORE_v7.2.1</span>
        </div>

        {/* Terminal content */}
        <div className="p-6 font-mono text-sm md:text-base min-h-[300px]">
          {bootMessages.slice(0, currentLine).map((msg, idx) => (
            <div key={idx} className="text-[#12F6C8] mb-2 opacity-60">
              {msg}
            </div>
          ))}
          {currentLine < bootMessages.length && (
            <div className="text-[#12F6C8] mb-2">
              {displayedText}
              <span className={`inline-block w-2 h-4 bg-[#12F6C8] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          )}
          {isComplete && (
            <div className="mt-6 text-center">
              <div className="text-[#12F6C8] text-lg animate-pulse">
                SYSTEM READY
              </div>
              <div className="text-[#12F6C8]/40 text-xs mt-2">
                &quot;We don&apos;t make technology — we make technology intelligent.&quot;
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-4">
          <div className="h-1 bg-[#12F6C8]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#12F6C8] to-[#0B85E5] transition-all duration-300"
              style={{ width: `${((currentLine + 1) / bootMessages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#12F6C8]/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#12F6C8]/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#12F6C8]/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#12F6C8]/30" />
    </div>
  )
}
