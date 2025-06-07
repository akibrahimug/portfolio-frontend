import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SmallProjects from '../SmallProjects'

// Mock the Context component
jest.mock('../AppContext', () => {
  return {
    AppContext: {
      Consumer: ({ children }: { children: any }) =>
        children({
          noAuth: {
            getProjects: jest.fn().mockResolvedValue([]),
          },
        }),
    },
    Provider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }
})

// Mock the AnimatedCardWrapper and other components
jest.mock('../AnimatedCardWrapper', () => ({
  AnimatedCardWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../ProjectCard', () => ({
  ProjectCard: ({ project }: { project: any }) => (
    <div data-testid='project-card'>
      <h3>{project.projectTitle}</h3>
      <p>{project.projectDescription}</p>
      <div data-testid='tech-stacks'>
        {project.techStacks?.map((tech: any) => (
          <span key={tech.techStackID}>{tech.techTitle}</span>
        ))}
      </div>
      <img src={project.pictureUrl} alt={project.projectTitle} data-testid='project-image' />
      <a href={project.githubUrl}>Project Code</a>
    </div>
  ),
}))

jest.mock('../Pagination', () => ({
  Pagination: () => <div data-testid='pagination'>Pagination</div>,
}))

// Mock the Skeleton component
jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid='skeleton' className={className}>
      Loading Skeleton
    </div>
  ),
}))

// Mock React's useContext to return our mock context value
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockReturnValue({
    noAuth: {
      getProjects: jest.fn().mockResolvedValue([
        {
          projectID: 1,
          projectTitle: 'Test Project 1',
          projectDescription:
            'This is a test project description that is long enough to test the TextToggle component',
          pictureUrl: 'https://example.com/test1.jpg',
          githubUrl: 'https://github.com/example/test1',
          liveSiteUrl: 'https://test1.example.com',
        },
        {
          projectID: 2,
          projectTitle: 'Test Project 2',
          projectDescription: 'Another test project description',
          pictureUrl: 'https://example.com/test2.jpg',
          githubUrl: 'https://github.com/example/test2',
          liveSiteUrl: 'https://test2.example.com',
        },
      ]),
      getProjectTechStack: jest.fn().mockResolvedValue([
        { techStackID: 1, projectID: 1 },
        { techStackID: 2, projectID: 1 },
        { techStackID: 3, projectID: 2 },
      ]),
      getTechnologies: jest.fn().mockResolvedValue([
        { techStackID: 1, techTitle: 'React' },
        { techStackID: 2, techTitle: 'TypeScript' },
        { techStackID: 3, techTitle: 'Node.js' },
      ]),
    },
  }),
}))

describe('SmallProjects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders projects with their details and tech stacks', async () => {
    render(<SmallProjects />)

    // Wait for the projects to load
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    })

    expect(screen.getByText('Test Project 2')).toBeInTheDocument()

    // Check for tech stack tags
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()

    // Check for "Project Code" links
    const projectCodeLinks = screen.getAllByText('Project Code')
    expect(projectCodeLinks.length).toBe(2)
  })

  it('renders project images', async () => {
    render(<SmallProjects />)

    // Wait for the projects to load
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    })

    // Check for project images
    const projectImages = screen.getAllByTestId('project-image')
    expect(projectImages.length).toBe(2)
  })
})
