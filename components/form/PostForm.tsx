import { FormEvent, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { FcImageFile } from "react-icons/fc";
import { motion } from "framer-motion";
import profile from "./../../public/profile.svg";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import useUploadImage from "@/helper/useUploadImage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { apiInstance } from "@/lib/axios";

interface propType {
  onClose: () => void;
  fileMessage: string;
}

const PostForm = ({ fileMessage, onClose }: propType) => {
  const user = useSelector((state: RootState) => state.user);
  const [load, setLoad] = useState(false);
  const file = useRef<HTMLInputElement>(null!);
  const form = useRef<HTMLFormElement>(null!);
  const [previewUrl, setPreviewUrl] = useState<String>();
  const [imageSrc, handleUpload] = useUploadImage();

  const imgPreview = () => {
    if (file.current.files) {
      setPreviewUrl(file.current.files[0].name);
    }
  };

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoad(true);
      // @ts-ignore
      await handleUpload(form.current[1].files[0]);

      if (imageSrc) {
        // @ts-ignore
        const info = {
          image: imageSrc,
          // @ts-ignore
          description: form.current[0].value,
          user_id: user.id,
        };
        const { data } = await apiInstance.post(
          "tweet/create",
          JSON.stringify(info)
        );

        if (data?.isOk) {
          setLoad(false);
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handlePost}
      className=" w-full h-[100vh]"
      action=""
    >
      <motion.div
        key="modal"
        exit={{ scale: 0 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#212121] bg-opacity-60 z-[999] flex justify-center items-center"
      >
        <div className="sm:w-[400px] w-full sm:h-auto h-[100vh] bg-black border border-gray-800 shadow-lg rounded-[10px]">
          <div className="border-b border-gray-800 py-[15px] relative">
            <h1 className="text-center font-bold">Create a tweet</h1>
            <div
              className="absolute top-[50%] right-[5%] translate-y-[-50%] text-[25px] cursor-pointer"
              onClick={() => onClose()}
            >
              <BsX className="text-red-500" />
            </div>
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
              <textarea
                className="w-full h-[130px] outline-none resize-none text-white bg-black"
                placeholder="What is on your mind?"
              ></textarea>
              <div className="border border-gray-800 py-[10px] px-[10px] shadow-sm rounded-[5px] flex justify-between">
                <input
                  ref={file}
                  onChange={() => imgPreview()}
                  type="file"
                  className="hidden"
                />
                <h1 className="font-bold">{previewUrl || "No file chosen"}</h1>
                <div>
                  <div onClick={() => file.current.click()}>
                    <FcImageFile className="text-[22px] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-primary py-[10px] rounded-[5px] text-white font-bold">
              {load ? <CircularProgress size={"17px"} /> : "Post"}
            </button>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default PostForm;
