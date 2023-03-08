import { insertUser } from "@/store/user_slice/UserSlicer";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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
  const loading = status === "loading";
  const path = usePathname();

  useEffect(() => {
    if (loading) return;

    if (status !== "authenticated") {
      if (path !== "/register") {
        route.push("/login");
      }
    } else {
      if (status === "authenticated") {
        dispatch(insertUser({ ...data.user }));
      }
    }
  }, [status, data, loading]);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return <>{children}</>;
};

export default UserProtectProvider;
