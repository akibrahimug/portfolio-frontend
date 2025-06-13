import React from 'react'
import Line from '@/public/icons/line.svg'
import { useFetch } from '@/pages/api/useFetch'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Bio from '@/components/Bio'

const Avarta: React.FC = () => {
  const { data: avartas } = useFetch('/avartas')

  const isLoading = !avartas

  return (
    <div className='grid grid-rows-2'>
      <div className='flex justify-center lg:justify-end'>
        {isLoading ? (
          // Display skeleton when data is loading
          <div className=' w-[100%] ml-8 lg:mt-10'>
            <Skeleton width={450} height={400} />
          </div>
        ) : (
          <div className='relative w-[360px] mt-8 h-[350px] min-w-[300px] md:h-[30em] md:w-[25em] m-auto lg:mt-10'>
            <Image
              // src={p.from === "2022-11-25" ? p.pictureUrl : ""}
              src='/icons/avarta.webp'
              alt=''
              layout='fill'
              objectFit='contain'
              priority
            />
          </div>
        )}
        <span className='font-semibold absolute w-[219px] right-10 top-[90px] text-lg hidden xl:block text-gray-600'>
          {'"Let\'s create an amazing web experince together."'}
        </span>
        <div className='absolute top-[250px] right-16 hidden xl:block'>
          <div
            className='text-gray-400 '
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}
          >
            <Line className='md:mr-2.5 mb-6 inline ' />
            <span className='animate-bounce inline-block'>Scroll Down</span>
          </div>
        </div>
      </div>
      <div className='mt-6 z-10'>
        <Bio />
      </div>
    </div>
  )
}

export default Avarta
