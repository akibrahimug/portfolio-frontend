import React from 'react'
import { render, screen } from '@testing-library/react'
import HeroSection from '../HeroSection'

// Mock the components used in HeroSection
jest.mock('@/components/Avarta', () => () => <div data-testid='mock-avatar'>Avatar</div>)
jest.mock('@/components/ProfileDesc', () => ({ certified }: { certified: string[] }) => (
  <div data-testid='mock-profile-desc'>
    ProfileDesc
    <ul>
      {certified.map((skill, index) => (
        <li key={index} data-testid='certified-skill'>
          {skill}
        </li>
      ))}
    </ul>
  </div>
))

describe('HeroSection Component', () => {
  it('renders correctly with certified skills', () => {
    render(<HeroSection />)

    // Check if Avatar is rendered
    expect(screen.getByTestId('mock-avatar')).toBeInTheDocument()

    // Check if ProfileDesc is rendered
    expect(screen.getByTestId('mock-profile-desc')).toBeInTheDocument()

    // Check if all certified skills are passed to ProfileDesc
    const skills = screen.getAllByTestId('certified-skill')
    expect(skills).toHaveLength(12) // Based on the certified array in HeroSection
  })
})
