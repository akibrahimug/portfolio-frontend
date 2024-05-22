import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Context } from './Context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TextToggle = ({ text, length }) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div className='space-y-1 '>
      <div className={isShown ? '' : 'line-clamp-3'}>{text}</div>
      <button
        onClick={() => setIsShown(!isShown)}
        className='text-black hover:text-red-400 transition-colors font-semibold'
      >
        {isShown ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

export default function SmallProjects() {
  const { noAuthRoutes } = useContext(Context)

  // State for projects, tech stacks, and technologies
  const [projects, setProjects] = useState([])
  const [projectTechStacks, setProjectTechStacks] = useState([])
  const [technologies, setTechnologies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all necessary data
        const projectsRes = await noAuthRoutes.getProjects()
        const techStacksRes = await noAuthRoutes.getProjectTechStack()
        const technologiesRes = await noAuthRoutes.getTechnologies()

        setProjects(projectsRes.sort((a, b) => b.projectID - a.projectID))
        setProjectTechStacks(techStacksRes)
        setTechnologies(technologiesRes)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  // Create a map of techStackID to technology details for quick lookup
  const techMap = useMemo(() => {
    const map = new Map()
    technologies.forEach((tech) => map.set(tech.techStackID, tech))
    return map
  }, [technologies])

  // Map projects to include their tech stacks with full technology details
  const projectsWithTechStack = useMemo(
    () =>
      projects.map((project) => {
        const techStacksForProject = projectTechStacks.filter(
          (ts) => ts.projectID === project.projectID,
        )
        const techDetails = techStacksForProject.map(
          (ts) => techMap.get(ts.techStackID) || { techStackID: ts.techStackID, name: 'Unknown' },
        )
        return {
          ...project,
          techStacks: techDetails, // Include full details
        }
      }),
    [projects, projectTechStacks, techMap],
  )

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

  return (
    <div className='md:grid xl:grid-cols-3 md:grid-cols-2 gap-6 place-content-center max-w-[1400px] m-8 2xl:m-auto'>
      {projectsWithTechStack
        ? projectsWithTechStack.map((project, i) => (
            <div
              key={i}
              className='max-w-m relative bg-white border mt-8 md:mt-0 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
            >
              <img
                className='rounded-t-lg h-60 w-full object-cover object-center cursor-pointer'
                src={project.pictureUrl}
                alt={project.projectTitle}
                onClick={() => window.open(project.liveSiteUrl)}
              />

              <div className='p-5 '>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {project.projectTitle}
                </h5>
                <div className='mb-4 '>
                  {project.techStacks.map((tech, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-gray-500 rounded-3xl m-1 dark:bg-gray-600 '
                    >
                      {tech.techTitle}
                    </span>
                  ))}
                </div>
                <p className='mb-10 font-normal text-gray-500 dark:text-gray-400'>
                  <TextToggle text={project.projectDescription} />
                </p>
                <a
                  target='_blank'
                  href={project.githubUrl}
                  className={`${
                    project.projectTitle === 'CHICOTÁS: STRETCHES OF LIFE' ? 'hidden w-0' : ''
                  }inline-flex items-center absolute bottom-4  px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
                  rel='noreferrer'
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
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
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
