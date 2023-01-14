import React, { useContext, useEffect, useState } from "react";
import Airbnb from "./projectpics/Airbnb.png";
import { Context } from "./Context";
import Image from "next/image";

function BigProject() {
  const { backend } = useContext(Context);
  const [project, setProject] = useState();
  useEffect(() => {
    backend.getProjects().then((projects) => {
      projects.map((project) =>
        project.projectTitle === "Airbnb-clone" ? setProject(project) : null
      );
    });
  }, []);

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
      {project ? (
        <div className="grow relative  lg:px-20 cursor-pointer  rounded-md lg:border-0 m-4 ">
          <div className="relative lg:static h-96 min-w-[250px]">
            <a href={project.liveSiteUrl} target="_blank" rel="noreferrer">
              <Image
                src={Airbnb}
                alt="Airbnb"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </a>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default BigProject;
