import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addDay,
  getCurrentDay,
  getDaysData,
} from "../controllers/overview.controller.js";

const router = express.Router();

router.post("/current-day", verifyToken, getCurrentDay);
router.get("/", verifyToken, getDaysData);
router.post("/add-day", verifyToken, addDay);

export default router;
