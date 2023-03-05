import { commentType } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import profile from "../../public/profile.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { apiInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { insertTweets } from "@/store/post_slice/TweetSlicer";

interface propType {
  com: commentType;
}

const CommentCard = ({ com }: propType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [disable, setDisable] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const allTweets = useSelector((state: RootState) => state.tweet);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      setDisable(true);

      const { data } = await apiInstance.delete(`comment/delete?id=${com.id}`);

      if (data.isOk) {
        dispatch(
          insertTweets(
            allTweets.map((i) =>
              i.id === com.post_id
                ? {
                    ...i,
                    comments: i.comments.filter(
                      (commment) => commment.id !== com.id
                    ),
                  }
                : i
            )
          )
        );
        setAnchorEl(null);
        setDisable(false);
      }
    } catch (error) {
      setAnchorEl(null);
      setDisable(false);
    }
  };

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

      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-[15px] font-bold pt-[2px]">
            {com.user.user_name}
          </h1>

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
              <MenuItem disabled={disable} sx={{ fontSize: "13px" }}>
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

        <p className="text-[13px] text-gray-300">{com.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
