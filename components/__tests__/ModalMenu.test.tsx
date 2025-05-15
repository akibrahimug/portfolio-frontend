import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ModalMenu from '../ModalMenu'

// Mock the SVG logo
jest.mock('../projectpics/Logo.svg', () => () => <div data-testid='logo'>Logo</div>)

// Mock MUI icon
jest.mock('@mui/icons-material', () => ({
  GitHub: () => <div data-testid='github-icon'>GitHub Icon</div>,
}))

describe('ModalMenu Component', () => {
  const mockHandleClick = jest.fn()
  const mockTitle = 'Test Title'

  beforeEach(() => {
    render(<ModalMenu title={mockTitle} handleClick={mockHandleClick} />)
  })

  it('renders the title correctly', () => {
    expect(screen.getByText(mockTitle)).toBeInTheDocument()
  })

  it('renders the logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders all navigation buttons', () => {
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('TechStack')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
    expect(screen.getByText('Restful API')).toBeInTheDocument()
  })

  it('renders the GitHub link with icon', () => {
    const githubLink = screen.getByRole('link')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/akibrahimug')
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
  })

  it('calls handleClick when buttons are clicked with correct value', () => {
    // Click Contact Me button
    fireEvent.click(screen.getByText('Contact Me'))
    expect(mockHandleClick).toHaveBeenCalledTimes(1)

    // Click TechStack button
    fireEvent.click(screen.getByText('TechStack'))
    expect(mockHandleClick).toHaveBeenCalledTimes(2)

    // Click Resume button
    fireEvent.click(screen.getByText('Resume'))
    expect(mockHandleClick).toHaveBeenCalledTimes(3)

    // Click Restful API button
    fireEvent.click(screen.getByText('Restful API'))
    expect(mockHandleClick).toHaveBeenCalledTimes(4)
  })
})
