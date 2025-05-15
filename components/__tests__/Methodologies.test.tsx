import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Methodologies from '../Methodologies'

// Mock Material-UI components
jest.mock('@mui/material/Menu', () => {
  return ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid='menu'>{children}</div> : null
})

jest.mock('@mui/material/MenuItem', () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid='menu-item'>{children}</div>
  )
})

jest.mock('@mui/material/Divider', () => {
  return () => <hr data-testid='divider' />
})

// Mock Heroicons
jest.mock('@heroicons/react/24/solid', () => ({
  BeakerIcon: () => <div data-testid='beaker-icon'>Beaker Icon</div>,
}))

describe('Methodologies Component', () => {
  it('renders the button with correct text', () => {
    render(<Methodologies />)

    // Check if the button text is rendered
    expect(screen.getByText('My Methodology')).toBeInTheDocument()

    // Check if the icon is rendered
    expect(screen.getByTestId('beaker-icon')).toBeInTheDocument()
  })

  it('opens the menu when button is clicked', () => {
    render(<Methodologies />)

    // Initially, the menu should not be visible
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument()

    // Click the button
    fireEvent.click(screen.getByText('My Methodology'))

    // Now the menu should be visible
    expect(screen.getByTestId('menu')).toBeInTheDocument()

    // Check if all methodologies are rendered
    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems.length).toBe(11) // Based on the methodologies array

    // Check for specific methodologies
    expect(screen.getByText('Agile')).toBeInTheDocument()
    expect(screen.getByText('Scrum')).toBeInTheDocument()
    expect(screen.getByText('Test Driven Development')).toBeInTheDocument()
  })
})
