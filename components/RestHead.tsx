import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'

// Create a more flexible user interface to match what's coming from context
interface User {
  firstName?: string
  [key: string]: any
}

const RestHead: React.FC = () => {
  const authenticatedUser = useContext(AuthContext)?.user
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (authenticatedUser) {
      // Using type assertion as unknown first to avoid type errors
      setUser(authenticatedUser as unknown as User)
    }
  }, [authenticatedUser])

  return (
    <div>
      <header className='bg-gray-700 text-white mb-[2rem]'>
        <div className=' flex max-w-[1250px] m-auto p-[1rem] justify-between items-center'>
          <h1 className='text-[1.25rem]'>
            <Link href='/restapi'>My Rest API</Link>
          </h1>
          <nav>
            <ul className='flex gap-4 items-center'>
              <div className={` ${user ? 'visible flex gap-4 items-center' : 'hidden'}`}>
                <span className='flex gap-2 items-center'>
                  <Avatar alt='avatar' src='' />
                  {user?.firstName || ''}
                </span>
                <li className='inline-block ml-[.5rem] text-[.8rem]'>
                  <Link href='/signout'>Sign Out</Link>
                </li>
              </div>
              <div className={`${user ? 'hidden' : 'visible flex gap-4 items-center'}`}>
                <li className='text-right text-[1rem]'>
                  <Link href='/signup'>Sign Up</Link>
                </li>
                <li className='header--signedin text-right text-[1rem] leading-5'>
                  <Link href='/signin'>Sign In</Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default RestHead
