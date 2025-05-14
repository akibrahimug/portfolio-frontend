import React from 'react'
import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

// Mock the components used in Projects
jest.mock('../BigProject', () => () => <div data-testid='mock-big-project'>BigProject</div>)
jest.mock('../SmallProjects', () => () => (
  <div data-testid='mock-small-projects'>SmallProjects</div>
))

describe('Projects Component', () => {
  it('renders correctly', () => {
    render(<Projects />)

    // Check if BigProject is rendered
    expect(screen.getByTestId('mock-big-project')).toBeInTheDocument()

    // Check if SmallProjects is rendered
    expect(screen.getByTestId('mock-small-projects')).toBeInTheDocument()

    // Check if the projects container has the correct id
    const projectsContainer = screen.getByText('BigProject').closest('div[id="projects"]')
    expect(projectsContainer).toBeInTheDocument()
  })
})
