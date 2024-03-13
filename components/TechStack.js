import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Context'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function TechStack() {
  const { noAuthRoutes } = useContext(Context)
  const [techStack, setTechStack] = useState([])
  useEffect(() => {
    noAuthRoutes.getTechnologies().then((res) => setTechStack(res))
  }, [])

  return (
    <div className='relative rounded-2xl md:w-[800px] xl:w-[1200px] xl:grid-cols-7 mb-4 shadow-md m-auto grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 '>
      {techStack.length > 0
        ? techStack.map((tech, i) => (
            <div
              key={i}
              className='flex flex-col border m-6 rounded-md shadow-sm h-[180px] justify-center items-center'
            >
              <Image width={300} height={30} src={tech.pictureUrl} className='w-16 m-4' alt='' />
              <div className='border-t'>
                <p className='py-2 text-center'>{tech.techTitle}</p>
              </div>
            </div>
          ))
        : // Display a skeleton if techStack is an empty array
          Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className=' m-6 rounded-md shadow-sm h-[180px] '>
              <Skeleton key={i} height={180} />
            </div>
          ))}
    </div>
  )
}
