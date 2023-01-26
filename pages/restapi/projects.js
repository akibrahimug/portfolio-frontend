import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Projects() {
  const router = useRouter();
  const { noAuthRoutes } = useContext(Context);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    noAuthRoutes.getProjects().then((res) => {
      setProjects(res);
    });
  }, []);

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Projects
          </h2>
          <div className="flex gap-5">
            <button
              className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newproject")}
            >
              Create New Project
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
          projects
            ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8 max-w-7xl mx-auto"
            : ""
        }`}
      >
        {projects ? (
          projects.map((project, i) => (
            <div key={i} className="group relative border-2 rounded-lg">
              <div className="min-h-80 p-4 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <img
                  src={project.pictureUrl}
                  alt=""
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className=" mt-4 ">
                <h2 className="text-center font-bold mt-4 text-[24px] underline">
                  {project.projectTitle}
                </h2>
                <div className="m-4">
                  Description:
                  <p className="text-gray-500 my-2 mx-1 inline">
                    {project.projectDescription}
                  </p>
                </div>
                <div className="mx-4">
                  GitHub:
                  <a
                    href={project.githubUrl}
                    className="text-gray-500 my-2 mx-1 inline"
                  >
                    {project.githubUrl}
                  </a>
                </div>
                <div className="mx-4 mb-4">
                  LiveSite:
                  <a
                    href={project.liveSiteUrl}
                    className="text-gray-500 my-2 mx-1 inline"
                  >
                    {project.liveSiteUrl}
                  </a>
                </div>
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

export default Projects;
