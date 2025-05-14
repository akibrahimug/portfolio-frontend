import React from 'react'
import { render, screen } from '@testing-library/react'
import RestHead from '../RestHead'

// Mock the Context
jest.mock('../Context', () => ({
  Context: {
    Consumer: ({ children }: { children: any }) =>
      children({
        authenticatedUser: null,
      }),
    Provider: ({ children }: { children: any }) => children,
  },
}))

// Mock useContext to return different auth states for testing
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockImplementation(() => ({
    authenticatedUser: null,
  })),
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
  it('renders with sign up and sign in links when user is not authenticated', () => {
    render(<RestHead />)

    // Check if the title is rendered
    expect(screen.getByText('My Rest API')).toBeInTheDocument()

    // Check if sign in and sign up links are visible
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()

    // User name and sign out should not be visible
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
  })

  it('renders with user name and sign out link when user is authenticated', () => {
    // Mock authenticated user for this test
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      authenticatedUser: {
        firstName: 'John',
        lastName: 'Doe',
      },
    }))

    render(<RestHead />)

    // Check if the title is rendered
    expect(screen.getByText('My Rest API')).toBeInTheDocument()

    // Check if the avatar is rendered
    expect(screen.getByTestId('avatar')).toBeInTheDocument()

    // Check if the user name is displayed
    expect(screen.getByText('John')).toBeInTheDocument()

    // Check if sign out link is visible
    expect(screen.getByText('Sign Out')).toBeInTheDocument()

    // Sign in and sign up should not be visible
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument()
  })
})
