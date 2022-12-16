import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "./Context";

function SignOut() {
  // pull in the signOut method from the context
  const { signOut } = useContext(Context);
  const router = useRouter();

  // when the component mounts
  // bring in the signOut functionality
  useEffect(() => {
    signOut();
    router.push("/restapi");
  }, []);

  return;
}

export default SignOut;
