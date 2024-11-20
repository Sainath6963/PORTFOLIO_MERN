import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Avatar And Resume Are Required", 400));
  }
});
