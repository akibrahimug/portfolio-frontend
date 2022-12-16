import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { BeakerIcon } from "@heroicons/react/24/solid";

function Methodologies() {
  // development methodologies
  const methodologies = [
    "Agile",
    "Scrum",
    "DRY",
    "KISS",
    "Object Oriented Programming",
    "REST",
    "SASS",
    "Mobile First",
    "Responsive Web Design",
    "Progresive Web Apps",
    "Test Driven Development",
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="hidden md:inline-flex m-2 md:mr-10 items-center justify-end text-red-700 cursor-pointer">
        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="md:hidden lg:inline-flex"
        >
          <h3 className="text-red-500">My Methodology</h3>
          <BeakerIcon className="hidden md:inline-flex w-6 text-red-500" />
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
          {methodologies.map((methodology, index) => (
            <MenuItem className="hover:bg-white" key={index}>
              <div className="flex flex-col">
                <p className="text-[15px]">{methodology}</p>
                <Divider />
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default Methodologies;
