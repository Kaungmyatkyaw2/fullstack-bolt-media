import { userType } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  user_name: String | null;
  email: String | null;
  id: number | null;
  followedBy: [] | userType[];
  following: [] | userType[];
}

const initialState: initialStateType = {
  user_name: null,
  email: null,
  id: null,
  followedBy: [],
  following: [],
};

const UserSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    insertUser: (state, action) => {
      state.email = action.payload.email;
      state.user_name = action.payload.name;
      state.id = action.payload.id;
      state.followedBy = action.payload.followedBy;
      state.following = action.payload.following;
    },
    logout: (state) => {
      state.email = null;
      state.user_name = null;
      state.id = null;
    },
  },
});

export const { insertUser, logout } = UserSlicer.actions;
export default UserSlicer.reducer;
