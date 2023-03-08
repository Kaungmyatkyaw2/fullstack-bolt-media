import React, { ReactNode } from "react";

interface propType {
  children : ReactNode
}

const FollowButton = ({children} : propType) => {
  return <button className="px-[10px] py-[7px] rounded-[5px] bg-red-500 text-[14px] w-[90px]">{children}</button>;
};

export default FollowButton;
