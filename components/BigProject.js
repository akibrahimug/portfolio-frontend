import React, { useContext, useEffect, useState } from "react";
import Airbnb from "./projectpics/Airbnb.png";
import { Context } from "../pages/Context";
import Image from "next/image";

function BigProject() {
  const { backend } = useContext(Context);
  const [projects, setProject] = useState(null);
  useEffect(() => {
    backend.getProjects().then((projects) => {
      projects.map((project) =>
        project.projectTitle === "Airbnb-clone" ? setProject(project) : null
      );
    });
  }, []);

  // get technologies
  const [technologies, setTechnologies] = useState();
  useEffect(() => {
    backend.getTechnologies().then((technologies) => {
      setTechnologies(technologies);
    });
  }, []);

  // create an array of filtered technologies
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  useEffect(() => {
    setFilteredTechnologies(
      technologies?.map((technology) =>
        ["React.JS", "Next.JS", "Tailwind CSS", "NPM", "GITHUB"].includes(
          technology.techTitle
        )
          ? technology
          : null
      )
    );
  }, [technologies]);

  return (
    <div className="flex lg:mt-20 xl:m-0">
      <div
        className="text-gray-400 flex-none hidden md:block self-center"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "mixed",
        }}
      >
        <h2 className="text-4xl font-bold">PROJECTS</h2>
      </div>
      <div className="grow relative  lg:px-20 cursor-pointer  rounded-md lg:border-0 m-4 ">
        <div className="relative lg:static h-96 min-w-[250px]">
          <Image
            src={Airbnb}
            alt="Airbnb"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="lg:absolute lg:bottom-12  lg:right-6   lg:backdrop-blur-2xl rounded-lg lg:w-[600px]">
          <h3 className="text-4xl mb-3 w-64 text-black text-center mt-4">
            {projects?.projectTitle}
          </h3>
          <div className="grid">
            <p className="text-black px-7 lg:w-[500px] lg:font-semibold">
              {projects?.projectDescription}
            </p>
            <div>
              <div className="flex justify-center flex-wrap mt-4  bg-slate-100  rounded-md  ">
                {filteredTechnologies?.map((tech, i) =>
                  tech !== null ? (
                    <div key={i}>
                      <img
                        src={tech.pictureUrl}
                        className={`${
                          tech.techTitle === "NPM" ? "w-10 m-4 mt-6 " : ""
                        } w-8 m-4 ${
                          tech.techTitle === "Tailwind CSS" ? "w-10" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 md:justify-end md:gap-4 px-10 py-12">
            {/* <button
              onClick={() => {
                window.open(projects?.liveSiteUrl);
              }}
              disabled
              className="text-sm bg-red-500 text-white rounded-lg px-4 py-3.5 mt-5 "
            >
              Live Site
            </button>
            <button
              onClick={() => {
                window.open(projects?.githubUrl);
              }}
              disabled
              className="text-sm bg-red-500 text-white rounded-lg px-4 py-3.5 mt-5 "
            >
              View Code
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigProject;
