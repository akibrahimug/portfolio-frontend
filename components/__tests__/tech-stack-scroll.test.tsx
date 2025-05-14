import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TechStackScroll from '../TechStack-scroll'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren<any>) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.PropsWithChildren<any>) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
}))

describe('TechStackScroll Component', () => {
  it('renders correctly', () => {
    render(<TechStackScroll />)

    // Check if the title is rendered
    expect(screen.getByText('My Tech Stack')).toBeInTheDocument()

    // Check if the description is rendered
    expect(
      screen.getByText('Technologies I work with as a fullstack JavaScript developer'),
    ).toBeInTheDocument()

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText('Search technologies...')).toBeInTheDocument()
  })

  it('filters technologies when searching', () => {
    render(<TechStackScroll />)

    const searchInput = screen.getByPlaceholderText('Search technologies...')

    // Search for React
    fireEvent.change(searchInput, { target: { value: 'React' } })

    // Clear button should appear
    expect(screen.getByText('✕')).toBeInTheDocument()
  })
})
