/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Context } from './Context'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import { useFetch } from "../pages/api/useFetch";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const techStack = [
  {
    techStackID: 0,
    techStackName: ['React', 'Nextjs', 'TailwindCSS', 'Vercel', 'GIT', 'GITHUB', 'AJAX'],
  },
  {
    techStackID: 1,
    techStackName: ['React', 'Firebase', 'CSS', 'Stripe', 'GIT', 'GITHUB'],
  },
  {
    techStackID: 2,
    techStackName: ['React', 'React-Router-DOM', 'CSS', 'GIT', 'GITHUB', 'Netlify', 'AJAX'],
  },
  {
    techStackID: 3,
    techStackName: ['React', 'AJAX', 'CSS', 'GIT', 'GITHUB', 'Netlify'],
  },
  {
    techStackID: 4,
    techStackName: ['WordPress', 'Elementor Page Builder', 'CSS', 'PHP', 'Docker'],
  },
  {
    techStackID: 5,
    techStackName: ['Sass', 'HTML', 'GIT', 'GITHUB', 'GitHub Pages'],
  },
  {
    techStackID: 6,
    techStackName: ['Bootstrap', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 7,
    techStackName: ['AJAX', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 8,
    techStackName: ['OOP', 'CSS', 'GIT', 'GITHUB', 'HTML', 'Javascript'],
  },
  {
    techStackID: 9,
    techStackName: [
      'React',
      'Tailwind',
      'Nodejs',
      'Express',
      'Sequelize',
      'Postgres',
      'Google Colud Platform',
      'Nextjs',
    ],
  },
  {
    techStackID: 10,
    techStackName: ['Javascript', 'CSS', 'HTML', 'ChartJS', 'LocalStorage'],
  },
  {
    techStackID: 11,
    techStackName: ['Javascript', 'CSS', 'HTML', 'Regular Expressions'],
  },
]

const ITEM_HEIGHT = 48

export default function SmallProjects() {
  const { noAuthRoutes } = useContext(Context)

  // get all projects
  const [projects, setProjects] = useState([])
  useEffect(() => {
    noAuthRoutes.getProjects().then((res) => {
      // rearrange projects array so that the most recent project is first
      setProjects(res.sort((a, b) => a.projectID - b.projectID))
    })
  }, [])

  // create a new array adding to each object by index
  // the tech stack that belongs to that project
  const projectsWithTechStack = projects?.map((project, i) => {
    return { ...project, techStack: techStack[i].techStackName }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const open = Boolean(anchorEl)
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedIndex(index === selectedIndex ? -1 : index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='bg-slate-100'>
      <div className='md:grid xl:grid-cols-3 md:grid-cols-2 gap-8 place-content-center pt-32  max-w-[1400px] m-auto'>
        {projectsWithTechStack
          ? projectsWithTechStack.map((project, i) => (
              <Card
                className=' md:rounded-lg md:shadow-md py-4 border-t-8 border-black mb-10 md:mb-4'
                key={i}
              >
                <CardHeader
                  action={
                    <div>
                      <IconButton
                        aria-label='Technologies'
                        id='long-button'
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={(event) => handleClick(event, i)}
                      >
                        <MoreVertIcon className=' text-red-500 text-3xl' />
                      </IconButton>
                      {selectedIndex === i && (
                        <Menu
                          id={'long-menu'}
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              boxShadow: '0 0 6px 0 rgba(0,0,0,0.05)',
                              minWidth: 200,
                            },
                          }}
                        >
                          <h3 className='border-b text-center bg-red-500 font-semibold text-white py-2'>
                            Technologies Used
                          </h3>
                          {project.techStack.map((tech, i) => (
                            <MenuItem onClick={handleClose} key={tech}>
                              <span className='text-gray-500'>{tech}</span>
                            </MenuItem>
                          ))}
                        </Menu>
                      )}
                    </div>
                  }
                  title={project.projectTitle}
                  subheader={new Date(project.createdAt).toDateString()}
                />
                <CardMedia
                  component='img'
                  height='190'
                  image={project.pictureUrl}
                  alt={project.projectTitle}
                  className='w-42 max-h-64 hover:scale-105 transition-all duration-500 cursor-pointer'
                  onClick={() => window.open(project.liveSiteUrl)}
                />
                <CardContent className=''>
                  <Typography variant='body2' color='text.secondary'>
                    {project.projectDescription}
                  </Typography>
                </CardContent>
                <div className='flex m-4 justify-between'>
                  <div className='flex gap-5 h-12'>
                    <button
                      className={`${
                        project.projectTitle === 'CHICOTÁS: STRETCHES OF LIFE' ? 'hidden w-0' : ''
                      }bg-red-500 p-3  px-4 rounded-md text-white `}
                    >
                      <a href={project.githubUrl} target='_blank' rel='noreferrer'>
                        Project Code
                      </a>
                    </button>
                    <button
                      className={`

                  bg-red-500 p-3  px-4 rounded-md text-white `}
                    >
                      <a href={project.liveSiteUrl} target='_blank' rel='noreferrer'>
                        Live Site
                      </a>
                    </button>
                  </div>
                </div>
              </Card>
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className=' m-6 rounded-md shadow-sm'>
                <Skeleton key={i} height={580} />
              </div>
            ))}
      </div>
    </div>
  )
}
