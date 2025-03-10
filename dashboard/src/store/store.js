import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import messageReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
  },
});
