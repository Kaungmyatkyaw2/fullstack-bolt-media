import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "./user_slice/UserSlicer";

const store = configureStore({
  reducer: {
    user: UserSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
