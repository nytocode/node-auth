import express from "express";
import { protect } from "../middlewares/auth";
import { updateMe } from "../controllers/user";

const router = express.Router();

router.post("/me", protect, updateMe);

export default router;
