import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
