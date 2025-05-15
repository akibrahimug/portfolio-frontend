import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavButtons from '../NavButtons'

// Mock MUI icon
jest.mock('@mui/icons-material/GitHub', () => () => (
  <div data-testid='github-icon'>GitHub Icon</div>
))

describe('NavButtons Component', () => {
  it('renders correctly with all buttons', () => {
    const mockHandleClick = jest.fn()

    render(<NavButtons handleClick={mockHandleClick} />)

    // Check if all buttons are rendered
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('TechStack')).toBeInTheDocument()
    expect(screen.getByText('REST API')).toBeInTheDocument()

    // Check if GitHub icon is rendered
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
  })

  it('calls handleClick when buttons are clicked', () => {
    const mockHandleClick = jest.fn()

    render(<NavButtons handleClick={mockHandleClick} />)

    // Click on Contact Me button
    fireEvent.click(screen.getByText('Contact Me'))
    expect(mockHandleClick).toHaveBeenCalledTimes(1)

    // Click on TechStack button
    fireEvent.click(screen.getByText('TechStack'))
    expect(mockHandleClick).toHaveBeenCalledTimes(2)

    // Click on REST API button
    fireEvent.click(screen.getByText('REST API'))
    expect(mockHandleClick).toHaveBeenCalledTimes(3)
  })

  it('has the correct GitHub link', () => {
    const mockHandleClick = jest.fn()

    render(<NavButtons handleClick={mockHandleClick} />)

    // Check if the GitHub link is correct
    const githubLink = screen.getByRole('link')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/akibrahimug')
  })
})
