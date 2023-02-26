import React from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "./../public/profile.svg";
import { RootState } from "@/store/store";
import Image from "next/image";
import {
  UserCircleIcon,
  NewspaperIcon,
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@/store/user_slice/UserSlicer";

interface propType {
  isShow: boolean;
  offShow: () => void;
}

const Sidebar = ({ isShow, offShow }: propType) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(logout());
      route.push("/login");
    } catch {
      console.log("ERROR");
    }
  };

  const sidebarNavigator = [
    {
      name: "News Feed",
      icon: NewspaperIcon,
    },
    {
      name: "My Account",
      icon: UserCircleIcon,
    },
    {
      name: "Logout",
      icon: PowerIcon,
    },
  ];
  return (
    <div
      className={`bg-black h-[100vh] md:w-[20%] w-[100%] fixed top-0 left-0 border-r border-gray-900 z-[999] duration-300 ${
        isShow
          ? "md:translate-x-0 translate-x-0"
          : "md:translate-x-0 translate-x-[-100%]"
      }`}
    >
      <div
        className="md:hidden z-[999] absolute top-[25px] right-[20px]"
        onClick={() => offShow()}
      >
        <XMarkIcon className="h-6 w-6" />
      </div>
      <div className="w-full py-[25px] bg-[#212121] h-fit px-[20px] space-y-[15px]">
        <Image
          src={profile}
          width={70}
          height={70}
          alt="Profile Photo"
          objectFit="cover"
          className="rounded-full"
        />
        <div>
          <h1 className="text-[15px] font-bold">{user.user_name}</h1>
          <h1 className="text-[13px] font-bold text-gray-600">{user.email}</h1>
        </div>
        <div className="flex items-center space-x-[20px]">
          <h1 className="text-[13px]">0 Followers</h1>
          <h1 className="text-[13px]">0 Following</h1>
        </div>
      </div>
      <div className="py-[20px] space-y-[25px]">
        {sidebarNavigator.map((i, index) => (
          <div
            onClick={() => {
              i.name === "Logout" && handleSignOut();
            }}
            key={index}
            className="w-fit px-[20px] space-x-[10px] flex items-center cursor-pointer"
          >
            <i.icon className="h-6 w-6" />
            <h1 className="text-[13px] font-medium">{i.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
