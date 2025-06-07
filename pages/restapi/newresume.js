import React, { useState, useContext } from 'react'
import RestHead from '../../components/RestHead'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/AuthProvider'
import { api } from '@/pages/api/Config'
/**
 * Renders a form for creating a new resume entry associated with the authenticated user.
 *
 * Displays input fields for resume title, URL, and creation date. Handles form submission by sending the data to the backend API, including the current user's ID, and manages validation errors or redirects upon success.
 *
 * @returns {JSX.Element} The new resume creation form component.
 */
function Newresume() {
  const { user, axiosJWT, getUserID } = useContext(AuthContext)
  const router = useRouter()

  // create resume with consistent userID
  const createResume = async (resume) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...resume,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/resumes`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // get the data from the form
  const [data, setData] = useState({
    resumeTitle: '',
    resumeUrl: '',
    date: '',
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
    if (!user) {
      router.push('/signin')
    } else {
      createResume(data)
        .then((errors) => {
          if (errors.length) {
            // set the errors array to display them
            setErrors(errors)
            // else signIn with user emailAddress and password
          } else {
            router.push('resume')
          }
        })
        // catch any errors thrown by the api and log them to the console
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div>
      <RestHead />
      <div className='mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px- '>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>New Resume</h3>
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
                        htmlFor='resumeTitle'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Resume Title
                      </label>
                      <div className='my-2 flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='resumeTitle'
                          id='resumeTitle'
                          className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='Facebook'
                          onChange={change}
                        />
                      </div>
                      <label
                        htmlFor='resumeUrl'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Resume URL
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                          Paste URL here
                        </span>
                        <input
                          type='text'
                          name='resumeUrl'
                          id='resumeUrl'
                          className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='https://www.example.com'
                          onChange={change}
                        />
                      </div>
                      <label
                        htmlFor='date'
                        className='block text-sm mt-2 font-medium text-gray-700'
                      >
                        Created on Date
                      </label>
                      <div className='my-2 flex rounded-md shadow-sm'>
                        <input
                          type='date'
                          name='date'
                          id='date'
                          className='block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          onChange={change}
                        />
                      </div>
                    </div>
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
                    onClick={() => router.push('resume')}
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

export default Newresume
