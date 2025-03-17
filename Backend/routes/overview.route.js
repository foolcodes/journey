import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addDay,
  changeStatus,
  getCurrentDay,
  getDaysData,
  updateTitle,
} from "../controllers/overview.controller.js";

const router = express.Router();

router.post("/current-day", verifyToken, getCurrentDay);
router.get("/", verifyToken, getDaysData);
router.post("/add-day", verifyToken, addDay);
router.post("/update-title", verifyToken, updateTitle);
router.post("/change-status", verifyToken, changeStatus);

export default router;
