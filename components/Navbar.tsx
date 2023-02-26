import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import Notification from "@mui/icons-material/Notifications";
import Menu from "@heroicons/react/20/solid/Bars3Icon";

import { BoltIcon } from "@heroicons/react/20/solid";

interface propType {
  sidebarToggle: () => void;
}

const Navbar = ({ sidebarToggle }: propType) => {
  return (
    <div className="fixed w-full py-[15px] flex justify-between bg-[#212121] z-[999]">
      <div className="md:hidden pl-[20px]">
        <div onClick={() => sidebarToggle()}>
          <Menu className="w-6 h-6 fill-white" />
        </div>
      </div>
      <div className="md:w-[50%] w-fit  flex justify-end">
        <BoltIcon className="w-6 h-6 fill-primary" />
      </div>
      <div className="md:w-[50%] w-fit  flex justify-end pr-[20px]">
        <Badge variant="dot" sx={{ width: "20px" }} color="error">
          <Notification color="action" />
        </Badge>
      </div>
    </div>
  );
};

export default Navbar;
