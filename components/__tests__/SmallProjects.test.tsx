import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SmallProjects from '../SmallProjects'

// Mock React's useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockReturnValue({
    noAuthRoutes: {
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

// Mock react-loading-skeleton
jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: ({ height }: { height: number }) => (
    <div data-testid='skeleton' style={{ height }}>
      Loading Skeleton
    </div>
  ),
}))

// Mock window.open
const mockOpen = jest.fn()
global.open = mockOpen

describe('SmallProjects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders projects with their details and tech stacks', async () => {
    render(<SmallProjects />)

    // Initially it should show loading skeletons
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)

    // Wait for the useEffect to complete and check if projects are rendered
    // Note: In a real test environment, we'd use waitFor or similar, but for this test we'll just check synchronously

    // Check for project titles
    expect(await screen.findByText('Test Project 1')).toBeInTheDocument()
    expect(await screen.findByText('Test Project 2')).toBeInTheDocument()

    // Check for tech stack tags
    expect(await screen.findByText('React')).toBeInTheDocument()
    expect(await screen.findByText('TypeScript')).toBeInTheDocument()
    expect(await screen.findByText('Node.js')).toBeInTheDocument()

    // Check for "Show More" buttons (from TextToggle)
    const showMoreButtons = await screen.findAllByText('Show More')
    expect(showMoreButtons.length).toBeGreaterThan(0)

    // Check for "Project Code" links
    const projectCodeLinks = await screen.findAllByText('Project Code')
    expect(projectCodeLinks.length).toBe(2)
  })

  it('toggles text visibility when clicking Show More/Less', async () => {
    render(<SmallProjects />)

    // Wait for the content to load
    const showMoreButton = await screen.findByText('Show More')

    // Click the Show More button
    fireEvent.click(showMoreButton)

    // Button should now say "Show Less"
    expect(screen.getByText('Show Less')).toBeInTheDocument()

    // Click the Show Less button
    fireEvent.click(screen.getByText('Show Less'))

    // Button should now say "Show More" again
    expect(screen.getByText('Show More')).toBeInTheDocument()
  })

  it('opens the project URL when clicking on the image', async () => {
    render(<SmallProjects />)

    // Wait for the projects to load
    const projectImages = await screen.findAllByRole('img')

    // Click on the first project image
    fireEvent.click(projectImages[0])

    // Check if window.open was called with the correct URL
    expect(mockOpen).toHaveBeenCalledWith('https://test1.example.com', '_blank')
  })
})
