import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialMedia from '../SocialMedia'

describe('SocialMedia Component', () => {
  it('renders with the correct link, icon, and text', () => {
    // Create a mock icon
    const mockIcon = <div data-testid='mock-icon'>Icon</div>

    // Render the component
    render(<SocialMedia link='https://example.com' icon={mockIcon} text='Example Link' />)

    // Check if the link is rendered with the correct href
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', 'https://example.com')

    // Check if the icon is rendered
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

    // Check if the text is rendered
    expect(screen.getByText('Example Link')).toBeInTheDocument()
  })

  it('renders with the correct attributes for external links', () => {
    // Render the component
    render(<SocialMedia link='https://example.com' icon={<div>Icon</div>} text='Example Link' />)

    // Check if the link has the correct attributes for external links
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('target', '_blank')
    expect(linkElement).toHaveAttribute('rel', 'noreferrer')
  })
})
