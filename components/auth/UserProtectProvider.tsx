import { insertUser } from "@/store/user_slice/UserSlicer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import CircularIndeterminate from "../Loader";

interface PropType {
  children: React.ReactNode;
}

const UserProtectProvider = ({ children }: PropType) => {
  const { data, status } = useSession();
  const route = useRouter();
  const dispatch = useDispatch();
  if (status == "unauthenticated") {
    route.push("/login");
  } else {
    if (data !== null && status == "authenticated") {
      dispatch(insertUser({...data.user}));
    }
  }

  if (status === "loading") {
    return <CircularIndeterminate />;
  }

  return <>{children}</>;
};

export default UserProtectProvider;
