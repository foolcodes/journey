import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getCurrentDay } from "../controllers/overview.controller.js";

const router = express.Router();

router.post("/", verifyToken, getCurrentDay);

export default router;
