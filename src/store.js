import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./services/appSlice";
import authSlice from "./services/user/authSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
  },
});

export default store;
