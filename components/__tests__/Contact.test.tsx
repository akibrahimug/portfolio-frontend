import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Contact from '../Contact'

// Mock the AppContext
jest.mock('../AppContext', () => ({
  AppContext: {
    Consumer: ({ children }: { children: any }) =>
      children({
        noAuth: {
          createMessage: jest.fn().mockResolvedValue([]),
        },
      }),
    Provider: ({ children }: { children: any }) => children,
  },
}))

// Mock useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    noAuth: {
      createMessage: jest.fn().mockResolvedValue([]),
    },
  }),
}))

// Mock SocialMedia component
jest.mock('../SocialMedia', () => {
  return ({ link, text }: { link: string; text: string }) => (
    <div data-testid='social-media-item' data-link={link}>
      {text}
    </div>
  )
})

// Mock MUI icons
jest.mock('@mui/icons-material', () => ({
  Google: () => <div data-testid='google-icon'>Google</div>,
  Twitter: () => <div data-testid='twitter-icon'>Twitter</div>,
  LinkedIn: () => <div data-testid='linkedin-icon'>LinkedIn</div>,
}))

describe('Contact Component', () => {
  it('renders the contact form', () => {
    render(<Contact />)

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Company')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message(300-words Max)')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Contact />)

    // Check if social media items are rendered
    const socialMediaItems = screen.getAllByTestId('social-media-item')
    expect(socialMediaItems.length).toBe(3)

    // Check for specific social media items
    expect(screen.getByText('kasomaibrahim@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('updates form data when inputs change and submits successfully', async () => {
    render(<Contact />)

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Company'), { target: { value: 'Acme Inc' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Message(300-words Max)'), {
      target: { value: 'Test message' },
    })

    // Submit the form wrapped in act()
    await act(async () => {
      fireEvent.submit(screen.getByText('Send').closest('form')!)
    })

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
    })
  })
})
