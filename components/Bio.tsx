'use client'

import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'

const Bio: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Define motion components with proper typing
  const MotionDiv = motion.div as any
  const MotionP = motion.p as any

  useEffect(() => {
    // Simulate data fetching with a delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <MotionDiv
      initial={{ opacity: 0.9, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='m-auto bg-slate-100 md:bg-white md:rounded-lg md:shadow-md py-6 md:max-w-[500px] md:border-t-8 border-black 2xl:w-[500px] lg:w-[450px] lg:ml-8 xl:m-auto hover:shadow-lg transition-shadow duration-300'
    >
      <div className='px-6 md:px-10'>
        <div className='flex items-center mb-6'>
          <div className='w-1.5 h-8 bg-black mr-3 rounded-full'></div>
          <h4 className='text-2xl font-semibold text-gray-700'>
            {isLoading ? <Skeleton width={128} height={32} /> : 'About me'}
          </h4>
        </div>

        <div className='mb-8 text-gray-600 leading-relaxed'>
          {isLoading ? (
            <>
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton count={1} height={16} className='mb-2' />
              <Skeleton width={200} height={16} />
            </>
          ) : (
            <MotionP
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-base'
            >
              I'm a Full-Stack JavaScript Developer with{' '}
              <span className='font-medium text-black'>six years of experience</span> crafting
              high-performance, user-centric web applications using{' '}
              <span className='font-medium text-black'>
                React, Next.js, Gatsby, Node.js and TypeScript
              </span>
              . I've architected <span className='font-medium text-black'>scalable monorepos</span>,{' '}
              <span className='font-medium text-black'>automated CI/CD pipelines</span>, and built
              bespoke internal tools that cut operation times from hours to minutes—driving an
              <span className='font-medium text-black'> 80% productivity boost</span>—while thriving
              in agile, mid-sized teams to solve complex challenges.
            </MotionP>
          )}
        </div>

        {!isLoading && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className='flex justify-end'
          >
            <div className='inline-flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors'>
              <span>Read more</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 ml-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </div>
          </MotionDiv>
        )}
      </div>
    </MotionDiv>
  )
}

export default Bio
