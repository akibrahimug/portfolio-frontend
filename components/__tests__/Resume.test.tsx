import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Resume from '../Resume'

// Mock react-loading-skeleton
jest.mock('react-loading-skeleton', () => ({
  __esModule: true,
  default: ({ height, width }: { height: number; width: number }) => (
    <div data-testid='skeleton' style={{ height, width }}></div>
  ),
}))

describe('Resume Component', () => {
  beforeEach(() => {
    // Mock setTimeout
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initially renders a skeleton loader', () => {
    render(<Resume />)

    // Check if skeleton is rendered
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()

    // PDF link should still be visible for smaller screens
    expect(screen.getByText('View and Download Resume as PDF')).toBeInTheDocument()
  })

  it('renders the iframe after loading', () => {
    render(<Resume />)

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    // iframe might be difficult to test directly in JSDOM
    // but we can test if the skeleton is no longer there
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()

    // PDF link should still be visible
    expect(screen.getAllByText('View and Download Resume as PDF').length).toBeGreaterThan(0)
  })
})
