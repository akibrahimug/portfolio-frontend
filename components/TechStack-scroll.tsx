'use client'

import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Search } from 'lucide-react'
import techStackData from '@/lib/technologies.json'

export default function TechStackScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef as any, { once: false, amount: 0.2 })
  const [searchQuery, setSearchQuery] = useState('')

  // Get the technologies array from the techStack property
  const technologies: Technology[] = techStackData.techStack
  const [filteredTech, setFilteredTech] = useState(technologies)

  // Motion components
  const MotionH2 = motion.h2 as any
  const MotionP = motion.p as any
  const MotionDiv = motion.div as any

  // Filter logic
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim()
    setFilteredTech(
      !query
        ? technologies
        : technologies.filter((tech) => tech.name.toLowerCase().includes(query)),
    )
  }, [searchQuery])

  // Split into rows for marquee
  const getRowTechnologies = () => {
    if (!filteredTech.length) return [[], [], []]
    if (filteredTech.length <= 7) return [filteredTech, [], []]
    if (filteredTech.length <= 14) {
      const mid = Math.ceil(filteredTech.length / 2)
      return [filteredTech.slice(0, mid), filteredTech.slice(mid), []]
    }
    const size = Math.ceil(filteredTech.length / 3)
    return [
      filteredTech.slice(0, size),
      filteredTech.slice(size, size * 2),
      filteredTech.slice(size * 2),
    ]
  }

  const [row1, row2, row3] = getRowTechnologies()

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8' ref={containerRef}>
          <MotionH2
            className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            My Tech Stack
          </MotionH2>
          <MotionP
            className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technologies I work with as a fullstack JavaScript developer
          </MotionP>

          <MotionDiv
            className='relative max-w-md mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Search technologies...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                >
                  ✕
                </button>
              )}
            </div>
          </MotionDiv>
        </div>

        {filteredTech.length === 0 ? (
          <MotionDiv
            className='text-center py-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              No technologies found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className='mt-4 px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:text-gray-700 hover:border-gray-400 transition-colors'
            >
              Clear Search
            </button>
          </MotionDiv>
        ) : (
          <>
            {searchQuery || filteredTech.length <= 7 ? (
              <div className='flex flex-wrap gap-4 justify-center py-6'>
                {filteredTech.map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
              </div>
            ) : (
              <div className='relative overflow-hidden py-6'>
                <div className='absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none' />
                <div className='absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none' />

                {row1.length > 0 && (
                  <MarqueeSlider duration={25}>
                    {row1.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </MarqueeSlider>
                )}
                {row2.length > 0 && (
                  <MarqueeSlider duration={30} reverse>
                    {row2.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </MarqueeSlider>
                )}
                {row3.length > 0 && (
                  <MarqueeSlider duration={20}>
                    {row3.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </MarqueeSlider>
                )}
              </div>
            )}
          </>
        )}

        {searchQuery && filteredTech.length > 0 && (
          <div className='text-center mt-4'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Showing {filteredTech.length} of {technologies.length} technologies
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className='mt-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm'
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

interface Technology {
  name: string
  icon: string
  color: string
}

interface MarqueeSliderProps {
  children: React.ReactNode
  duration: number
  reverse?: boolean
}
function MarqueeSlider({ children, duration, reverse = false }: MarqueeSliderProps) {
  const [isPaused, setIsPaused] = useState(false)
  const items = React.Children.toArray(children)
  const dup = items.length > 1 ? [...items, ...items, ...items, ...items] : items

  return (
    <div
      className='relative flex overflow-hidden w-full my-4 h-[70px]'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationFillMode: 'forwards',
          animationPlayState: isPaused ? 'paused' : 'running',
          display: 'flex',
          gap: '1rem',
          minWidth: '400%',
          width: 'max-content',
        }}
      >
        {dup.map((child, i) => (
          <div key={i} className='flex-shrink-0 transition-transform duration-300'>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

interface TechCardProps {
  tech: Technology
}
function TechCard({ tech }: TechCardProps) {
  return (
    <div
      className={`flex items-center gap-3 flex-shrink-0 py-3 px-5 rounded-xl ${tech.color} shadow-sm border border-white dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer`}
    >
      <img src={tech.icon} alt={`${tech.name} icon`} className='w-6 h-6 object-contain' />
      <span className='font-medium whitespace-nowrap'>{tech.name}</span>
    </div>
  )
}
