import React from 'react'
import { render, screen } from '@testing-library/react'
import Avarta from '../Avarta'

// Mock the useFetch hook
jest.mock('../pages/api/useFetch', () => ({
  useFetch: jest.fn().mockReturnValue({
    data: [
      {
        pictureUrl: 'https://example.com/test.jpg',
        from: '2022-11-25',
      },
    ],
    error: null,
  }),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid='next-image' />
  ),
}))

// Mock the Line SVG component
jest.mock('@/components/projectpics/line.svg', () => () => (
  <div data-testid='line-svg'>Line SVG</div>
))

// Mock the Bio component
jest.mock('@/components/Bio', () => () => <div data-testid='bio-component'>Bio Component</div>)

// Mock Skeleton
jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: ({ width, height }: { width: number; height: number }) => (
    <div data-testid='skeleton' style={{ width, height }}>
      Loading Skeleton
    </div>
  ),
}))

describe('Avarta Component', () => {
  it('renders the avatar image and quote', () => {
    render(<Avarta />)

    // Check if the image is rendered
    expect(screen.getByTestId('next-image')).toBeInTheDocument()

    // Check if the quote is rendered
    expect(
      screen.getByText('"Let\'s create an amazing web experince together."'),
    ).toBeInTheDocument()

    // Check if the scroll down text is rendered
    expect(screen.getByText('Scroll Down')).toBeInTheDocument()

    // Check if the line SVG is rendered
    expect(screen.getByTestId('line-svg')).toBeInTheDocument()

    // Check if the Bio component is rendered
    expect(screen.getByTestId('bio-component')).toBeInTheDocument()
  })

  it('renders skeleton when data is loading', () => {
    // Override the mock to simulate loading state
    require('../pages/api/useFetch').useFetch.mockReturnValueOnce({
      data: null,
      error: null,
    })

    render(<Avarta />)

    // Check if the skeleton is rendered
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()

    // Bio should still be rendered
    expect(screen.getByTestId('bio-component')).toBeInTheDocument()
  })
})
