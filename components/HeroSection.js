import React from 'react'
import Avarta from './Avarta'
import ProfileDesc from './ProfileDesc'
const certified = [
  'Testing and Debugging',
  'Algorithms and Data Structures',
  'Version control systems',
  'Web Accessibility',
  'Front End Libraries',
  'Data Visualization',
  'APIs',
  'Agile Methodologies',
  'Responsive Web Design',
  'Progressive Web Apps',
  'GCP Infrastructure and Services',
  'Search Engine Optimization',
]
function HeroSection() {
  return (
    <div className='grid lg:grid-cols-2 relative mb-32'>
      <ProfileDesc certified={certified} />
      <Avarta />
    </div>
  )
}

export default HeroSection
