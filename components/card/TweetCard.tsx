import { tweetType } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import profile from "../../public/profile.svg";
import { ShareIcon, ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import { apiInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { insertTweets } from "@/store/post_slice/TweetSlicer";
import { toast } from "react-hot-toast";
import { style } from "@/lib/toast";

interface propType {
  tweet: tweetType;
}

const TweetCard = ({ tweet }: propType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const allTweets = useSelector((state: RootState) => state.tweet);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = async () => {
    // @ts-ignore
    try {
      setDisable(true);
      const { data } = await apiInstance.delete(`tweet/delete?id=${tweet.id}`);

      if (data.isOk) {
        setDisable(false);
        dispatch(insertTweets(allTweets.filter((i) => i.id !== tweet.id)));
        setAnchorEl(null);
        toast.success("Sucessfully Deleted");
      }
    } catch (error) {
      console.log(error);
      setDisable(false);
      setAnchorEl(null);
      toast.error("An Error Occured", style);
    }
  };

  const handleDelete = async () => {
    setDisable(true);
    console.log(disable);
    if (tweet.image === null || !tweet.image.length) {
      handleDeleteTweet();
    } else {
      const storageRef = ref(storage, tweet.image);
      deleteObject(storageRef)
        .then(() => {
          handleDeleteTweet();
        })
        .catch((error) => {
          setDisable(false);
          setAnchorEl(null);
          toast.error("An Error Occured While Deleting Image");
          console.log(error.message);
        });
    }
  };

  console.log(disable);

  return (
    <div className="md:w-[70%] w-[90%] mt-[20px] border border-gray-800 p-[20px] rounded-[10px]">
      <div className="flex justify-between">
        <div className="w-fit cursor-pointer text-gray-600 flex items-center mb-[15px] space-x-[10px]">
          <ShareIcon className="w-5 h-5 fill-gray-600" />
          <p className="text-[13px] text-gray-600">Share</p>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical className="text-[15px] fill-gray-600 cursor-pointer" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#212121",
              },
            }}
          >
            <MenuItem
              disabled={disable}
              sx={{ fontSize: "13px" }}
              onClick={handleClose}
            >
              Edit
            </MenuItem>
            <MenuItem
              disabled={disable}
              sx={{ fontSize: "13px" }}
              onClick={handleDelete}
            >
              {disable ? "Deleting" : "Delete"}
            </MenuItem>
          </Menu>
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
          <h1 className="text-[15px] font-bold">{tweet.user.user_name}</h1>
          <p className="text-white text-[12px]">{tweet.description}</p>
          {tweet.image !== null ? (
            <Image
              loading="lazy"
              width={500}
              height={300}
              src={tweet.image}
              className="object-cover pt-[5px] rounded-[10px]"
              alt=""
            />
          ) : (
            <></>
          )}
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
