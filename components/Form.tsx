/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface FormProps {
  errors: string[]
  submit: () => void
  submitButtonText: string
  elements: () => React.ReactNode
}

interface ErrorDisplayProps {
  errors: string[]
}

// form component with a destructed object
export default function Form({ errors, submit, submitButtonText, elements }: FormProps) {
  // create the handleSubmit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //    prevent the default behaviour of the event handler
    e.preventDefault()
    //    call the "submit()" method
    submit()
  }

  const axiosAPiCall = async (url: string, method: string, body = {}) =>
    axios({
      method,
      url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}${url}`,
      data: body,
    })

  const router = useRouter()

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/restapi')
  }

  return (
    <div className='max-w-[600px] m-auto border flex flex-col border-gray-200 rounded-2xl mt-20'>
      <div>
        <h2 className='text-center text-3xl font-semibold text-gray-700 my-10'>
          Choose a {submitButtonText} Method
        </h2>
      </div>
      <ErrorDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className='flex gap-4 justify-center my-5'>
          <button type='submit' className='bg-gray-700 text-white p-4 rounded-lg w-[25%]'>
            {submitButtonText}
          </button>
          <button
            onClick={handleCancel}
            className='bg-gray-500 border text-white p-4 rounded-lg w-[25%]'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function ErrorDisplay({ errors }: ErrorDisplayProps) {
  let errorsDisplay = null

  if (errors.length > 1) {
    errorsDisplay = (
      <div className='p-4 border border-red-500 rounded-2xl w-[70%] m-auto mt-4 '>
        <h3 className='text-center underline text-xl font-medium text-red-600'>
          Validation errors
        </h3>
        <ul>
          {errors?.map((error, index) => (
            <li key={index} className='mt-2 font-semibold text-gray-600'>
              {error}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return errorsDisplay
}
