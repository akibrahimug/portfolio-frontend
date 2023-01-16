import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Context } from "./Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const techStack = [
  {
    techStackID: 1,
    techStackName: [
      "React",
      "Nextjs",
      "TailwindCSS",
      "Vercel",
      "GIT",
      "GITHUB",
      "AJAX",
    ],
  },
  {
    techStackID: 2,
    techStackName: ["React", "Firebase", "CSS", "Stripe", "GIT", "GITHUB"],
  },
  {
    techStackID: 3,
    techStackName: [
      "React",
      "React-Router-DOM",
      "CSS",
      "GIT",
      "GITHUB",
      "Netlify",
      "AJAX",
    ],
  },
  {
    techStackID: 4,
    techStackName: ["React", "AJAX", "CSS", "GIT", "GITHUB", "Netlify"],
  },
  {
    techStackID: 5,
    techStackName: [
      "WordPress",
      "Elementor Page Builder",
      "CSS",
      "PHP",
      "Docker",
    ],
  },
  {
    techStackID: 6,
    techStackName: ["Sass", "HTML", "GIT", "GITHUB", "GitHub Pages"],
  },
  {
    techStackID: 7,
    techStackName: ["Bootstrap", "CSS", "GIT", "GITHUB", "HTML", "Javascript"],
  },
  {
    techStackID: 8,
    techStackName: ["AJAX", "CSS", "GIT", "GITHUB", "HTML", "Javascript"],
  },
  {
    techStackID: 9,
    techStackName: ["OOP", "CSS", "GIT", "GITHUB", "HTML", "Javascript"],
  },
  {
    techStackID: 10,
    techStackName: [
      "React",
      "Tailwind",
      "Nodejs",
      "Express",
      "Sequelize",
      "Postgres",
      "Google Colud Platform",
      "Nextjs",
    ],
  },
  {
    techStackID: 11,
    techStackName: ["Javascript", "CSS", "HTML", "ChartJS", "LocalStorage"],
  },
  {
    techStackID: 12,
    techStackName: ["Javascript", "CSS", "HTML", "Regular Expressions"],
  },
];

const ITEM_HEIGHT = 48;

export default function SmallProjects() {
  const { backend } = useContext(Context);

  // get all projects
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    backend.getProjects().then((res) => {
      // rearrange projects array so that the most recent project is first
      setProjects(res.sort((a, b) => a.projectID - b.projectID));
    });
  }, []);

  // create a new array adding to each object by index
  // the tech stack that belongs to that project
  const projectsWithTechStack = projects.map((project, i) => {
    return { ...project, techStack: techStack[i].techStackName };
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="md:grid xl:grid-cols-3 md:grid-cols-2 gap-8 place-content-center mt-20">
      {projectsWithTechStack ? (
        projectsWithTechStack.map((project, i) => (
          <Card className="mb-4 shadow-xl relative" key={i}>
            <CardHeader
              action={
                <div>
                  <IconButton
                    aria-label="Technologies"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                        boxShadow: "0 0 6px 0 rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>{/* techstack */}</MenuItem>
                  </Menu>
                </div>
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
              <div className="flex gap-5 h-12">
                <button
                  className={`${
                    project.projectTitle === "CHICOTÁS: STRETCHES OF LIFE"
                      ? "hidden w-0"
                      : ""
                  }bg-red-500 p-3  px-4 rounded-md text-white `}
                >
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    Project Code
                  </a>
                </button>
                <button
                  className={`
                    
                  bg-red-500 p-3  px-4 rounded-md text-white `}
                >
                  <a
                    href={project.liveSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Site
                  </a>
                </button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
