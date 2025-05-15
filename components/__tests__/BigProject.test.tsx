import React from 'react'
import { render, screen } from '@testing-library/react'
import BigProject from '../BigProject'

// Mock the useFetch hook
jest.mock('../pages/api/useFetch', () => ({
  useFetch: jest.fn().mockImplementation(() => ({
    data: [
      {
        projectID: 1,
        projectTitle: 'Airbnb-clone',
        projectDescription: 'A clone of Airbnb',
        pictureUrl: 'https://example.com/airbnb.jpg',
        githubUrl: 'https://github.com/example/airbnb-clone',
        liveSiteUrl: 'https://airbnb-clone.example.com',
      },
      {
        projectID: 2,
        projectTitle: 'Other Project',
        projectDescription: 'Another project',
        pictureUrl: 'https://example.com/other.jpg',
        githubUrl: 'https://github.com/example/other',
        liveSiteUrl: 'https://other.example.com',
      },
    ],
    error: null,
  })),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img
      src={typeof src === 'string' ? src : 'mocked-image'}
      alt={alt}
      className={className}
      data-testid='next-image'
    />
  ),
}))

// Mock project image
jest.mock('../projectpics/Airbnb.png', () => 'mocked-airbnb-image')

// Mock react-loading-skeleton
jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: ({ height }: { height: number }) => (
    <div data-testid='skeleton' style={{ height }}>
      Loading Skeleton
    </div>
  ),
}))

describe('BigProject Component', () => {
  it('renders the Airbnb project when data is loaded', () => {
    render(<BigProject />)

    // Check if the Projects heading is rendered
    expect(screen.getByText('PROJECTS')).toBeInTheDocument()

    // Check if the image is rendered
    expect(screen.getByTestId('next-image')).toBeInTheDocument()

    // Check that the skeleton is not rendered
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()

    // Check if the link to the live site is correct
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://airbnb-clone.example.com')
  })

  it('renders a skeleton when data is loading', () => {
    // Override the mock for this test to simulate loading
    require('../pages/api/useFetch').useFetch.mockReturnValueOnce({
      data: null,
      error: null,
    })

    render(<BigProject />)

    // Check if the Projects heading is still rendered
    expect(screen.getByText('PROJECTS')).toBeInTheDocument()

    // Check if the skeleton is rendered
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()

    // Check that the image is not rendered
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument()
  })
})
