import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../components/Context'

const SignOut: React.FC = () => {
  // pull in the signOut method from the context
  const context = useContext(Context)
  const signOut = context?.signOut
  const router = useRouter()

  // when the component mounts
  // bring in the signOut functionality
  useEffect(() => {
    if (signOut) {
      signOut()
    }
    router.push('/restapi')
  }, [signOut, router])

  return <div />
}

export default SignOut
