/* eslint-disable react/prop-types */
/* eslint-disable no-console */
//
import React, { useState, useEffect, ReactNode } from 'react'
import NoAuth from '@/pages/api/NoAuthRoutes'
import GoogleUpload from '@/pages/api/GoogleUpload'
import Cookies from 'js-cookie'
import axios, { AxiosInstance } from 'axios'
import jwtDecode from 'jwt-decode'
import { api } from '@/pages/api/Config'

interface AuthenticatedUser {
  accessToken: string
  refreshToken: string
  [key: string]: any
}

interface ContextValue {
  noAuthRoutes: NoAuth
  googleUpload: GoogleUpload
  authenticatedUser: AuthenticatedUser | null
  signIn: (emailAddress: string, password: string) => Promise<void>
  createProject: (project: any) => Promise<any>
  createAvarta: (avartas: any) => Promise<any>
  createPersonalStatement: (personalStatement: any) => Promise<any>
  createMethodology: (methodology: any) => Promise<any>
  createTechnologies: (technologies: any) => Promise<any>
  createCertifications: (certifications: any) => Promise<any>
  createBadges: (badges: any) => Promise<any>
  createExperience: (experience: any) => Promise<any>
  createResume: (resume: any) => Promise<any>
  createSocialMedia: (socialMedia: any) => Promise<any>
  deleteMessage: (id: string) => Promise<any>
  signOut: () => Promise<void>
  [key: string]: any
}

interface ProviderProps {
  children: ReactNode
}

export const Context = React.createContext<ContextValue | null>(null)

export const Provider: React.FC<ProviderProps> = (props) => {
  const noAuthRoutes = new NoAuth()
  const googleUpload = new GoogleUpload()
  // create a userCookies instance in the state and set it to get the cookies
  const [userCookies] = useState<string | undefined>(Cookies.get('userCookies'))
  // create an authenticatedUser instance in state and set it to userCookies if there any
  // else set it to null
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(
    userCookies ? JSON.parse(userCookies) : null,
  )

  //   when the component mounts
  // setup Cookies instance for authenticated user
  useEffect(() => {
    if (authenticatedUser) {
      Cookies.set('userCookies', JSON.stringify(authenticatedUser), {
        secure: true,
        sameSite: 'Lax',
      })
    }
  }, [authenticatedUser])

  const [user, setUser] = useState<any>()

  useEffect(() => {
    setUser(async () => {
      try {
        const res = await axios.post(`${api.apiBaseUrl}/refresh`, {
          token: authenticatedUser?.refreshToken,
          tokenType: 'Bearer',
        })

        setAuthenticatedUser({
          ...authenticatedUser!,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
        return res?.data
      } catch (e: any) {
        if (e.response?.status === 403) {
          setAuthenticatedUser(null)
          Cookies.remove('userCookies')
          window.location.href = '/signin'
        }
      }
    })
  }, [])

  const axiosJWT: AxiosInstance = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date()
      if (authenticatedUser?.accessToken) {
        const decodeToken: any = jwtDecode(authenticatedUser.accessToken)
        if (decodeToken.exp * 1000 < currentDate.getTime()) {
          const data = await Promise.resolve(user).then((res) => res)
          config.headers['Authorization'] = 'Bearer ' + data?.accessToken
        }
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  //   create a signIn async function with emailAddress and password as params
  const signIn = async (emailAddress: string, password: string) => {
    //   create a user async function waiting to getUser
    const user = await noAuthRoutes.getUser(emailAddress, password)
    // if the user is not null
    if (user !== null) {
      console.log(user)
      //   set the authenticatedUser state to user data
      setAuthenticatedUser(user)
    }
  }

  // create project
  const createProject = async (project: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/projects`, project, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  const createAvarta = async (avartas: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/avartas`, avartas, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create personal statement
  const createPersonalStatement = async (personalStatement: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(
        `${api.apiBaseUrl}/personalStatement`,
        personalStatement,
        {
          headers: {
            Authorization: `Bearer ${authenticatedUser?.accessToken}`,
          },
        },
      )
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create methodology
  const createMethodology = async (methodology: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/methodology`, methodology, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create technologies
  const createTechnologies = async (technologies: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/technologies`, technologies, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create certifications
  const createCertifications = async (certifications: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/certifications`, certifications, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create badges
  const createBadges = async (badges: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/badges`, badges, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create experience
  const createExperience = async (experience: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/experiences`, experience, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create resume
  const createResume = async (resume: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/resumes`, resume, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create social media
  const createSocialMedia = async (socialMedia: any) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/socialMedia`, socialMedia, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 201) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // delete message
  const deleteMessage = async (id: string) => {
    try {
      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.delete(`${api.apiBaseUrl}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the post was successful
      if (response.status === 200) {
        // return nothing
        return []
        // else if the post had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  // create a signOut function which use the cookies remove method and set authenticatedUser to null
  const signOut = async () => {
    await axios.delete(`${api.apiBaseUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${authenticatedUser?.accessToken}`,
      },
    })
    Cookies.remove('userCookies')
    setAuthenticatedUser(null)
  }

  // return the provider component
  return (
    <Context.Provider
      value={{
        noAuthRoutes,
        googleUpload,
        authenticatedUser,
        signIn,
        createProject,
        createAvarta,
        createPersonalStatement,
        createMethodology,
        createTechnologies,
        createCertifications,
        createBadges,
        createExperience,
        createResume,
        createSocialMedia,
        deleteMessage,
        signOut,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
