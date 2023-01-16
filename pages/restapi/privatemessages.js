import React, { useContext, useEffect } from "react";
import { Context } from "../../components/Context";
import Messages from "./messages";
import { useRouter } from "next/router";

function Authorised() {
  // call the authenticated user data from context
  const { authenticatedUser } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (!authenticatedUser) {
      router?.push("/signin");
    }
  }, []);
  return <Messages />;
}

export default Authorised;
