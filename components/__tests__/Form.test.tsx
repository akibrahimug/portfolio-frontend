import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Form Component', () => {
  const mockSubmit = jest.fn()
  const mockElements = () => (
    <div data-testid='form-elements'>
      <input type='text' placeholder='Test input' />
    </div>
  )

  it('renders the form with correct title and buttons', () => {
    render(
      <Form errors={[]} submit={mockSubmit} submitButtonText='Submit' elements={mockElements} />,
    )

    // Check if the title contains the submit button text
    expect(screen.getByText('Choose a Submit Method')).toBeInTheDocument()

    // Check if form elements are rendered
    expect(screen.getByTestId('form-elements')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()

    // Check if buttons are rendered
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls submit function when the form is submitted', () => {
    render(
      <Form errors={[]} submit={mockSubmit} submitButtonText='Submit' elements={mockElements} />,
    )

    // Submit the form
    fireEvent.submit(screen.getByRole('form'))

    // Check if submit function was called
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('displays error messages when there are errors', () => {
    const errors = ['Error 1', 'Error 2']

    render(
      <Form
        errors={errors}
        submit={mockSubmit}
        submitButtonText='Submit'
        elements={mockElements}
      />,
    )

    // Check if the error heading is displayed
    expect(screen.getByText('Validation errors')).toBeInTheDocument()

    // Check if individual errors are displayed
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
  })

  it('does not display error container when there are no errors', () => {
    render(
      <Form errors={[]} submit={mockSubmit} submitButtonText='Submit' elements={mockElements} />,
    )

    // Error heading should not be present
    expect(screen.queryByText('Validation errors')).not.toBeInTheDocument()
  })
})
