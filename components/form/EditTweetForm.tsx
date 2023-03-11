import { useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { FcImageFile } from "react-icons/fc";
import profile from "./../../public/profile.svg";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { apiInstance } from "@/lib/axios";
import { insertTweets } from "@/store/post_slice/TweetSlicer";
import { toast } from "react-hot-toast";
import { style } from "@/lib/toast";
import { tweetType } from "@/lib/types";
import { deleteImage, uploadImage } from "@/functions/imageFunctions";

interface propType {
  onClose: () => void;
  tweetData: tweetType;
}

const EditTweetForm = ({ onClose, tweetData }: propType) => {
  const user = useSelector((state: RootState) => state.user);
  const [load, setLoad] = useState(false);
  const [previewName, setPreviewName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>();
  const div = useRef<HTMLDivElement>(null!);
  const file = useRef<HTMLInputElement>(null!);
  const allTweets = useSelector((state: RootState) => state.tweet);
  const dispatch = useDispatch();

  const imgPreview = () => {
    if (file.current.files) {
      setPreviewName(file.current.files[0].name);
      setPreviewUrl(URL.createObjectURL(file.current.files[0]));
    }
  };

  const updateTweet = async () => {
    try {
      const payload = {
        description: div.current.textContent,
        image: "",
      };

      if (file.current.files?.length) {
        payload.image = await uploadImage(
          file.current.files[0],
          previewName + Date.now()
        );
      } else if (tweetData.image !== null || tweetData.image) {
        payload.image = tweetData.image;
      }

      const { data } = await apiInstance.patch(
        `tweet/update?id=${tweetData.id}`,
        JSON.stringify(payload)
      );
      if (data.isOk) {
        dispatch(
          insertTweets(
            allTweets.map((tweet) =>
              tweet.id === tweetData.id ? data.data : tweet
            )
          )
        );
        onClose();
        setLoad(false);
        toast.success("Successfully Updated");
      }
    } catch (error) {
      setLoad(false);
      toast.error("Successfully Updated", style);
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setLoad(true);
    if (file.current.files?.length !== 0 && file.current.files) {
      if (tweetData.image !== null) {
        deleteImage(tweetData.image).then((_) => {
          updateTweet();
        });
      } else {
        updateTweet();
      }
    } else {
      updateTweet();
    }
  };

  return (
    <form className=" w-full h-[100vh]" action="">
      <div className="fixed top-0 left-0 w-full h-screen bg-[#212121] bg-opacity-60 z-[999] flex justify-center items-center">
        <div className="sm:w-[400px] w-full sm:h-auto h-[100vh] bg-black border border-gray-800 shadow-lg rounded-[10px]">
          <div className="border-b border-gray-800 py-[15px] relative">
            <h1 className="text-center font-bold">Edit a tweet</h1>
            <button
              disabled={load}
              className="absolute top-[50%] right-[5%] translate-y-[-50%] text-[25px] cursor-pointer"
              onClick={() => onClose()}
            >
              <BsX className="text-red-500" />
            </button>
          </div>
          <div className=" px-[20px] py-[20px] space-y-[20px]">
            <div className="flex items-center space-x-[10px]">
              <Image
                width={50}
                height={50}
                className="rounded-full object-cover"
                src={profile}
                alt=""
              />
              <h1 className="font-bold text-[15px]">{user.user_name}</h1>
            </div>
            <div>
              <div
                className="w-full h-fit pb-[20px] outline-none resize-none text-white bg-black "
                contentEditable
                ref={div}
              >
                {tweetData.description}
              </div>
              <textarea
                className="hidden"
                placeholder="What is on your mind?"
                defaultValue={tweetData.description}
              ></textarea>
              {tweetData.image !== null && tweetData.image.length && (
                <img
                  src={previewUrl || tweetData.image}
                  className="w-full h-[200px] mb-[20px] object-cover"
                />
              )}
              <div className="border border-gray-800 py-[10px] px-[10px] shadow-sm rounded-[5px] flex justify-between">
                <input
                  ref={file}
                  onChange={() => imgPreview()}
                  type="file"
                  className="hidden"
                />
                <h1 className="font-bold">
                  {previewName.length ? previewName : "Chosse Another Photo"}
                </h1>
                <div>
                  <div onClick={() => file.current.click()}>
                    <FcImageFile className="text-[22px] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={load}
              onClick={() => handleUpdate()}
              className="w-full bg-primary py-[10px] rounded-[5px] text-white font-bold"
            >
              {load ? <CircularProgress size={"17px"} /> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditTweetForm;
