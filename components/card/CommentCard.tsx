import { commentType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import profile from "../../public/profile.svg";

interface propType {
  com: commentType;
}

const CommentCard = ({ com }: propType) => {
  return (
    <div className="flex space-x-[10px]">
      <div className="">
        <Image
          width={35}
          height={35}
          src={profile}
          className="rounded-full"
          alt=""
        />
      </div>

      <div>
        <h1 className="text-[15px] font-bold pt-[2px]">{com.user.user_name}</h1>
        <p className="text-[13px] text-gray-300">{com.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
