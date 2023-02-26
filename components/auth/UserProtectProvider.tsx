import { insertUser } from "@/store/user_slice/UserSlicer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CircularIndeterminate from "../Loader";

interface PropType {
  children: React.ReactNode;
}

const UserProtectProvider = ({ children }: PropType) => {
  const { data, status } = useSession();
  const route = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status == "unauthenticated") {
      setIsLoading(false);
      route.push("/login");
    } else {
      if (status == "authenticated") {
        setIsLoading(false);
        dispatch(insertUser({ ...data.user }));
      }
    }
  }, [status, isLoading, data]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return <>{children}</>;
};

export default UserProtectProvider;
