// Renders a "Sign In" page for existing users
// Renders a "Sign In" button
// Renders a "Cancel" button that redirects to '/'

import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import Form from "../components/Form";
import { Context } from "./Context";

function UserSignIn() {
  const router = useRouter();
  // create a user object in state
  const [user, setUser] = useState({ emailAddress: "", password: "" });
  // create an errors instance in state and set it to an empty array
  const [errors, setErrors] = useState([]);
  // pull in the signIn method from context
  const { signIn } = useContext(Context);
  // create the change function
  const change = (e) => {
    // create a name and value constant to hold the events on the input targets
    const name = e.target.name;
    const value = e.target.value;

    // set the user to value of the inputs as key value pairs
    setUser((user) => ({ ...user, [name]: value }));
  };

  // create the submit function
  const submit = () => {
    // destructure the user
    const { emailAddress, password } = user;
    // pass the emailAdress and password to the sigIn method then
    signIn(emailAddress, password)
      .then(() => {
        // if the emailAddress or password are empty
        if (emailAddress === "" || password === "") {
          // set the errors to a custom message
          setErrors(["Invalid password or Email"]);
          // else if there is a location other than the default
        } else {
          if (location.state?.from) {
            // navigate back to that location
            router.push(location.state.from);
            // else navigate to the root /
          } else {
            router.push("/restapi");
          }
        }
      })
      // catch any errors throw by the api and console log them
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form--centered">
      <Form
        errors={errors}
        submit={submit}
        submitButtonText="Login"
        elements={() => (
          <div>
            <div className="grid place-content-center gap-y-6 text-gray-700 ">
              <div>
                <label htmlFor="emailAddress" className="h-fit">
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={user.emailAddress}
                  onChange={change}
                  className="border block p-2 rounded-md w-80 border-gray-300 "
                />
              </div>

              <div>
                <label htmlFor="password" className="h-fit">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={change}
                  className="border block p-2 rounded-md w-80 border-gray-300 "
                />
              </div>
            </div>
          </div>
        )}
      />
      <p className="text-center mt-4 font-semibold text-gray-500">
        Don't have a user account?{" "}
        <a href="/signup" className="text-gray-700">
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default UserSignIn;
