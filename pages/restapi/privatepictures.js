import React, { useContext, useEffect } from 'react'
import { Context } from '../../components/Context'
import Pictures from './pictures'
import { useRouter } from 'next/router'

function Authorised() {
  // call the authenticated user data from context
  const { authenticatedUser } = useContext(Context)
  console.log(authenticatedUser)
  const router = useRouter()
  useEffect(() => {
    if (!authenticatedUser) {
      router?.push('/signin')
    }
  }, [])
  return <Pictures />
}

export default Authorised
