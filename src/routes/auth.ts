import express from "express";
import { signin, signout, signup } from "../controllers/auth";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.route("/signout").get(signout);

export default router;
