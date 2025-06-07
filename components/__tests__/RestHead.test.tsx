import React from 'react'
import { render, screen } from '@testing-library/react'
import RestHead from '../RestHead'

// Mock the entire useEffect and useState to avoid infinite loops
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
  useState: jest.fn(),
  useEffect: jest.fn(),
}))

// Mock Avatar from MUI
jest.mock('@mui/material/Avatar', () => {
  return function MockAvatar() {
    return <div data-testid='avatar'>Avatar</div>
  }
})

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid={`link-to-${href}`}>
      {children}
    </a>
  )
})

describe('RestHead Component', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Mock useState to return null user state initially (no authenticated user)
    const mockSetState = jest.fn()
    ;(React.useState as jest.Mock).mockReturnValue([null, mockSetState])

    // Mock useEffect to not run (prevent infinite loops)
    ;(React.useEffect as jest.Mock).mockImplementation(() => {})
  })

  it('renders with sign up and sign in links when user is not authenticated', () => {
    // Explicitly mock useState to return null user state
    const mockSetState = jest.fn()
    ;(React.useState as jest.Mock).mockReturnValue([null, mockSetState])

    // Mock useContext to return no authenticated user
    ;(React.useContext as jest.Mock).mockReturnValue({
      authenticatedUser: null,
    })

    render(<RestHead />)

    // Check if the title is rendered
    expect(screen.getByText('My Rest API')).toBeInTheDocument()

    // Check if sign in and sign up links are visible
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()

    // Just check that the component renders without crashing
    // Note: The CSS classes control visibility, not actual DOM presence
  })

  it('renders basic structure correctly', () => {
    // Mock useContext to return no authenticated user
    ;(React.useContext as jest.Mock).mockReturnValue({
      authenticatedUser: null,
    })

    render(<RestHead />)

    // Check if the main elements are rendered
    expect(screen.getByText('My Rest API')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument() // header element
    expect(screen.getByRole('navigation')).toBeInTheDocument() // nav element
  })
})
