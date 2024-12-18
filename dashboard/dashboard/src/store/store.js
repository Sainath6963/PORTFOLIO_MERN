import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotResetPasswordReduser from "./slices/forgotResetPasswordSlice.js";
import messageReducer from "./slices/messagesSlice.js";
import timelineReducer from "./slices/timelineSlice";
import skillReduser from "./slices/skillSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotpassword: forgotResetPasswordReduser,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReduser,
  },
});
