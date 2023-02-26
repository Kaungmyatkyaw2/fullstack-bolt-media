import React from "react";
import PlusIcon from "@heroicons/react/20/solid/PlusIcon";

const PlusButton = () => {
  return (
    <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-blue-700 cursor-pointer">
      <PlusIcon className="w-8 h-8 fill-white" />
    </div>
  );
};

export default PlusButton;
