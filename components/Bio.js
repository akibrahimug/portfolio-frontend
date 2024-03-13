import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Bio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with a delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='m-auto bg-slate-100 md:bg-white md:rounded-lg md:shadow-md py-2 md:max-w-[500px] md:border-t-8 border-black 2xl:w-[500px] lg:w-[450px] lg:ml-8 xl:m-auto'>
      <h4 className='text-2xl text-gray-600 mb-3 w-64 text-left mt-16 ml-10'>
        {isLoading ? <Skeleton width={128} height={24} /> : 'About me'}
      </h4>
      <div className='px-10 mb-10 text-gray-600'>
        {isLoading ? (
          <>
            <Skeleton count={8} height={10} className='mb-2' />
            <Skeleton width={80} height={10} />
          </>
        ) : (
          <p>
            I am a skilled and analytical Full-Stack Javascript Developer with 3 years of hands-on
            experience building web applications. I am seeking a Mid Front-end Developer role at a
            mid-sized company where I can utilise my proficiency in both front-end and back-end
            development to deliver high-quality and user-centric solutions. I have a track record of
            driving business growth, as demonstrated by my recent experience of creating internal
            systems that resulted in an 80% increase in company productivity within 4 months.
          </p>
        )}
      </div>
    </div>
  )
}

export default Bio
