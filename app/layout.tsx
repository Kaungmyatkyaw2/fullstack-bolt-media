"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import UserProtectProvider from "@/components/auth/UserProtectProvider";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {
          <SessionProvider>
            <Provider store={store}>
              <UserProtectProvider>{children}</UserProtectProvider>
              <Toaster />
            </Provider>
          </SessionProvider>
        }
      </body>
    </html>
  );
}
