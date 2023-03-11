"use client";

import PlusButton from "@/components/btn/PlusButton";
import PostForm from "@/components/form/PostForm";
import Sidebar from "@/components/Sidebar";
import { apiInstance } from "@/lib/axios";
import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "@/components/Loader";
import TweetCard from "@/components/card/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { insertTweets } from "@/store/post_slice/TweetSlicer";
import { RootState } from "@/store/store";
import * as Sentry from "@sentry/nextjs";
import Header from "@/components/Header";

const page = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const tweet = useSelector((state: RootState) => state.tweet);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getTweets();
  }, []);

  const getTweets = async () => {
    try {
      const { data } = await apiInstance.get("tweet/gets");

      if (data?.isOk) {
        dispatch(insertTweets(data.data));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header title="NewsFeed"></Header>

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
        onClick={() => setShowForm(true)}
      >
        <PlusButton />
      </div>
      <div className="md:w-[80%] w-full md:ml-[20%] pb-[70px] pt-[70px]">
        <div className="w-full flex flex-col items-center">
          {tweet.map((tweet) => (
            <TweetCard tweet={tweet} key={tweet.id} />
          ))}
        </div>
      </div>
      {showForm && (
        <PostForm
          onClose={() => {
            setShowForm(false);
          }}
          fileMessage="No file chosen"
        />
      )}
    </>
  );
};

export default page;
