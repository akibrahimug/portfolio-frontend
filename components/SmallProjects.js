/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { Context } from './Context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const techStack = [
  {
    techStackID: 0,
    techStackName: ['React', 'Nextjs', 'TailwindCSS', 'Vercel', 'GIT', 'GITHUB', 'AJAX'],
  },
  {
    techStackID: 1,
    techStackName: ['React', 'Firebase', 'CSS', 'Stripe', 'GIT', 'GITHUB'],
  },
  {
    techStackID: 2,
    techStackName: ['React', 'React-Router-DOM', 'CSS', 'GIT', 'GITHUB', 'Netlify', 'AJAX'],
  },
  {
    techStackID: 3,
    techStackName: ['React', 'AJAX', 'CSS', 'GIT', 'GITHUB', 'Netlify'],
  },
  {
    techStackID: 4,
    techStackName: ['WordPress', 'Elementor Page Builder', 'CSS', 'PHP', 'Docker'],
  },
  {
    techStackID: 5,
    techStackName: ['Sass', 'HTML', 'GIT', 'GITHUB', 'GitHub Pages'],
  },
  {
    techStackID: 6,
    techStackName: ['Bootstrap', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 7,
    techStackName: ['AJAX', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 8,
    techStackName: ['OOP', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 9,
    techStackName: [
      'React',
      'Tailwind',
      'Nodejs',
      'Express',
      'Sequelize',
      'Postgres',
      'Google Colud Platform',
      'Nextjs',
    ],
  },
  {
    techStackID: 10,
    techStackName: ['Javascript', 'CSS', 'HTML', 'ChartJS', 'LocalStorage'],
  },
  {
    techStackID: 11,
    techStackName: ['Javascript', 'CSS', 'HTML', 'Regular Expressions'],
  },
]

const ITEM_HEIGHT = 48

export default function SmallProjects() {
  const { noAuthRoutes } = useContext(Context)

  // get all projects
  const [projects, setProjects] = useState([])
  useEffect(() => {
    noAuthRoutes.getProjects().then((res) => {
      // rearrange projects array so that the most recent project is first
      setProjects(res.sort((a, b) => a.projectID - b.projectID))
    })
  }, [])

  // create a new array adding to each object by index
  // the tech stack that belongs to that project
  const projectsWithTechStack = projects?.map((project, i) => {
    return { ...project, techStack: techStack[i].techStackName }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const open = Boolean(anchorEl)
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedIndex(index === selectedIndex ? -1 : index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  console.log(projects)
  return (
    <div className='md:grid xl:grid-cols-3 md:grid-cols-2 gap-6 place-content-center max-w-[1400px] m-8'>
      {projectsWithTechStack
        ? projectsWithTechStack.map((project, i) => (
            <div
              key={i}
              className='max-w-m bg-white border mt-8 md:mt-0 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
            >
              <img
                className='rounded-t-lg h-60 w-full object-cover object-center cursor-pointer'
                src={project.pictureUrl}
                alt={project.projectTitle}
                onClick={() => window.open(project.liveSiteUrl)}
              />
              <div class='p-5 '>
                <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {project.projectTitle}
                </h5>
                <p class='mb-3 font-normal text-gray-500 dark:text-gray-400'>
                  {project.projectDescription}
                </p>
                <a
                  href={project.githubUrl}
                  className={`${
                    project.projectTitle === 'CHICOTÁS: STRETCHES OF LIFE' ? 'hidden w-0' : ''
                  }inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
                >
                  Project Code
                  <svg
                    className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 10'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M1 5h12m0 0L9 1m4 4L9 9'
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))
        : Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className=' m-6 rounded-md shadow-sm'>
              <Skeleton key={i} height={580} />
            </div>
          ))}
    </div>
  )
}
