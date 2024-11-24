import express from "express";
import {
  getUser,
  logout,
  register,
  updatePorfile,
} from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updatePorfile);

export default router;
