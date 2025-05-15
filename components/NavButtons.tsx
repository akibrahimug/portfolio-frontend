'use client'

import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const NavButtons = () => {
  const router = useRouter()
  const scrollToProjects = () => {
    document.getElementById('tech-stack')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const handleEmail = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const emailParams = new URLSearchParams({
      subject: 'Regarding Your work as a Software Engineer',
      body: 'Hello Kasoma,\n\nI saw your website and would like to discuss...',
    }).toString()
    window.open(`mailto:kasomaibrahim@gmail.com?${emailParams}`, '_self')
  }, [])

  return (
    <div className='flex flex-wrap justify-center gap-1 w-full max-w-md mx-auto '>
      <div className='flex w-full sm:w-auto rounded-full shadow-sm overflow-hidden '>
        {/* Contact Me */}
        <Button
          className='flex-1 h-10 px-4  rounded-none border-r text-left justify-start font-normal hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer'
          onClick={handleEmail}
        >
          Email Me
        </Button>

        {/* TechStack */}
        <Button
          variant='ghost'
          className='flex-1 h-10 px-4 rounded-none border-r text-left justify-start  text-gray-500 font-extralight hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer '
          value='TechStack'
          onClick={scrollToProjects}
        >
          TechStack
        </Button>

        {/* REST API with GitHub icon */}
        <div className='flex-1 relative flex items-center'>
          <Button
            variant='ghost'
            className='h-10 w-full pl-4 pr-12 rounded-none text-left justify-start font-normal hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer'
            value='Restful API'
            onClick={() => router.push('/restapi')}
          >
            REST API
          </Button>

          <a
            href='https://github.com/akibrahimug'
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'absolute right-5 transform translate-x-1/2',
              'flex items-center justify-center',
              'w-10 h-10 rounded-full bg-white shadow-md',
              'border border-gray-200 hover:border-red-700',
              'hover:bg-red-700 hover:text-white',
              'transition-all duration-200 ease-in-out',
              'focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2',
            )}
            aria-label='GitHub Profile'
          >
            <Github className='w-5 h-5' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavButtons
