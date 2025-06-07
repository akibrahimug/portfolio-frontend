import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MainHeader from '../MainHeader'

// Mock next/navigation
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

// Mock the TechStack component that might be referenced
jest.mock('../TechStack-scroll', () => {
  return () => <div data-testid='techstack-component'>TechStack Component</div>
})

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid='github-icon'>GitHub Icon</div>,
}))

// Mock scrollIntoView method
Object.defineProperty(window, 'Element', {
  value: {
    prototype: {
      scrollIntoView: jest.fn(),
    },
  },
})

// Mock document.getElementById
Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue({
    scrollIntoView: jest.fn(),
  }),
})

// Mock window.open
const mockOpen = jest.fn()
global.open = mockOpen

describe('MainHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the navigation buttons', () => {
    render(<MainHeader />)

    // Check if all buttons are rendered
    expect(screen.getByText('Email Me')).toBeInTheDocument()
    expect(screen.getByText('TechStack')).toBeInTheDocument()
    expect(screen.getByText('REST API')).toBeInTheDocument()
  })

  it('opens email when Contact Me button is clicked', () => {
    render(<MainHeader />)

    // Click the Contact Me button (Email Me)
    fireEvent.click(screen.getByText('Email Me'))

    // Check if window.open was called with mailto
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('mailto:kasomaibrahim@gmail.com'),
      '_self',
    )
  })

  it('scrolls to tech stack when TechStack button is clicked', () => {
    const mockScrollIntoView = jest.fn()
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
    }

    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)

    render(<MainHeader />)

    // Click the TechStack button
    fireEvent.click(screen.getByText('TechStack'))

    // Check if getElementById was called with 'tech-stack'
    expect(document.getElementById).toHaveBeenCalledWith('tech-stack')
  })
})
