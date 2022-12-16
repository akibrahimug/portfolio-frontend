import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function technologies() {
  const router = useRouter();
  const { backend } = useContext(Context);

  const [technologies, setTechnologies] = useState([]);
  useEffect(() => {
    backend.getTechnologies().then((res) => {
      setTechnologies(res);
    });
  }, []);
  console.log(technologies);
  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Technologies
          </h2>
          <div className="flex gap-5">
            <button
              className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newtechnology")}
            >
              Create New Technology
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
          technologies
            ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 max-w-7xl mx-auto "
            : ""
        }`}
      >
        {technologies ? (
          technologies.map((tech, i) => (
            <div key={i} className="group relative ">
              <div className="min-h-80 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-64 ">
                <img
                  src={tech.pictureUrl}
                  alt=""
                  className="object-contain object-center lg:h-full lg:w-full p-20"
                />
              </div>
              <p className="absolute bottom-0 text-[30px] text-center font-bold bg-gray-700 text-white w-[100%]">
                {tech.techTitle}
              </p>
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

export default technologies;
