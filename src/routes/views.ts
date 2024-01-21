import express from "express";
import {
  edit,
  editPassword,
  forgotPassword,
  home,
  resetPassword,
} from "../controllers/views";
import { signin, signup } from "../controllers/views";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

router.get("/", isLoggedIn, home);
router.get("/edit", isLoggedIn, edit);
router.get("/signin", signin);
router.get("/signup", signup);
router.get("/edit-password", isLoggedIn, editPassword);
router.get("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPassword);

export default router;
