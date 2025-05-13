import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Context } from './Context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function TextToggle({ text, clamp = 3 }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className='space-y-1'>
      <div className={expanded ? '' : `line-clamp-${clamp}`}>{text}</div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className='text-black hover:text-red-400 transition-colors font-semibold'
      >
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

export default function SmallProjects() {
  const { noAuthRoutes } = useContext(Context)
  const [data, setData] = useState({ projects: [], techStacks: [], technologies: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let canceled = false
    async function fetchData() {
      setLoading(true)
      try {
        const [projectsRes, stacksRes, techsRes] = await Promise.all([
          noAuthRoutes.getProjects(),
          noAuthRoutes.getProjectTechStack(),
          noAuthRoutes.getTechnologies(),
        ])
        if (!canceled) {
          setData({
            projects: projectsRes,
            techStacks: stacksRes,
            technologies: techsRes,
          })
        }
      } catch (err) {
        if (!canceled) setError(err)
      } finally {
        if (!canceled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      canceled = true
    }
  }, [noAuthRoutes])

  const techMap = useMemo(() => {
    return new Map(data.technologies.map((t) => [t.techStackID, t]))
  }, [data.technologies])

  const enrichedProjects = useMemo(() => {
    return data.projects
      .slice()
      .sort((a, b) => b.projectID - a.projectID)
      .map((project) => {
        const techIDs = data.techStacks
          .filter((ts) => ts.projectID === project.projectID)
          .map((ts) => ts.techStackID)
        const techs = techIDs.map(
          (id) => techMap.get(id) || { techStackID: id, techTitle: 'Unknown' },
        )
        return { ...project, techStacks: techs }
      })
  }, [data.projects, data.techStacks, techMap])

  if (loading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-[1400px] m-8'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='rounded-md shadow-sm'>
            <Skeleton height={350} />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className='text-red-500'>Failed to load projects.</p>
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-[1400px] m-8'>
      {enrichedProjects.map((project) => (
        <div
          key={project.projectID}
          className='relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
        >
          <img
            className='rounded-t-lg h-60 w-full object-cover cursor-pointer'
            src={project.pictureUrl}
            alt={project.projectTitle}
            onClick={() => window.open(project.liveSiteUrl, '_blank')}
          />
          <div className='p-5'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {project.projectTitle}
            </h5>
            <div className='mb-4 flex flex-wrap'>
              {project.techStacks.map((tech) => (
                <span
                  key={tech.techStackID}
                  className='inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-gray-500 rounded-3xl m-1 dark:bg-gray-600'
                >
                  {tech.techTitle}
                </span>
              ))}
            </div>
            <p className='mb-10 text-gray-500 dark:text-gray-400'>
              <TextToggle text={project.projectDescription} />
            </p>
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noreferrer'
              className='absolute bottom-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            >
              Project Code
              <svg
                className='w-3.5 h-3.5 ms-2'
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
      ))}
    </div>
  )
}
