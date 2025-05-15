'use client'

import React, { useState, useEffect, useMemo, useContext } from 'react'
import { AnimatedCardWrapper } from '@/components/AnimatedCardWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { Context } from '@/components/Context'
import { ProjectCard } from '@/components/ProjectCard'
import { Pagination } from '@/components/Pagination'
interface Technology {
  techStackID: string | number
  techTitle: string
  pictureUrl?: string
}

interface TechStack {
  techStackID: string | number
  projectID: string | number
}

interface Project {
  projectID: string | number
  projectTitle: string
  projectDescription: string
  pictureUrl: string
  githubUrl: string
  liveSiteUrl: string
  techStacks?: Technology[]
}

interface DataState {
  projects: Project[]
  techStacks: TechStack[]
  technologies: Technology[]
}

interface ApiRoutes {
  getProjects: () => Promise<Project[]>
  getProjectTechStack: () => Promise<TechStack[]>
  getTechnologies: () => Promise<Technology[]>
}

interface SmallProjectsProps {
  apiRoutes?: ApiRoutes
  initialData?: DataState
}

const SmallProjects: React.FC<SmallProjectsProps> = ({
  itemsPerPage = 6, // Default to 6 items per page
}) => {
  const context = useContext(Context)
  const noAuthRoutes = context?.noAuthRoutes

  const [data, setData] = useState<DataState>({
    projects: [],
    techStacks: [],
    technologies: [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    if (!noAuthRoutes) {
      setLoading(false)
      return
    }

    let canceled = false
    async function fetchData() {
      setLoading(true)
      try {
        const projectsPromise = noAuthRoutes?.getProjects()
        const techStacksPromise = noAuthRoutes?.getProjectTechStack()
        const technologiesPromise = noAuthRoutes?.getTechnologies()

        const [projectsRes, stacksRes, techsRes] = await Promise.all([
          projectsPromise,
          techStacksPromise,
          technologiesPromise,
        ])
        if (!canceled) {
          setData({
            projects: projectsRes,
            techStacks: stacksRes,
            technologies: techsRes,
          })
        }
      } catch (err) {
        if (!canceled) setError(err instanceof Error ? err : new Error('Unknown error'))
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
      .sort((a, b) => Number(b.projectID) - Number(a.projectID))
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

  // Calculate pagination values
  const totalPages = Math.ceil(enrichedProjects.length / itemsPerPage)

  // Get current page items
  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return enrichedProjects.slice(startIndex, startIndex + itemsPerPage)
  }, [enrichedProjects, currentPage, itemsPerPage])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the projects section
    window.scrollTo({ top: 12000, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm'
            >
              <Skeleton className='aspect-video w-full' />
              <div className='p-5 space-y-4'>
                <Skeleton className='h-6 w-3/4' />
                <div className='flex flex-wrap gap-1.5'>
                  <Skeleton className='h-5 w-16 rounded-full' />
                  <Skeleton className='h-5 w-20 rounded-full' />
                  <Skeleton className='h-5 w-14 rounded-full' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
                <div className='flex gap-2 pt-4'>
                  <Skeleton className='h-9 w-20 rounded-md' />
                  <Skeleton className='h-9 w-20 rounded-md' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive'>
          <p>Failed to load projects. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr'>
        {currentProjects.map((project, index) => (
          <AnimatedCardWrapper key={project.projectID} index={index}>
            <ProjectCard project={project} />
          </AnimatedCardWrapper>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-12'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Page indicator for accessibility */}
      <p className='text-center text-sm text-muted-foreground mt-4'>
        Page {currentPage} of {totalPages} ({enrichedProjects.length} projects)
      </p>
    </div>
  )
}

export default SmallProjects
