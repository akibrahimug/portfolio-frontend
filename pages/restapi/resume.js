import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function resumes() {
  const router = useRouter();
  const { backend } = useContext(Context);

  const [resumes, setReumes] = useState([]);
  useEffect(() => {
    backend.getResume().then((res) => {
      setReumes(res);
    });
  }, []);

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Resumes
          </h2>
          <div className="flex gap-5">
            <button
              className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newresume")}
            >
              Create New Resume
            </button>
            <button
              className="p-3 bg-gray-400 rounded-lg hover:bg-gray-500 shadow-lg text-white font-bold"
              onClick={() => router.push("/restapi")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          resumes
            ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 max-w-7xl mx-auto "
            : ""
        }`}
      >
        {resumes ? (
          resumes.map((project, i) => (
            <div key={i} className="group relative border">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <img
                  src={project.pictureUrl}
                  alt=""
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </div>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <CircularProgress className="text-gray-500 " />
          </Box>
        )}
      </div>
    </div>
  );
}

export default resumes;
