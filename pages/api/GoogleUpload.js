import { api } from "./Config";

export default class GoogleUpload {
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
    const url = api.apiUploadUrl + path;
    // create the options object with the method and headers
    const options = {
      method,
      //   headers hold the content-type which is in JSON
      body,
    };
    // return the fetched data
    return fetch(url, options);
  }

  //   create the createpIcture async function
  async createPicture(form) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/uploads", "POST", form);
    // if the post was successful
    if (
      response.status === 204 ||
      response.status === 201 ||
      response.status === 200
    ) {
      // return nothing
      return ["Upload was successful"];
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

  // get all the uploaded files
  async getPictures() {
    // create a response constant to save the data that GET from the api
    const response = await this.api("/uploads");
    // if the get was successful
    if (response.status === 200) {
      // return the response as JSON
      return response.json().then((data) => data);
      // else if the get had a problem
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
}
