import React, { useContext, useEffect, useState } from 'react'
import RestHead from '../../components/RestHead'
import { useRouter } from 'next/router'
import { AppContext } from '@/components/AppContext'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Image from 'next/image'
function Badges() {
  const router = useRouter()
  const { noAuth } = useContext(AppContext)

  const [badges, setBadges] = useState([])
  useEffect(() => {
    noAuth.getBadges().then((res) => {
      setBadges(res)
    })
  }, [])

  return (
    <div>
      <RestHead />
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 '>
        <div className='flex justify-around'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>My Badges</h2>
          <div className='flex gap-5'>
            <button
              className='p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold'
              onClick={() => router.push('newbadges')}
            >
              Add New Badge
            </button>
            <button
              className='p-3 bg-gray-400 rounded-lg hover:bg-gray-500 shadow-lg text-white font-bold'
              onClick={() => router.push('/restapi')}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          badges
            ? 'grid mt-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8  mx-auto max-w-7xl '
            : ''
        }`}
      >
        {badges ? (
          badges.map((project, i) => (
            <div key={i} className='group relative'>
              <div>
                <Image
                  src={project.pictureUrl}
                  alt=''
                  // layout="fill"
                  width={200}
                  height={30}
                  className='h-full w-full object-contain object-center lg:h-full lg:w-full'
                />
              </div>
            </div>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}
          >
            <CircularProgress className='text-gray-500 ' />
          </Box>
        )}
      </div>
    </div>
  )
}

export default Badges
