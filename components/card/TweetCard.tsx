import { tweetType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import profile from "../../public/profile.svg";
import { ShareIcon, ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

interface propType {
  data: tweetType;
}

const TweetCard = ({ data }: propType) => {
  return (
    <div className="md:w-[70%] w-[90%] mt-[20px] border border-gray-800 p-[20px] rounded-[10px]">
      <div className="flex justify-between">
        <div className="w-fit cursor-pointer text-gray-600 flex items-center mb-[15px] space-x-[10px]">
          <ShareIcon className="w-5 h-5 fill-gray-600" />
          <p className="text-[13px] text-gray-600">Share</p>
        </div>
        <div>
          <BsThreeDotsVertical className="text-[15px] fill-gray-600 cursor-pointer" />
        </div>
      </div>
      <div className="flex space-x-[10px]">
        <Image
          src={profile}
          width={50}
          height={50}
          className="rounded-full max-w-[50px] max-h-[50px]"
          alt="profile"
        />
        <div className="pt-[5px] space-y-[3px]">
          <h1 className="text-[15px] font-bold">{data.user.user_name}</h1>
          <p className="text-white text-[12px]">{data.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-end pt-[20px]">
        <div className="flex items-center space-x-[5px]">
          <AiOutlineHeart className="text-[16px] fill-primary" />
          <span className="text-gray-600 text-[16px]">0</span>
        </div>
        <div className="flex items-center space-x-[5px]">
          <ChatBubbleLeftIcon className="w-4 h-4 fill-green-500" />
          <span className="text-gray-600 text-[16px]">0</span>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
