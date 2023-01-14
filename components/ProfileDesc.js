import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import Line from "./projectpics/line.svg";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LinkedIn, Twitter } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Contact from "./Contact";

function ProfileDesc({ cetified }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="md:w-[75%] flex flex-col m-auto  xl:ml-10  2xl:ml-20 md:pt-20 ">
        <div className="xl:ml-20 xl:mt-24 text-center">
          <p className="lg:text-[40px] text-[30px] mt-12 md:mt-0">
            Hi, {`I'm`} <span className="text-red-600">Ibrahim</span> a
          </p>
          <span className="lg:text-[70px] text-[60px] xl:text-[100px] leading-[75px] font-bold text-gray-500">
            FULLSTACK DEVELOPER
          </span>
        </div>
        <div className="z-40 mt-10 xl:ml-20 text-center">
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="text-[12px] p-2 px-4 rounded-[11px] bg-red-500 text-white hover:scale-125 transition duration-700 ease-in-out"
          >
            {`Let's talk  `}
            <TelegramIcon className="mb-1 w-4" />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem className="hover:bg-white">
              <Contact />
            </MenuItem>
          </Menu>
          <button
            onClick={() => {
              window.location.href = "#projects";
            }}
            className="text-gray-700 ml-6 hover:scale-125 transition duration-700 ease-in-out"
          >
            Portfolio <CallMadeOutlinedIcon className="fill-gray-500 w-6" />
          </button>
        </div>
        <div className="flex xl:ml-20">
          <div className="text-gray-400 hidden 2xl:grid grid-cols-2 items-center">
            <span>Check out my</span>
            <Line className="inline rotate-90 h-[140px] w-[183px]" />
          </div>
          <div className="flex items-center w-[100%] justify-center gap-4 mt-10 mb-10 2xl:mb-0 2xl:mt-0 2xl:justify-end">
            <GitHubIcon
              onClick={() => {
                window.open("https://github.com/akibrahimug");
              }}
              className="w-14 2xl:w-12 2xl:h-12 h-14 bg-white border active:scale-75  p-[12px]  hover:scale-105 hover:border hover:bg-red-500 transition transform ease-out duration-105  hover:text-white shadow-md rounded-full cursor-pointer"
            />
            <LinkedIn
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/kasoma-ibrahim-89a732168/"
                );
              }}
              className="w-14 2xl:w-12 2xl:h-12 h-14 bg-white border active:scale-75  p-[12px]  hover:scale-105 hover:border hover:bg-red-500 transition transform ease-out duration-105  hover:text-white shadow-md rounded-full cursor-pointer"
            />
            <Twitter
              onClick={() => {
                window.open("https://twitter.com/Akibrahimug");
              }}
              className="w-14 2xl:w-12 2xl:h-12 h-14 bg-white border active:scale-75  p-[12px]  hover:scale-105 hover:border hover:bg-red-500 transition transform ease-out duration-105  hover:text-white shadow-md rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="grid justify-center xl:!mt-0 ll:mt-32 ">
        <div className="grid md:grid-cols-3 sm:grid-cols-2  justify-center  md:ml-2 ll:grid-cols-1">
          {cetified.map((item, index) => (
            <p key={index} className="text-gray-400 text-sm">
              <CheckCircleIcon className="text-red-400 mr-2" />
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileDesc;
