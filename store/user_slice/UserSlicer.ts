import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  user_name: String | null;
  email: String | null;
  id: number | null;
}

const initialState : initialStateType = {
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
    logout : (state) => {
      state.email = null;
      state.user_name = null;
      state.id = null;    }
  },
});

export const { insertUser,logout } = UserSlicer.actions;
export default UserSlicer.reducer;
