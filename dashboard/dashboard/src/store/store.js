import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotResetPasswordReduser from "./slices/forgotResetPasswordSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotpassword: forgotResetPasswordReduser,
  },
});
