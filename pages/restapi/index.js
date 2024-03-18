import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../components/Context'
import Header from '../../components/Header'
import RestHead from '../../components/RestHead'
import { useRouter } from 'next/router'
const titles = [
  {
    title: 'My Pictures',
    url: 'restapi/privatepictures',
    tag: 'Private',
  },
  {
    title: 'Projects',
    url: 'restapi/projects',
  },
  {
    title: 'Profiles',
    url: 'restapi/profiles',
  },
  {
    title: 'Certificates',
    url: 'restapi/certification',
  },
  {
    title: 'Badges',
    url: 'restapi/badges',
  },
  {
    title: 'Technologies',
    url: 'restapi/technologies',
  },
  {
    title: 'Resumes',
    url: 'restapi/resume',
  },

  {
    title: 'Experience',
    url: 'restapi/experiences',
  },
  {
    title: 'Messages',
    url: 'restapi/privatemessages',
    tag: 'Private',
  },
]
function MyRestAPI() {
  // call the authenticated user data fro context
  const { noAuthRoutes } = useContext(Context)
  const router = useRouter()

  const [messages, setMessages] = useState([])

  // rerender the page if new message is added

  useEffect(() => {
    noAuthRoutes.getMessage().then((res) => {
      setMessages(res)
    })
  }, [])

  return (
    <>
      <Header />
      <RestHead />
      <main className='max-w-[1250px] m-auto p-[1rem]'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {titles.map((title, index) => (
            <button
              key={index}
              onClick={() => router.push(`${title.url}`)}
              className={`${
                title.tag ? 'bg-gray-700 text-white' : 'bg-gray-200'
              } text-2xl font-bold mb-4 relative border p-10 text-center rounded-md  `}
            >
              {title.title}
              {title.tag ? (
                <span className='absolute top-[-10px] left-[-10px] text-sm text-black rounded-md p-1 bg-gray-200'>
                  {title.tag}
                </span>
              ) : (
                <></>
              )}
              {title.title === 'Messages' ? (
                <span className='absolute top-[-10px] right-[-10px] text-sm text-white p-3 rounded-full bg-red-500 '>
                  {messages.length}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </main>
    </>
  )
}

export default MyRestAPI
