import React, { useState, useContext, useEffect } from 'react'
import RestHead from '../../../components/RestHead'
import { useRouter } from 'next/router'
import Popover from '@mui/material/Popover'
import { AppContext } from '@/components/AppContext'
import { AuthContext } from '@/components/AuthProvider'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import Image from 'next/image'

/**
 * Renders a form for creating a new avatar entry, allowing users to select an image, specify a date range, and submit the data to be stored in a PostgreSQL database.
 *
 * The form includes image selection from a popover, date range picking, and displays validation errors if present. On successful submission, the user is redirected to the profile page.
 */
function Newproject() {
  const { googleUpload, noAuth } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [value, setValue] = useState([null, null])
  const [anchorEl, setAnchorEl] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  //   get the pictures from googleUpload
  const [pictureURL, setPictureURL] = useState(null)
  useEffect(() => {
    googleUpload.getPictures().then((pictures) => setPictureURL(pictures[0]))
  }, [])

  const [pictures, setPictures] = useState(null)
  useEffect(() => {
    if (pictureURL) {
      setPictures(
        pictureURL.map((pic) => {
          const url = pic.storage.apiEndpoint + '/' + pic.bucket.id + '/' + pic.id
          return url
        }),
      )
    }
  }, [pictureURL])

  const [currentImage, setCurrentImage] = useState('')

  // get the data from the form
  const [data, setData] = useState({
    from: '',
    to: '',
    pictureUrl: '',
    userID: user ? user.userID : '',
  })
  data.pictureUrl = currentImage ? currentImage : ''

  const [date, setDate] = useState()
  useEffect(() => {
    if (value) {
      setDate({
        from: startDate.toISOString().slice(0, 10),
        to: endDate.toISOString().slice(0, 10),
      })
    }
  }, [value])

  data.from = date ? date.from : ''
  data.to = date ? date.to : ''

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
      .createAvarta(data)
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
              <h3 className='text-lg font-medium leading-6 text-gray-900'>New Avatar</h3>
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
                    <div className='col-span-3 sm:col-span-2 '>
                      <label
                        htmlFor='pictureURL'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Picture URL
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                          Click to select
                        </span>
                        <input
                          type='text'
                          name='pictureURL'
                          id='pictureURL'
                          className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='https://www.example.com'
                          value={currentImage}
                          onClick={handleClick}
                          onChange={change}
                        />
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        >
                          <div
                            className={`${
                              pictures
                                ? 'grid m-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'
                                : ''
                            }`}
                          >
                            {pictures ? (
                              pictures.map((pic, i) => (
                                <div key={i} className='group relative'>
                                  <div className='max-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80'>
                                    <Image
                                      layout='fill'
                                      src={pic}
                                      alt=''
                                      className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                      onClick={() => {
                                        setCurrentImage(pic)
                                        handleClose()
                                      }}
                                    />
                                  </div>
                                </div>
                              ))
                            ) : (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  marginTop: '30px',
                                }}
                              >
                                <CircularProgress className='text-gray-500 ' />
                              </Box>
                            )}
                          </div>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=' my-4 mx-6'>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    rangeColors={['rgb(107 114 128 )']}
                    onChange={handleSelect}
                  />
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

export default Newproject
