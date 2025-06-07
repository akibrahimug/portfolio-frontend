import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}))

describe('Form Component', () => {
  const mockSubmit = jest.fn()
  const mockElements = () => (
    <div data-testid='form-elements'>
      <input type='text' placeholder='Test input' />
    </div>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form with submit button and elements', () => {
    render(
      <Form errors={[]} submit={mockSubmit} submitButtonText='Submit' elements={mockElements} />,
    )

    // Check if the heading is rendered with submit button text
    expect(screen.getByText('Choose a Submit Method')).toBeInTheDocument()

    // Check if form elements are rendered
    expect(screen.getByTestId('form-elements')).toBeInTheDocument()

    // Check if buttons are rendered
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls submit function when the form is submitted', () => {
    render(
      <Form errors={[]} submit={mockSubmit} submitButtonText='Submit' elements={mockElements} />,
    )

    // Submit the form by clicking the submit button
    fireEvent.click(screen.getByText('Submit'))

    // Check if submit function was called
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('displays errors when provided', () => {
    const errors = ['Error 1', 'Error 2', 'Error 3']

    render(
      <Form
        errors={errors}
        submit={mockSubmit}
        submitButtonText='Submit'
        elements={mockElements}
      />,
    )

    // Check if error display is rendered
    expect(screen.getByText('Validation errors')).toBeInTheDocument()
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
    expect(screen.getByText('Error 3')).toBeInTheDocument()
  })

  it('does not display errors when there are fewer than 2 errors', () => {
    const errors = ['Single Error']

    render(
      <Form
        errors={errors}
        submit={mockSubmit}
        submitButtonText='Submit'
        elements={mockElements}
      />,
    )

    // Check that error display is not rendered for single error
    expect(screen.queryByText('Validation errors')).not.toBeInTheDocument()
  })
})
