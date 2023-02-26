import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  user_name: String | null;
  email: String | null;
  id: number | null;
}

const initialState = {
  user_name: null,
  email: null,
  id: null,
};

const UserSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    insertUser: (state, action) => {
      state.email = action.payload.email;
      state.user_name = action.payload.name;
      state.id = action.payload.id;
    },
  },
});

export const { insertUser } = UserSlicer.actions;
export default UserSlicer.reducer;
