import { tweetType } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: tweetType[] | [] = [];

const TweetSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    insertTweets: (state, action) => {
      return (state = action.payload);
    }
  },
});

export const { insertTweets } = TweetSlicer.actions;
export default TweetSlicer.reducer;
