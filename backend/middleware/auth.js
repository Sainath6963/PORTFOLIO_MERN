import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User not authenticated", 401)); // ✅ Changed to 401
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404)); // ✅ Handle deleted users
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401)); // ✅ Handle JWT errors
  }
});
