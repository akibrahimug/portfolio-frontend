import React, { useState, useEffect } from "react";
import Backend from "./api/Backend";
import GoogleUpload from "./api/GoogleUpload";
import Cookies from "js-cookie";

export const Context = React.createContext();

export const Provider = (props) => {
  const backend = new Backend();
  const googleUpload = new GoogleUpload();
  // create a userCookies instance in the state and set it to get the cookies
  const [userCookies] = useState(Cookies.get("userCookies"));
  // create an authenticatedUser instance in state and set it to userCookies if there any
  // else set it to null
  const [authenticatedUser, setAuthenticatedUser] = useState(
    userCookies ? JSON.parse(userCookies) : null
  );

  //   when the component mounts
  // setup Cookies instance for authenticated user
  useEffect(() => {
    if (authenticatedUser) {
      Cookies.set("userCookies", JSON.stringify(authenticatedUser), {
        expires: 1,
        secure: true,
      });
    }
  }, [authenticatedUser]);

  //   create a signIn async function with emailAddress and password as params
  const signIn = async (emailAddress, password) => {
    //   create a user async function waiting to getUser
    const user = await backend.getUser(emailAddress, password);
    // if the user is not null
    if (user !== null) {
      // set password to the password from user method
      user.password = password;
      //   set the authenticatedUser state to user data
      setAuthenticatedUser(user);
    }
  };

  //   create a signOut function
  const signOut = () => {
    // set the authenticated user to null and remove the cookies
    setAuthenticatedUser(null);
    Cookies.remove("userCookies");
  };

  return (
    <Context.Provider
      value={{ backend, signOut, authenticatedUser, signIn, googleUpload }}
    >
      {props.children}
    </Context.Provider>
  );
};
