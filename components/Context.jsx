import React, { useState, useEffect, useCallback } from 'react'
import NoAuth from '../pages/api/NoAuthRoutes'
import GoogleUpload from '../pages/api/GoogleUpload'
import Cookies from 'js-cookie'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { api } from '../pages/api/Config'

export const Context = React.createContext()

export const Provider = (props) => {
  const noAuthRoutes = new NoAuth()
  const googleUpload = new GoogleUpload()

  // Create an authenticatedUser state with an initial value from cookies
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const cookie = Cookies.get('userCookies')
    if (cookie) {
      try {
        const userData = JSON.parse(cookie)
        return userData
      } catch (e) {
        Cookies.remove('userCookies', { path: '/' })
        return null
      }
    }
    return null
  })

  // Save the user data to cookies whenever it changes
  useEffect(() => {
    if (authenticatedUser) {
      try {
        const userJson = JSON.stringify(authenticatedUser)
        Cookies.set('userCookies', userJson, {
          expires: 7, // 7 days
          path: '/',
          sameSite: 'lax',
        })
      } catch (e) {
        // Silent error handling
      }
    } else {
      Cookies.remove('userCookies', { path: '/' })
    }
  }, [authenticatedUser])

  // Create a sign in function
  const signIn = async (emailAddress, password) => {
    try {
      const user = await noAuthRoutes.getUser(emailAddress, password)

      if (user) {
        // Make sure the userID field is properly set
        const userWithID = {
          ...user,
          userID: user.id || user.userID || user.userId || user._id,
        }

        // Store cookie immediately
        Cookies.set('userCookies', JSON.stringify(userWithID), {
          expires: 7,
          path: '/',
          sameSite: 'lax',
        })

        // Update state
        setAuthenticatedUser(userWithID)
        return userWithID
      }
      return null
    } catch (error) {
      return null
    }
  }

  // Create a sign out function
  const signOut = () => {
    setAuthenticatedUser(null)
    Cookies.remove('userCookies', { path: '/' })
  }

  // Configure axios for authenticated requests
  const axiosJWT = axios.create()

  // Add an interceptor to include the auth token
  axiosJWT.interceptors.request.use(
    (config) => {
      if (authenticatedUser?.accessToken) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${authenticatedUser.accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // Helper function to get user ID consistently
  const getUserID = () => {
    if (!authenticatedUser) return null
    return (
      authenticatedUser.userID ||
      authenticatedUser.id ||
      authenticatedUser.userId ||
      authenticatedUser._id ||
      null
    )
  }

  // create project
  const createProject = async (project) => {
    try {
      // Ensure project has userID
      const projectWithUserID = {
        ...project,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/projects`, projectWithUserID, {
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

  // createAvarta with consistent userID
  const createAvarta = async (avartas) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...avartas,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/avartas`, dataWithUserID, {
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

  // create personal statement with consistent userID
  const createPersonalStatement = async (personalStatement) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...personalStatement,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/personalStatement`, dataWithUserID, {
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

  // create methodology with consistent userID
  const createMethodology = async (methodology) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...methodology,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/methodology`, dataWithUserID, {
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

  // create technologies with consistent userID
  const createTechnologies = async (technologies) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...technologies,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/technologies`, dataWithUserID, {
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

  // create certifications with consistent userID
  const createCertifications = async (certifications) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...certifications,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/certifications`, dataWithUserID, {
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

  // create badges with consistent userID
  const createBadges = async (badges) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...badges,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/badges`, dataWithUserID, {
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

  // create experience with consistent userID
  const createExperience = async (experience) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...experience,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/experiences`, dataWithUserID, {
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

  // create resume with consistent userID
  const createResume = async (resume) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...resume,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/resumes`, dataWithUserID, {
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

  // create socialMedia with consistent userID
  const createSocialMedia = async (socialMedia) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...socialMedia,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/socials`, dataWithUserID, {
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
  const deleteMessage = async (id) => {
    try {
      // create a response constant to save the data that DELETE from the api
      const response = await axiosJWT.delete(`${api.apiBaseUrl}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${authenticatedUser?.accessToken}`,
        },
      })
      // if the delete was successful
      if (response.status === 204) {
        // return nothing
        return []
        // else if the delete had a problem
      } else if (response.status === 400) {
        // return a response as JSOn then
        return response
        // else throw any other errors from the api
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  return (
    <Context.Provider
      value={{
        deleteMessage,
        createAvarta,
        createBadges,
        createCertifications,
        createExperience,
        createMethodology,
        createPersonalStatement,
        createProject,
        createResume,
        createSocialMedia,
        createTechnologies,
        signOut,
        authenticatedUser,
        signIn,
        googleUpload,
        noAuthRoutes,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
