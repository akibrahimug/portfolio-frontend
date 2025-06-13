import React, { useContext, useEffect } from 'react'
import Messages from './messages'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/AuthProvider'

/**
 * React component that restricts access to authenticated users.
 *
 * Redirects unauthenticated users to the sign-in page and displays the {@link Messages} component for authenticated users.
 */
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
