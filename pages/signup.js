// Renders a "Sign Up" page for new users
/**
 * Renders a "Sign Up" button that POST
 * to /api/users and signs in the user
 **/
// Renders a "Canel" button that redirects to '/'

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import Form from '../components/Form'
import { Context } from '../components/Context'

function UserSignUp() {
  // pull in the data and signIn methods from the context
  const { noAuthRoutes, authenticatedUser, signIn } = useContext(Context)
  // create a user instence in the component state and set it to an object
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  })

  const router = useRouter()

  // create the errors instence in state and set it to an empty array
  const [errors, setErrors] = useState([])
  // store the useNavigate method to a constant

  // create the change function
  const change = (e) => {
    // create the name and value constants to store events from the inputs
    const { name, value } = e.target
    // set the user to take the data from the inputs as key value pairs
    // spreading the already exiting contents
    setUser((user) => ({ ...user, [name]: value }))
  }

  // create the submit function
  const submit = () => {
    //  get the createUser method from context and pass the user object as a param
    if (!authenticatedUser) {
      router.push('/signin')
    } else {
      noAuthRoutes
        .createUser(user)
        //  then if there is any errors
        .then((errors) => {
          if (errors.length) {
            // set the errors array to display them
            setErrors(errors)
            // else signIn with user emailAddress and password
          } else {
            router.push('/')
            signIn(user.emailAddress, user.password)
          }
        })
        // catch any errors thrown by the api and log them to the console
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // create the cancel function

  return (
    <>
      <div>
        <Form
          errors={errors}
          submit={submit}
          submitButtonText='Sign Up'
          elements={() => (
            <div className='grid place-content-center gap-y-6 text-gray-700 '>
              <div>
                <label htmlFor='firstName' className='h-fit'>
                  First Name
                </label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  value={user.firstName}
                  onChange={change}
                  className='border block p-2 rounded-md w-80 border-gray-300 '
                />
              </div>

              <div>
                <label htmlFor='lastName' className='h-fit'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  value={user.lastName}
                  onChange={change}
                  className='border block p-2 rounded-md w-80 border-gray-300'
                />
              </div>

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
          )}
        />
        <p className='text-center mt-4 font-semibold text-gray-500'>
          Already have an account?{' '}
          <Link href='/signin' className='text-gray-700'>
            Sign In
          </Link>
        </p>
      </div>
    </>
  )
}

export default UserSignUp
