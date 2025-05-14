/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'
import { api } from './Config'

interface Credentials {
  emailAddress: string
  password: string
}

interface FetchOptions {
  headers: {
    'Content-Type': string
    Authorization: string
  }
}

const fetcher = async (url: string, options?: FetchOptions): Promise<any> => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data')
  }
  return response.json()
}

export const useFetch = (path: string, requiresAuth = false, credentials?: Credentials) => {
  const url = `${api.apiBaseUrl}${path}`

  if (requiresAuth && credentials) {
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
    const options: FetchOptions = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
    return useSWR([url, options], ([url, options]: [string, FetchOptions]) => fetcher(url, options))
  } else {
    return useSWR(url, fetcher)
  }
}
