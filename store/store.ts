import { configureStore } from "@reduxjs/toolkit";
import TweetSlicer from "./post_slice/TweetSlicer";
import UserSlicer from "./user_slice/UserSlicer";

const store = configureStore({
  reducer: {
    user: UserSlicer,
    tweet : TweetSlicer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
