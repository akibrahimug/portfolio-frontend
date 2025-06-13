import React, { useState, useContext } from 'react'
import RestHead from '@/components/RestHead'
import { useRouter } from 'next/router'
import { AppContext } from '@/components/AppContext'
import { AuthContext } from '@/components/AuthProvider'

/**
 * Renders a form for creating a new methodology entry and handles its submission.
 *
 * Displays input fields for methodology title and description, validates input via an API call, and redirects to the profile page upon successful creation. Validation errors from the API are shown to the user.
 */
function Newmethodology() {
  const { noAuth } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const router = useRouter()

  // get the data from the form
  const [data, setData] = useState({
    methodologyTitle: '',
    description: '',
    userID: user ? user.userID : '',
  })

  // create a change method
  const change = (e) => {
    // create name and value to store the event targets
    const { name, value } = e.target
    // set the course an object with the current courses spread, and name and value stored
    // as key value pairs
    setData((project) => ({ ...project, [name]: value }))
  }
  const [errors, setErrors] = useState([])
  const submit = (e) => {
    e.preventDefault()
    noAuth
      .createMethodology(data)
      .then((errors) => {
        if (errors.length) {
          // set the errors array to display them
          setErrors(errors)
          // else signIn with user emailAddress and password
        } else {
          router.push('/restapi/newprofile')
        }
      })
      // catch any errors thrown by the api and log them to the console
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <RestHead />
      <div className='mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px- '>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>New Methodology</h3>
              <p className='mt-1 text-sm text-gray-600'>
                This information will be saved in a postgresql database. You can edit it later.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form onSubmit={submit}>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3 sm:col-span-2'>
                      <label
                        htmlFor='methodologyTitle'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Methodology Title
                      </label>
                      <div className='my-2 flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='methodologyTitle'
                          id='methodologyTitle'
                          className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='KISS'
                          onChange={change}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='description'
                        name='description'
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='This is a project that does....'
                        defaultValue={''}
                        onChange={change}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Brief description for the method. Tech used, Methodology, etc...
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex gap-4 justify-end'>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none max-h-10'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => router.push('/restapi/newprofile')}
                    className='inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none max-h-10'
                  >
                    Back
                  </button>
                  {errors.length ? (
                    <div className='p-4 border border-red-500 rounded-2xl w-[70%] m-auto mt-4 '>
                      <h3 className='text-center underline text-xl font-medium text-red-600'>
                        Validation errors
                      </h3>
                      <ul>
                        {errors.map((error, index) => (
                          <li key={index} className='mt-2 font-semibold text-gray-600 text-center'>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newmethodology
