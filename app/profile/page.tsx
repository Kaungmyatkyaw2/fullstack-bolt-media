"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { apiInstance } from "@/lib/axios";
import { commentType, postReactionType, userType } from "@/lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import CircularIndeterminate from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TweetCard from "@/components/card/TweetCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const page = () => {
  const [info, setInfo] = useState<userType>();
  const [load, setLoad] = useState(true);
  const params = useSearchParams();
  const user_id = params.get("id");
  const user = useSelector((state: RootState) => state.user);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (user_id) {
      getUserInfo();
    }
  }, [user_id]);

  const getUserInfo = async () => {
    try {
      const { data } = await apiInstance.get(`account/get?id=${user_id}`);

      if (data.isOk) {
        setInfo(data.data);
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
      toast.error("An Error occured while fetching");
      console.log(error);
    }
  };

  const onCommented = (data: commentType, id: number) => {
    setInfo({
      ...info,
      // @ts-ignore
      posts: info?.posts.map((i) =>
        i.id === id ? { ...i, comments: [...i.comments, data] } : i
      ),
    });
  };

  const onReacted = (data: postReactionType, id: number) => {
    setInfo({
      ...info,
      // @ts-ignore
      posts: info?.posts.map((i) =>
        i.id === id ? { ...i, post_reactions: [...i.post_reactions, data] } : i
      ),
    });
  };

  const onUnreacted = (id: number) => {
    setInfo({
      ...info,
      // @ts-ignore
      posts: info?.posts.map((i) =>
        i.id == id
          ? {
              ...i,
              post_reactions: i.post_reactions.filter(
                (react) => react.user_id !== user.id
              ),
            }
          : i
      ),
    });
  };

  if (load) {
    return <CircularIndeterminate />;
  }

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

      <div className="md:w-[80%] w-full md:ml-[20%] pb-[70px] pt-[70px]">
        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-[#212121] w-full mb-6 shadow-lg rounded-xl mt-16 pb-[20px]">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-white">
                      {info?.posts.length}
                    </span>
                    <span className="text-sm text-slate-400">Posts</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-white">
                      {info?.followedBy.length}
                    </span>
                    <span className="text-sm text-slate-400">Followers</span>
                  </div>

                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-white">
                      {info?.following.length}
                    </span>
                    <span className="text-sm text-slate-400">Following</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-2xl text-white font-bold leading-normal mb-1">
                {info?.user_name}
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                {info?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-col flex items-center">
          {info?.posts.map((tweet) => (
            <TweetCard
              onReacted={onReacted}
              onUnreacted={onUnreacted}
              onCommented={onCommented}
              tweet={tweet}
              key={tweet.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
