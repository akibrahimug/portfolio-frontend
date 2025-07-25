import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/components/AuthProvider'
import Pictures from './pictures'
import { useRouter } from 'next/router'

/**
 * React component that restricts access to authenticated users.
 *
 * Redirects unauthenticated users to the sign-in page and renders the {@link Pictures} component for authenticated users.
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
  return <Pictures />
}

export default Authorised
