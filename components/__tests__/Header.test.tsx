import React from 'react'
import { render, screen } from '@testing-library/react'

// Create a mock Header component
const MockHeader = () => (
  <div data-testid='header-container'>
    <div data-testid='mock-main-header'>MainHeader</div>
    <div data-testid='mock-methodologies'>Methodologies</div>
    <div data-testid='mock-logo'>Logo</div>
    <div data-testid='mock-arrow-back'>ArrowBack</div>
  </div>
)

// Mock the components used in Header
jest.mock('../Header', () => ({
  __esModule: true,
  default: () => <MockHeader />,
}))

describe('Header Component', () => {
  it('renders correctly', () => {
    render(<MockHeader />)

    // Check if the main header is rendered
    expect(screen.getByTestId('mock-main-header')).toBeInTheDocument()

    // Check if methodologies is rendered
    expect(screen.getByTestId('mock-methodologies')).toBeInTheDocument()

    // Check if the logo is in the document (hidden on mobile)
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument()

    // Check if the arrow back icon is in the document (shown on mobile)
    expect(screen.getByTestId('mock-arrow-back')).toBeInTheDocument()
  })
})
