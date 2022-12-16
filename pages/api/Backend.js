import { api } from "./Config";

export default class Backend {
  // OUR API
  // create an api funtion with path, method, body, requiresAuth, credentials as params
  // set method to defualt(GET) body(null) requiresAuth(false), credentials(null)
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    // create a url constant to store the url from config and the path
    const url = api.apiBaseUrl + path;
    // create the options object with the method and headers
    const options = {
      method,
      //   headers hold the content-type which is in JSON
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    // if the body is not null
    if (body !== null) {
      // add the body to the options and turn JSON to string formate
      options.body = JSON.stringify(body);
    }

    // if requiresAuth is true
    if (requiresAuth) {
      // create the encodedCredentials constant to store the encyripted user data using (btoa)
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      // add "Authorization" to the options headers object and set it to the encyripted encodedCredentials data
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    // return the fetched data
    return fetch(url, options);
  }

  //   USER
  // create a getUser async function with emailAddress and password as params
  async getUser(emailAddress, password) {
    // create the response constant and wait for the api function with the path as "/users" a GET method body
    // set to null and requiresAuth set to true
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });

    // if the response is ok
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create the createUser async function
  async createUser(user) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/users", "POST", user);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create project
  async createProject(project) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/projects", "POST", project);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get projects
  async getProjects() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/projects", "GET");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  //create profiles
  async createAvarta(avartas) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/avartas", "POST", avartas);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get profiles
  async getAvartas() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/avartas");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create personal statement
  async createPersonalStatement(personalStatement) {
    // create a response constant to save the data that POST to the api
    const response = await this.api(
      "/personalStatement",
      "POST",
      personalStatement
    );
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get personal statement
  async getPersonalStatement() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/personalStatement");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create methodology
  async createMethodology(methodology) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/methodology", "POST", methodology);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get methodology
  async getMethodology() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/methodology");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create technologies
  async createTechnologies(technologies) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/technologies", "POST", technologies);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get technologies
  async getTechnologies() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/technologies");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create certifications
  async createCertifications(certifications) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/certifications", "POST", certifications);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get certifications
  async getCertifications() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/certifications");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create badges
  async createBadges(badges) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/badges", "POST", badges);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get badges
  async getBadges() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/badges");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create experience
  async createExperience(experience) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/experiences", "POST", experience);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get experience
  async getExperience() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/experiences");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create resume
  async createResume(resume) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/resumes", "POST", resume);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get resume
  async getResume() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/resumes");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create socialMedia
  async createSocialMedia(socialMedia) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/socials", "POST", socialMedia);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get socialMedia
  async getSocialMedia() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/socials");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create message
  async createMessage(message) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/messages", "POST", message);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get message
  async getMessage() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/messages");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // delete message
  async deleteMessage(id) {
    // create a response constant to save the data that DELETE from the api
    const response = await this.api(`/messages/${id}`, "DELETE");
    // if the delete was successful
    if (response.status === 204) {
      // return nothing
      return [];
      // else if the delete had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // get projectTechStack
  async getProjectTechStack() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/projectTechStack");
    // if the get was successful
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    }
  }
}
