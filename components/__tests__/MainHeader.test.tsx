import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MainHeader from '../MainHeader'

// Mock the components used in MainHeader
jest.mock('../NavButtons', () => {
  return ({ handleClick }: { handleClick: (e: any) => void }) => (
    <div data-testid='nav-buttons'>
      <button data-testid='contact-button' value='Contact Me' onClick={handleClick}>
        Contact Me
      </button>
      <button data-testid='tech-button' value='TechStack' onClick={handleClick}>
        TechStack
      </button>
      <button data-testid='rest-button' value='Restful API' onClick={handleClick}>
        REST API
      </button>
    </div>
  )
})

jest.mock('../ModalMenu', () => {
  return ({ title }: { title: string }) => <div data-testid='modal-menu'>Modal: {title}</div>
})

jest.mock('../Contact', () => {
  return () => <div data-testid='contact-component'>Contact Component</div>
})

jest.mock('../MyRestApi', () => {
  return () => <div data-testid='restapi-component'>REST API Component</div>
})

jest.mock('../TechStack', () => {
  return () => <div data-testid='techstack-component'>TechStack Component</div>
})

jest.mock('../Resume', () => {
  return () => <div data-testid='resume-component'>Resume Component</div>
})

jest.mock('@heroicons/react/24/solid', () => ({
  BeakerIcon: () => <div data-testid='beaker-icon'>Beaker Icon</div>,
}))

jest.mock('@mui/icons-material', () => ({
  Close: () => <div data-testid='close-icon'>Close Icon</div>,
}))

describe('MainHeader Component', () => {
  it('renders NavButtons component', () => {
    render(<MainHeader />)

    // Check if NavButtons is rendered
    expect(screen.getByTestId('nav-buttons')).toBeInTheDocument()

    // Modal should not be visible initially
    expect(screen.queryByTestId('modal-menu')).not.toBeInTheDocument()
  })

  it('shows Contact component when Contact Me button is clicked', () => {
    render(<MainHeader />)

    // Click Contact Me button
    fireEvent.click(screen.getByTestId('contact-button'))

    // Modal should be visible
    expect(screen.getByTestId('modal-menu')).toBeInTheDocument()

    // Contact component should be visible
    expect(screen.getByTestId('contact-component')).toBeInTheDocument()

    // Other components should not be visible
    expect(screen.queryByTestId('restapi-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('techstack-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('resume-component')).not.toBeInTheDocument()
  })

  it('shows TechStack component when TechStack button is clicked', () => {
    render(<MainHeader />)

    // Click TechStack button
    fireEvent.click(screen.getByTestId('tech-button'))

    // Modal should be visible
    expect(screen.getByTestId('modal-menu')).toBeInTheDocument()

    // TechStack component should be visible
    expect(screen.getByTestId('techstack-component')).toBeInTheDocument()

    // Other components should not be visible
    expect(screen.queryByTestId('contact-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('restapi-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('resume-component')).not.toBeInTheDocument()
  })
})
