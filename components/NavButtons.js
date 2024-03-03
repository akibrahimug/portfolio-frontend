import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function NavButtons({ handleClick }) {
  return (
    <div className="flex justify-center w-[320px] h-12 ">
      {/* contact me */}
      <button
        className="border-r px-2 hover:bg-gray-100  text-left rounded-l-full"
        type="button"
        value="Contact Me"
        onClick={handleClick}
      >
        Contact Me
      </button>
      {/* Algorithms */}
      <button
        className="border-r px-2 text-gray-500 font-extralight hover:bg-gray-100  text-left"
        type="button"
        value="TechStack"
        onClick={handleClick}
      >
        TechStack
      </button>
      {/* code wars */}
      {/* Leet Code */}
      {/* github with its icon */}
      <div className="pl-2  flex items-center space-x-2hover:bg-gray-100  text-left rounded-r-full relative">
        <button
          type="button"
          value="Restful API"
          onClick={handleClick}
          className="pr-14"
        >
          REST API
        </button>
        <a
          href="https://github.com/akibrahimug"
          className="bg-white p-[8px] top-[-2px] right-[-13px] m-0 hover:scale-105 hover:border hover:bg-red-700 transition transform ease-out duration-105  hover:text-white shadow-md rounded-full absolute "
        >
          <GitHubIcon className="p-0 text-[35px]" />
        </a>
      </div>
    </div>
  );
}
