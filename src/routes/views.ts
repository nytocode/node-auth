import express from "express";
import { edit, home } from "../controllers/views";
import { signin, signup } from "../controllers/views";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

router.get("/", isLoggedIn, home);
router.get("/edit", isLoggedIn, edit);
router.get("/signin", signin);
router.get("/signup", signup);

export default router;
