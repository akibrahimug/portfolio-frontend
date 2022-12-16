import React, { useContext } from "react";
import { Context } from "../../Context";
import Header from "../../../components/Header";
import RestHead from "../../../components/RestHead";
import { useRouter } from "next/router";
function MyRestAPI() {
  // call the authenticated user data fro context
  const { authenticatedUser, googleUpload } = useContext(Context);
  const router = useRouter();
  return (
    <>
      <Header />
      <RestHead />
      <main className="max-w-[1250px] m-auto p-[1rem]">
        <div className="grid grid-cols-4 gap-8">
          <button
            onClick={() => router.push("/restapi/newprofile/newavatar")}
            className="text-2xl font-bold mb-4 border p-10 text-center rounded-md bg-gray-200 "
          >
            Avatars
          </button>
          <button
            onClick={() => router.push("/restapi/newprofile/personalstatement")}
            className="text-2xl font-bold mb-4 border p-10 text-center rounded-md bg-gray-200 "
          >
            Personal Statments
          </button>
          <button
            onClick={() => router.push("/restapi/newprofile/newmethodologies")}
            className="text-2xl font-bold mb-4 border p-10 text-center rounded-md bg-gray-200 "
          >
            Methodologies
          </button>
        </div>
      </main>
    </>
  );
}

export default MyRestAPI;
