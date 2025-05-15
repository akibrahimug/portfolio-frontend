import React from 'react'
import MainHeader from '@/components/MainHeader'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Methodologies from '@/components/Methodologies'

const Header: React.FC = () => {
  return (
    <div className='border-b items-center shadow-sd grid grid-cols-[1fr_auto_1fr] md:grid-cols-[20%_1fr_30%] lg:grid-cols-3 pt-3 pb-4'>
      {/* logo */}
      <Link href='/'>
        <ArrowBackIcon
          className='lg:hidden text-black md:ml-4 hover:bg-black hover:text-white rounded-full p-2 hover:scale-105 transition duration-150 ease-out'
          sx={{ fontSize: 45 }}
        />
      </Link>

      {/* middle section */}

      <MainHeader />
      <div className='hidden md:block m-auto'>
        <Methodologies />
      </div>
    </div>
  )
}

export default Header
