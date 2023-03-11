import { commentType, postReactionType, tweetType } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../public/profile.svg";
import { ShareIcon, ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import {
  AiFillHeart,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineUp,
} from "react-icons/ai";
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
import EditTweetForm from "../form/EditTweetForm";
import { CircularProgress } from "@mui/material";
import CommentCard from "./CommentCard";
import { useRouter } from "next/navigation";
import { deleteImage } from "@/functions/imageFunctions";

interface propType {
  tweet: tweetType;
  onCommented?: (data: commentType, id: number) => void;
  onReacted?: (data: postReactionType, id: number) => void;
  onUnreacted?: (id: number) => void;
}

const TweetCard = ({
  tweet,
  onCommented,
  onReacted,
  onUnreacted,
}: propType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [disable, setDisable] = useState(false);
  const [edit, setEdit] = useState(false);
  const [commentLoad, setCommentLoad] = useState(false);
  const comment = useRef<HTMLTextAreaElement>(null!);
  const [showComment, setShowComment] = useState(false);
  const open = Boolean(anchorEl);
  const [react, setReact] = useState<number[]>([]);
  const route = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const allTweets = useSelector((state: RootState) => state.tweet);

  useEffect(() => {
    setReact(tweet.post_reactions.map((i) => i.user_id));
  }, [tweet]);

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

      if (tweet.image !== null && tweet.image.length) {
        await deleteImage(tweet.image).catch((error) => {
          setDisable(false);
          setAnchorEl(null);
          toast.error("An Error Occured While Deleting Image");
          console.log(error.message);
        });
      }

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

  const handleReact = async () => {
    try {
      const { data } = await apiInstance.post(
        `tweet/react`,
        JSON.stringify({ post_id: tweet.id, user_id: user.id })
      );

      if (data.isOk) {
        if (onReacted !== undefined) {
          onReacted(data.data, tweet.id);
        }
        dispatch(
          insertTweets(
            allTweets.map((i) =>
              i.id === tweet.id
                ? {
                    ...i,
                    post_reactions: [...i.post_reactions, data.data],
                  }
                : i
            )
          )
        );
        toast.success("Successfully React");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnReact = async () => {
    try {
      const { data } = await apiInstance.delete(
        `tweet/unreact?post=${tweet.id}&user=${user.id}`
      );

      if (data.isOk) {
        if (onUnreacted !== undefined) {
          onUnreacted(tweet.id);
        }
        dispatch(
          insertTweets(
            allTweets.map((i) => ({
              ...i,
              post_reactions: i.post_reactions.filter(
                (i) => i.user_id !== user.id
              ),
            }))
          )
        );
        toast.success("Successfully Removed React");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleComment = async () => {
    if (comment.current.value && comment.current.value !== null) {
      try {
        setCommentLoad(true);
        const { data } = await apiInstance.post(`comment/create`, {
          user_id: user.id,
          post_id: tweet.id,
          comment: comment.current.value,
        });

        if (data.isOk) {
          comment.current.value = "";

          if (onCommented !== undefined) {
            onCommented(data.data, tweet.id);
          }

          dispatch(
            insertTweets(
              allTweets.map((twe) =>
                twe.id == tweet.id
                  ? { ...twe, comments: [...twe.comments, data.data] }
                  : twe
              )
            )
          );
          setCommentLoad(false);
        }
      } catch (error) {
        console.log(error);
        setCommentLoad(false);
      }
    } else {
      toast.error("Your comment is nothing", style);
    }
  };

  return (
    <>
      <div className="lg:w-[60%] md:w-[70%] sm:w-[90%] w-full mt-[20px] border border-gray-800 p-[20px] sm:rounded-[10px]">
        <div className="flex justify-between">
          <div className="w-fit cursor-pointer text-gray-600 flex items-center mb-[15px] space-x-[10px]">
            <ShareIcon className="w-5 h-5 fill-gray-600" />
            <p className="text-[13px] text-gray-600">Share</p>
          </div>
          {user.id === tweet.user_id ? (
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
                  onClick={() => {
                    setEdit(open);
                    setAnchorEl(null);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  disabled={disable}
                  sx={{ fontSize: "13px" }}
                  onClick={handleDeleteTweet}
                >
                  {disable ? "Deleting" : "Delete"}
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <></>
          )}
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
            <h1
              className="text-[15px] font-bold cursor-pointer"
              onClick={() => route.push(`/profile?id=${tweet.user_id}`)}
            >
              {tweet.user.user_name}
            </h1>
            <p className="text-white text-[12px]">{tweet.description}</p>
            {tweet.image !== null && tweet.image.length ? (
              <Image
                loading="lazy"
                width={300}
                height={200}
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
          <div className="flex items-center space-x-[5px] relative group">
            {react.includes(user.id || 0) ? (
              <AiFillHeart
                className="text-[16px] fill-primary cursor-pointer"
                onClick={() => handleUnReact()}
              />
            ) : (
              <AiOutlineHeart
                className="text-[16px] fill-primary cursor-pointer"
                onClick={() => handleReact()}
              />
            )}
            <div className="w-[100px] h-fit bg-[#313638] absolute bottom-0 left-0 translate-y-[100%] translate-x-[-5px] rounded-[5px] hidden group-hover:block">
              {tweet.post_reactions.map((reaction, index) => (
                <p className="text-[12px] px-[10px] py-[10px]" key={index}>
                  {reaction.user.user_name.length > 10
                    ? reaction.user.user_name.slice(0, 10) + "..."
                    : reaction.user.user_name}
                </p>
              ))}
            </div>
            <span className="text-gray-600 text-[16px]">
              {tweet.post_reactions.length}
            </span>
          </div>
          <div className="flex items-center space-x-[5px]">
            <ChatBubbleLeftIcon className="w-4 h-4 fill-green-500" />
            <span className="text-gray-600 text-[16px]">
              {tweet.comments.length}
            </span>
          </div>
        </div>

        <div className="py-[20px] pb-[10px]">
          <div className="flex items-center py-2 rounded-lg dark:bg-gray-700">
            <div className="w-[50px] flex items-center">
              <div
                onClick={() => setShowComment(!showComment)}
                className="w-[30px] h-[30px] flex justify-center items-center bg-slate-900 rounded-full cursor-pointer"
              >
                {showComment ? (
                  <AiOutlineUp className="text-[13px]" />
                ) : (
                  <AiOutlineDown className="text-[13px]" />
                )}
              </div>
            </div>
            <div className="pr-[10px] w-full">
              <textarea
                id="chat"
                ref={comment}
                rows={1}
                disabled={commentLoad}
                className="block p-2.5 w-full text-sm bg-slate-900 resize-none outline-none rounded-[5px] bg-opacity-40 text-gray-400"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              disabled={commentLoad}
              onClick={() => handleComment()}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-slate-900 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              {commentLoad ? (
                <CircularProgress size={20} />
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              )}
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
        <div className="sm:pl-[50px] space-y-[20px]">
          {showComment
            ? tweet.comments.map((com, index) => (
                <CommentCard com={com} key={index} />
              ))
            : ""}
        </div>
      </div>
      {edit && (
        <EditTweetForm
          tweetData={tweet}
          onClose={() => {
            setEdit(false);
          }}
        />
      )}
    </>
  );
};

export default TweetCard;
