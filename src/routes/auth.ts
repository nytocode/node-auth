import express from "express";
import {
  forgotPassword,
  resetPassword,
  signin,
  signout,
  signup,
  updatePassword,
} from "../controllers/auth";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.route("/signout").get(signout);
router.route("/update-password").post(protect, updatePassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/forgot-password").post(forgotPassword);

export default router;
