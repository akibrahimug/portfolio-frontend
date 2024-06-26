/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Airbnb from './projectpics/Airbnb.png'
import Image from 'next/image'
import { useFetch } from '../pages/api/useFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function BigProject() {
  // const { noAuthRoutes } = useContext(Context);
  const [project, setProject] = useState()
  // useEffect(() => {
  //   noAuthRoutes.getProjects().then((projects) => {
  //     projects.map((project) =>
  //       project.projectTitle === "Airbnb-clone" ? setProject(project) : null
  //     );
  //   });
  // }, []);
  const { data: projects, error } = useFetch('/projects')
  useEffect(() => {
    projects?.map((project) =>
      project.projectTitle === 'Airbnb-clone' ? setProject(project) : null,
    )
  }, [projects])

  return (
    <div className='flex lg:mt-20 xl:m-0 '>
      <div
        className='text-gray-400 flex-none hidden md:block self-center'
        style={{
          writingMode: 'vertical-lr',
          textOrientation: 'mixed',
        }}
      >
        <h2 className='text-4xl font-bold'>PROJECTS</h2>
      </div>
      {project ? (
        <div className='grow relative  lg:px-20 cursor-pointer  rounded-md lg:border-0 m-4 '>
          <div className='relative lg:static h-96 min-w-[250px]'>
            <a href={project.liveSiteUrl} target='_blank' rel='noreferrer'>
              <Image
                src={Airbnb}
                alt='Airbnb'
                layout='fill'
                objectFit='cover'
                className='rounded-xl'
              />
            </a>
          </div>
        </div>
      ) : (
        <div className='grow relative  lg:px-20 cursor-pointer  rounded-md lg:border-0 m-4 '>
          <Skeleton height={300} />
        </div>
      )}
    </div>
  )
}

export default BigProject
