'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import axios, { AxiosInstance } from 'axios'
import jwtDecode from 'jwt-decode'
import NoAuth from '@/pages/api/NoAuthRoutes'
import { api } from '@/pages/api/Config'

interface AuthenticatedUser {
  accessToken: string
  refreshToken: string
  [key: string]: any
}

interface AuthContextValue {
  user: AuthenticatedUser | null
  axiosJWT: AxiosInstance
  signIn(email: string, password: string): Promise<void>
  signOut(): Promise<void>
  getUserID(): string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const noAuth = new NoAuth()
  const [user, setUser] = useState<AuthenticatedUser | null>(() => {
    const cookie = Cookies.get('userCookies')
    return cookie ? JSON.parse(cookie) : null
  })
  const [refreshPromise, setRefreshPromise] = useState<Promise<any> | null>(null)

  // persist to cookie
  useEffect(() => {
    if (user) {
      Cookies.set('userCookies', JSON.stringify(user), { secure: true, sameSite: 'Lax' })
    }
  }, [user])

  // on mount, refresh token if needed
  useEffect(() => {
    if (!user) return
    const p = axios
      .post(`${api.apiBaseUrl}/refresh`, {
        token: user.refreshToken,
        tokenType: 'Bearer',
      })
      .then((res) => {
        setUser(
          (u) =>
            u && {
              ...u,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            },
        )
        return res.data
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          Cookies.remove('userCookies')
          setUser(null)
          window.location.href = '/signin'
        }
      })
    setRefreshPromise(p)
  }, [])

  // axios instance that waits for refresh
  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(async (config) => {
    if (refreshPromise) await refreshPromise
    if (user?.accessToken) {
      const decoded: any = jwtDecode(user.accessToken)
      if (decoded.exp * 1000 < Date.now()) {
        // already refreshed on mount
      }
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.accessToken}`,
      }
    }
    return config
  })

  const signIn = async (email: string, password: string) => {
    const u = await noAuth.getUser(email, password)
    if (u) setUser(u)
  }

  const signOut = async () => {
    if (user?.accessToken) {
      await axios.delete(`${api.apiBaseUrl}/logout`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
    }
    Cookies.remove('userCookies')
    setUser(null)
  }

  const getUserID = () => {
    if (!user) return null
    return user.userID || user.id || user.userId || user._id || null
  }

  // create project
  const createProject = async (project: any) => {
    try {
      // Ensure project has userID
      const projectWithUserID = {
        ...project,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/projects`, projectWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createAvarta = async (avartas: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...avartas,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/avartas`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createPersonalStatement = async (personalStatement: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...personalStatement,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/personalStatement`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createMethodology = async (methodology: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...methodology,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/methodology`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createTechnologies = async (technologies: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...technologies,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/technologies`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createCertifications = async (certifications: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...certifications,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/certifications`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createBadges = async (badges: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...badges,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/badges`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const createExperience = async (experience: any) => {
    try {
      // Ensure it has userID
      const dataWithUserID = {
        ...experience,
        userID: getUserID(),
      }

      // create a response constant to save the data that POST to the api
      const response = await axiosJWT.post(`${api.apiBaseUrl}/experiences`, dataWithUserID, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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

 

  // // create socialMedia with consistent userID
  // const createSocialMedia = async (socialMedia: any) => {
  //   try {
  //     // Ensure it has userID
  //     const dataWithUserID = {
  //       ...socialMedia,
  //       userID: getUserID(),
  //     }

  //     // create a response constant to save the data that POST to the api
  //     const response = await axiosJWT.post(`${api.apiBaseUrl}/socials`, dataWithUserID, {
  //       headers: {
  //         Authorization: `Bearer ${user?.accessToken}`,
  //       },
  //     })
  //     // if the post was successful
  //     if (response.status === 201) {
  //       // return nothing
  //       return []
  //       // else if the post had a problem
  //     } else if (response.status === 400) {
  //       // return a response as JSOn then
  //       return response
  //       // else throw any other errors from the api
  //     }
  //   } catch (e) {
  //     throw new Error('Something went wrong')
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        axiosJWT,
        signIn,
        signOut,
        getUserID,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
