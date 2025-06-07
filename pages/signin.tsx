// Renders a "Sign In" page for existing users
// Renders a "Sign In" button
// Renders a "Cancel" button that redirects to '/'

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import Form from '../components/Form'
import { AuthContext } from '../components/AuthProvider'

interface UserSignInData {
  emailAddress: string
  password: string
}

const UserSignIn: React.FC = () => {
  const router = useRouter()
  // create a user object in state
  const [user, setUser] = useState<UserSignInData>({ emailAddress: '', password: '' })
  // create an errors instance in state and set it to an empty array
  const [errors, setErrors] = useState<string[]>([])
  // pull in the signIn method from context
  const signIn = useContext(AuthContext)?.signIn

  // create the change function
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    // create a name and value constant to hold the events on the input targets
    const name = e.target.name
    const value = e.target.value

    // set the user to value of the inputs as key value pairs
    setUser((user) => ({ ...user, [name]: value }))
  }

  // create the submit function
  const submit = () => {
    if (!signIn) return

    // destructure the user
    const { emailAddress, password } = user
    // pass the emailAdress and password to the sigIn method then
    signIn(emailAddress, password)
      .then(() => {
        // if the emailAddress or password are empty
        if (emailAddress === '' || password === '') {
          // set the errors to a custom message
          setErrors(['Invalid password or Email'])
          // else if there is a location other than the default
        } else {
          const locationState = router.query.from as string | undefined
          if (locationState) {
            // navigate back to that location
            router.push(locationState)
            // else navigate to the root /
          } else {
            router.push('/restapi')
          }
        }
      })
      // catch any errors throw by the api and console log them
      .catch((err) => {
        setErrors([
          'Sorry we do not have a user with that email address',
          'We do not have a user with that password',
        ])
      })
  }
  return (
    <div className='form--centered'>
      <Form
        errors={errors}
        submit={submit}
        submitButtonText='Login'
        elements={() => (
          <div>
            <div className='grid place-content-center gap-y-6 text-gray-700 '>
              <div>
                <label htmlFor='emailAddress' className='h-fit'>
                  Email Address
                </label>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='email'
                  value={user.emailAddress}
                  onChange={change}
                  className='border block p-2 rounded-md w-80 border-gray-300 '
                />
              </div>

              <div>
                <label htmlFor='password' className='h-fit'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={user.password}
                  onChange={change}
                  className='border block p-2 rounded-md w-80 border-gray-300 '
                />
              </div>
            </div>
          </div>
        )}
      />
      <p className='text-center mt-4 font-semibold text-gray-500'>
        Do not have a user account?{' '}
        <Link href='/signup' className='text-gray-700'>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default UserSignIn
