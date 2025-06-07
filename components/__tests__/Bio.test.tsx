import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Bio from '../Bio'

// Mock Next.js useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
    p: ({ children, ...props }: any) => (
      <p data-testid='motion-p' {...props}>
        {children}
      </p>
    ),
  },
}))

// Mock react-loading-skeleton
jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: ({ width, height, count = 1, className = '' }: any) => (
    <div data-testid='skeleton' style={{ width, height }} className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} data-testid='skeleton-line'>
          Loading...
        </div>
      ))}
    </div>
  ),
}))

describe('Bio Component', () => {
  beforeEach(() => {
    // Setup fake timers
    jest.useFakeTimers()
  })

  afterEach(() => {
    // Clean up timers
    jest.useRealTimers()
  })

  it('initially shows skeleton loading state', () => {
    render(<Bio />)

    // Check for skeleton elements
    const skeletonElements = screen.getAllByTestId('skeleton-line')
    expect(skeletonElements.length).toBeGreaterThan(0)

    // The "About me" text should not be visible yet
    expect(screen.queryByText('About me')).not.toBeInTheDocument()
  })

  it('displays content after loading finishes', () => {
    render(<Bio />)

    // Fast-forward time to complete the loading
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    // Check if the "About me" heading is visible
    expect(screen.getByText('About me')).toBeInTheDocument()

    // Check if the bio text is visible
    expect(screen.getByText(/I'm a Full-Stack JavaScript Developer with/)).toBeInTheDocument()

    // Check if the "Read more" link is visible
    expect(screen.getByText('Read more')).toBeInTheDocument()
  })
})
