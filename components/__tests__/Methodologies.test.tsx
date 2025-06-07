import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Methodologies from '../Methodologies'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Beaker: () => <div data-testid='beaker-icon'>Beaker Icon</div>,
  ChevronDown: () => <div>ChevronDown</div>,
  BarChart2: () => <div>BarChart2</div>,
  X: () => <div>X</div>,
}))

describe('Methodologies Component', () => {
  it('renders the button with correct text', () => {
    render(<Methodologies />)

    // Check if the button text is rendered
    expect(screen.getByText('My Methodology')).toBeInTheDocument()

    // Check if the icon is rendered (now using the mocked Beaker icon)
    expect(screen.getByTestId('beaker-icon')).toBeInTheDocument()
  })

  it('button is clickable and has correct attributes', () => {
    render(<Methodologies />)

    // Find the dropdown trigger button
    const button = screen.getByRole('button')

    // Check if button has correct aria attributes
    expect(button).toHaveAttribute('aria-haspopup', 'menu')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    // Check if button is clickable (doesn't throw an error)
    fireEvent.click(button)

    // After clicking, the component should still be rendered
    expect(screen.getByText('My Methodology')).toBeInTheDocument()
  })
})
