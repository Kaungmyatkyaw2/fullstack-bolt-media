"use client";

import PlusButton from "@/components/btn/PlusButton";
import PostForm from "@/components/form/PostForm";
import Sidebar from "@/components/Sidebar";
import useUploadImage from "@/helper/useUploadImage";
import React, { FormEvent, useRef, useState } from "react";
import Navbar from "../components/Navbar";

const page = () => {
  const [show, setShow] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <Navbar
        sidebarToggle={() => {
          setShowSideBar(true);
        }}
      />
      <Sidebar
        isShow={showSideBar}
        offShow={() => {
          setShowSideBar(false);
        }}
      />
      <div
        className="fixed right-[20px] bottom-[20px] rounded-full"
        onClick={() => setShow(true)}
      >
        <PlusButton />
      </div>
      <div className="w-[80%] ml-[20%] h-[100vh]"></div>
      {show && (
        <PostForm
          onClose={() => {
            setShow(false);
          }}
          fileMessage="No file chosen"
        />
      )}
    </>
  );
};

export default page;
