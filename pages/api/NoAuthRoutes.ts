import { api } from './Config'

interface Credentials {
  emailAddress: string
  password: string
}

interface User {
  emailAddress: string
  password: string
  [key: string]: any
}

interface Message {
  [key: string]: any
}

interface ApiOptions {
  method: string
  headers: {
    'Content-Type': string
    Authorization?: string
  }
  body?: string
}

export default class NoAuth {
  // OUR API
  // create an api funtion with path, method, body, requiresAuth, credentials as params
  // set method to defualt(GET) body(null) requiresAuth(false), credentials(null)
  api(
    path: string,
    method = 'GET',
    body: any = null,
    requiresAuth = false,
    credentials: Credentials | null = null,
  ): Promise<Response> {
    // create a url constant to store the url from config and the path
    const url = api.apiBaseUrl + path
    // create the options object with the method and headers
    const options: ApiOptions = {
      method,
      //   headers hold the content-type which is in JSON
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
    // if the body is not null
    if (body !== null) {
      // add the body to the options and turn JSON to string formate
      options.body = JSON.stringify(body)
    }

    // if requiresAuth is true
    if (requiresAuth && credentials) {
      // create the encodedCredentials constant to store the encyripted user data using (btoa)
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
      // add "Authorization" to the options headers object and set it to the encyripted encodedCredentials data
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }
    // return the fetched data
    return fetch(url, options)
  }

  // create the createUser async function
  async createUser(user: User): Promise<any[]> {
    // create a response constant to save the data that POST to the api
    const response = await this.api('/users', 'POST', user)
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return []
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors
      })
      // else throw any other errors from the api
    } else {
      throw new Error('Something went wrong')
    }
  }

  // create message
  async createMessage(message: Message): Promise<any[]> {
    // create a response constant to save the data that POST to the api
    const response = await this.api('/messages', 'POST', message)
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return []
      // else if the post had a problem
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors
      })
      // else throw any other errors from the api
    } else {
      throw new Error('Something went wrong')
    }
  }

  //   USER
  // create a getUser async function with emailAddress and password as params
  async getUser(emailAddress: string, password: string): Promise<any | null> {
    // create the response constant and wait for the api function with the path as "/users" a GET method body
    // set to null and requiresAuth set to true
    const response = await this.api('/users', 'GET', null, true, {
      emailAddress,
      password,
    })

    // if the response is ok
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get projects
  async getProjects(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/projects', 'GET')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get personal statement
  async getPersonalStatement(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/personalStatement')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get methodology
  async getMethodology(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/methodology')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get technologies
  async getTechnologies(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/technologies')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get certifications
  async getCertifications(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/certifications')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get badges
  async getBadges(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/badges')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get experience
  async getExperience(): Promise<any | null> {
    try {
      // create a response constant to save the data that GET from the api
      // Fix: use plural 'experiences' endpoint to match the POST endpoint
      const response = await this.api('/experiences')

      // if the get was successful
      if (response.status === 200) {
        // return the json data and then save it as data
        return response.json().then((data) => data)
      }
      // else if response has any problem
      else if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        console.log(`Experience API error with status ${response.status}`)
        return null
      }
      // else for any other unexpected status
      else {
        console.log(`Unexpected status in getExperience: ${response.status}`)
        return null
      }
    } catch (error) {
      console.log('Error fetching experience data:', error)
      return null
    }
  }

  // get resume
  async getResume(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/resumes')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null
      // else throw an error from the api response
    } else {
      throw new Error('Something went wrong')
    }
  }

  // get social media
  async getSocialMedia(): Promise<any | null> {
    try {
      // create a response constant to save the data that GET from the api
      const response = await this.api('/socialMedia')

      // if the get was successful
      if (response.status === 200) {
        // return the json data and then save it as data
        return response.json().then((data) => data)
      }
      // else if response has any problem
      else if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        console.log(`SocialMedia API error with status ${response.status}`)
        return null
      }
      // else for any other unexpected status
      else {
        console.log(`Unexpected status in getSocialMedia: ${response.status}`)
        return null
      }
    } catch (error) {
      console.log('Error fetching social media data:', error)
      return null
    }
  }

  // get messages
  async getMessage(): Promise<any | null> {
    try {
      // create a response constant to save the data that GET from the api
      const response = await this.api('/messages')

      // if the get was successful
      if (response.status === 200) {
        // return the json data and then save it as data
        return response.json().then((data) => data)
      }
      // else if response has any problem
      else if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        console.log(`Messages API error with status ${response.status}`)
        return null
      }
      // else for any other unexpected status
      else {
        console.log(`Unexpected status in getMessage: ${response.status}`)
        return null
      }
    } catch (error) {
      console.log('Error fetching message data:', error)
      return null
    }
  }

  // get project tech stack
  async getProjectTechStack(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/projectTechStack')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
    } else {
      return null
    }
  }

  // get avartas
  async getAvartas(): Promise<any | null> {
    // create a response constant to save the data that GET from the api
    const response = await this.api('/avartas')
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data)
    } else {
      return null
    }
  }

  // create project
  async createProject(project: any): Promise<any[]> {
    // create a response constant to save the data that POST to the api
    const response = await this.api('/projects', 'POST', project)
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return []
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSON then
      return response.json().then((data) => {
        // return the errors
        return data.errors
      })
      // else throw any other errors from the api
    } else {
      throw new Error('Something went wrong')
    }
  }

  // create technologies
  async createTechnologies(technologies: any): Promise<any[]> {
    try {
      // create a response constant to save the data that POST to the api
      const response = await this.api('/technologies', 'POST', technologies, true, {
        emailAddress: technologies.emailAddress || '',
        password: technologies.password || '',
      })

      // if the post was successful
      if (response.status === 201) {
        // return empty array (no errors)
        return []
      }
      // else if the post had a problem with validation
      else if (response.status === 400) {
        // return validation errors
        return response.json().then((data) => {
          return data.errors || []
        })
      }
      // else for any other unexpected status
      else {
        console.log(`Unexpected status in createTechnologies: ${response.status}`)
        return ['An error occurred while creating the technology.']
      }
    } catch (error) {
      console.log('Error creating technology:', error)
      return ['Failed to connect to the server. Please try again.']
    }
  }
}
