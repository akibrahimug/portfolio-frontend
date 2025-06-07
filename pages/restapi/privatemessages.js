import React, { useContext, useEffect } from 'react'
import Messages from './messages'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/AuthProvider'

function Authorised() {
  // call the authenticated user data from context
  const { user } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router?.push('/signin')
    }
  }, [])
  return <Messages />
}

export default Authorised
