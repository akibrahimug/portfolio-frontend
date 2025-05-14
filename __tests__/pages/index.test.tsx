import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

// Mock the components used in the Home page
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-head'>{children}</div>
  ),
}))

jest.mock('../../components/Header', () => () => <div data-testid='mock-header'>Header</div>)
jest.mock('../../components/HeroSection', () => () => (
  <div data-testid='mock-hero-section'>HeroSection</div>
))
jest.mock('../../components/Projects', () => () => <div data-testid='mock-projects'>Projects</div>)
jest.mock('@/components/TechStack-scroll', () => () => (
  <div data-testid='mock-tech-stack'>TechStackScroll</div>
))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid='mock-motion-div' {...props}>
        {children}
      </div>
    ),
  },
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useSpring: () => ({ current: 0 }),
}))

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />)

    // Check if the title is set correctly
    expect(screen.getByText('Kasoma Ibrahim')).toBeInTheDocument()

    // Check if all main components are rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('mock-projects')).toBeInTheDocument()
    expect(screen.getByTestId('mock-tech-stack')).toBeInTheDocument()

    // Check if the progress bar is rendered
    expect(screen.getByTestId('mock-motion-div')).toBeInTheDocument()
  })
})
