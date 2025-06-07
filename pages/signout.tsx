import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/AuthProvider'

export default function SignOutPage() {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    auth?.signOut().finally(() => router.push('/'))
  }, [])

  return null
}
