import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ProfileDesc from '../ProfileDesc'

// Mock the modules that might cause issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      // Filter out framer-motion specific props
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileFocus,
        whileInView,
        drag,
        dragConstraints,
        onAnimationComplete,
        layout,
        layoutId,
        ...domProps
      } = props
      return <div {...domProps}>{children}</div>
    },
    a: ({ children, ...props }: any) => {
      // Filter out framer-motion specific props
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileFocus,
        whileInView,
        drag,
        dragConstraints,
        onAnimationComplete,
        layout,
        layoutId,
        ...domProps
      } = props
      return <a {...domProps}>{children}</a>
    },
  },
  useInView: () => true,
}))

// Mock the Contact component
jest.mock('../Contact', () => {
  return function MockContact() {
    return <div data-testid='contact-component'>Contact Form</div>
  }
})

// Mock dialog from ui components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock Button from ui components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Send: () => <span data-testid='send-icon'>SendIcon</span>,
  ArrowUpRight: () => <span data-testid='arrow-up-right-icon'>ArrowUpRightIcon</span>,
  Github: () => <span data-testid='github-icon'>GithubIcon</span>,
  Linkedin: () => <span data-testid='linkedin-icon'>LinkedinIcon</span>,
  Twitter: () => <span data-testid='twitter-icon'>TwitterIcon</span>,
  CheckCircle: () => <span data-testid='check-circle-icon'>CheckCircleIcon</span>,
}))

describe('ProfileDesc Component', () => {
  const mockCertified = ['Certification 1', 'Certification 2', 'Certification 3']
  let mockScrollIntoView: jest.Mock

  beforeEach(() => {
    // Mock scrollIntoView
    mockScrollIntoView = jest.fn()
    global.document.getElementById = jest.fn().mockImplementation(() => ({
      scrollIntoView: mockScrollIntoView,
    }))

    // Reset timers before each test
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('initially renders with loading state', () => {
    const { container } = render(<ProfileDesc certified={mockCertified} />)

    // Should show loading skeletons
    const pulseElements = container.querySelectorAll('.animate-pulse')
    expect(pulseElements.length).toBeGreaterThan(0)

    // Content should not be visible yet
    expect(screen.queryByText(/Hi, I'm/)).not.toBeInTheDocument()
  })

  it('displays content after loading completes', () => {
    render(<ProfileDesc certified={mockCertified} />)

    // Advance timers to finish loading
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Check if content is visible after loading (using partial text matches)
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
    expect(screen.getByText('Ibrahim')).toBeInTheDocument()
    expect(screen.getByText(/FULLSTACK/)).toBeInTheDocument()
    expect(screen.getByText(/DEVELOPER/)).toBeInTheDocument()

    // Check for buttons
    expect(screen.getByText("Let's talk")).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()

    // Check for social links (3 total)
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()

    // Check for certifications
    mockCertified.forEach((cert) => {
      expect(screen.getByText(cert)).toBeInTheDocument()
    })
  })

  it('triggers scrollToProjects when Portfolio button is clicked', () => {
    render(<ProfileDesc certified={mockCertified} />)

    // Advance timers to finish loading
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Click the Portfolio button
    fireEvent.click(screen.getByText('Portfolio'))

    // Check if scrollIntoView was called
    expect(document.getElementById).toHaveBeenCalledWith('projects')
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    })
  })
})
