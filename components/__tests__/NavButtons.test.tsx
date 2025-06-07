import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavButtons from '../NavButtons'

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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid='github-icon'>GitHub Icon</div>,
}))

describe('NavButtons Component', () => {
  it('renders correctly with all buttons', () => {
    render(<NavButtons />)

    // Check if all buttons are rendered
    expect(screen.getByText('Email Me')).toBeInTheDocument()
    expect(screen.getByText('TechStack')).toBeInTheDocument()
    expect(screen.getByText('REST API')).toBeInTheDocument()

    // Check if GitHub icon is rendered
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
  })

  it('calls expected functions when buttons are clicked', () => {
    // Mock window.open for email functionality
    const mockOpen = jest.fn()
    Object.defineProperty(window, 'open', {
      value: mockOpen,
      writable: true,
    })

    render(<NavButtons />)

    // Click on Email Me button
    fireEvent.click(screen.getByText('Email Me'))
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('mailto:kasomaibrahim@gmail.com'),
      '_self',
    )
  })

  it('has the correct GitHub link', () => {
    render(<NavButtons />)

    // Check if the GitHub link is correct
    const githubLink = screen.getByRole('link')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/akibrahimug')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
