import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Context } from "../pages/Context";

export default function SmallProjects() {
  const { backend } = useContext(Context);
  // get all project tech stack
  const [projectTechStack, setProjectTechStack] = useState([]);
  useEffect(() => {
    backend.getProjectTechStack().then((res) => {
      setProjectTechStack(res);
    });
  }, []);

  // get all tech stack
  const [techStack, setTechStack] = useState([]);
  useEffect(() => {
    backend.getTechnologies().then((res) => {
      setTechStack(res);
    });
  }, []);

  // get all projects
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    backend.getProjects().then((res) => {
      setProjects(res);
    });
  }, []);

  // add techStackID to each project object in projects array if it matches the projectID
  useEffect(() => {
    projects.forEach((project) => {
      project.techStack = [];
      projectTechStack.forEach((projectTech) => {
        if (projectTech.projectID === project.projectID) {
          project.techStack.push(projectTech.techStackID);
        }
      });
    });
  }, [projectTechStack, projects]);

  // compare the techStack array in each project object to the techStack array if it matches the techStackID add the teckStack object to the project object
  useEffect(() => {
    projects.forEach((project) => {
      project.techStack.forEach((techID, i) => {
        techStack.forEach((tech) => {
          if (tech.techStackID === techID) {
            project.techStack[i] = tech;
            // wait for all techStack objects to be added to the project object before setting the state
            if (i === project.techStack.length - 1) {
              setProjects([...projects]);
            }
          }
        });
      });
    });
  }, [techStack]);

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 place-content-center mt-20">
      {projects ? (
        projects.map((project, i) => (
          <Card className="mb-4 shadow-xl relative" key={i}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={project.projectTitle}
              subheader={new Date(project.createdAt).toDateString()}
            />
            <CardMedia
              component="img"
              height="190"
              image={project.pictureUrl}
              alt={project.projectTitle}
              className="w-42 max-h-64 hover:scale-105 transition-all duration-500 cursor-pointer"
              onClick={() => window.open(project.liveSiteUrl)}
            />
            <CardContent className="">
              <Typography variant="body2" color="text.secondary">
                {project.projectDescription}
              </Typography>
            </CardContent>
            <div className="flex m-4 justify-between">
              <div>
                <button
                  className={`${
                    project.projectTitle === "CHICOTÁS: STRETCHES OF LIFE"
                      ? "disabled"
                      : ""
                  }bg-red-500 p-3 px-4 rounded-md text-white `}
                >
                  <a href={project.githubUrl} target="_blank">
                    Project Code
                  </a>
                </button>
              </div>
              <div
                className={`${
                  project.projectTitle === "My Rest API"
                    ? "grid-cols-5 grid "
                    : ""
                }flex flex-wrap`}
              >
                {project.techStack ? (
                  project.techStack.map((tech, i) => (
                    <img
                      key={i}
                      src={tech.pictureUrl}
                      alt={tech.techStackName}
                      className="w-8 h-8 m-2"
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>

            <p
              className={`${
                project.projectTitle === "Airbnb-clone" ? "visible" : "hidden"
              } text-sm border-2 border-red-500 rounded-tl-md rounded-br-md p-1 px-1 text-red-500 absolute w-[200px] top-0 right-10 font-bold `}
            >
              Some browsers might clasify this site as unsafe to visit.
            </p>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
