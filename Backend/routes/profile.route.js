import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { updateDetails } from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", verifyToken, updateDetails);

export default router;
