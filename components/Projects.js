import React from 'react'
import BigProject from './BigProject'
import SmallProjects from './SmallProjects'

function Projects() {
  return (
    <div id='projects'>
      <div className='max-w-[1400px] m-auto mb-32'>
        <BigProject />
      </div>
      <SmallProjects />
    </div>
  )
}

export default Projects
