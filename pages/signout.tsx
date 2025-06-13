import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/AuthProvider'

/**
 * Signs out the current user and redirects to the home page.
 *
 * This component performs the sign-out operation on mount and navigates to the root path upon completion. It does not render any UI.
 */
export default function SignOutPage() {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    auth?.signOut().finally(() => router.push('/'))
  }, [])

  return null
}
