'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import BootSequence from '../animations/BootSequence'

interface ExperienceContextType {
  isBooted: boolean
  isTransitioning: boolean
  setIsTransitioning: (value: boolean) => void
}

const ExperienceContext = createContext<ExperienceContextType>({
  isBooted: false,
  isTransitioning: false,
  setIsTransitioning: () => {},
})

export const useExperience = () => useContext(ExperienceContext)

export default function ExperienceProvider({ children }: { children: ReactNode }) {
  const [isBooted, setIsBooted] = useState(false)
  const [showBoot, setShowBoot] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Check if boot sequence has already been shown this session
    const hasBooted = sessionStorage.getItem('g3ti-booted')
    if (hasBooted) {
      setIsBooted(true)
      setShowBoot(false)
    }
  }, [])

  const handleBootComplete = () => {
    sessionStorage.setItem('g3ti-booted', 'true')
    setIsBooted(true)
    setShowBoot(false)
  }

  return (
    <ExperienceContext.Provider value={{ isBooted, isTransitioning, setIsTransitioning }}>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      <div className={`transition-opacity duration-500 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </ExperienceContext.Provider>
  )
}
