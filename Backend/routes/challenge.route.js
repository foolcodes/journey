import express from "express";
import {
  createChallenge,
  createChallengeData,
  getChallenges,
} from "../controllers/challenge.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createChallenge);
router.get("/", verifyToken, getChallenges);
router.post("/", verifyToken, createChallengeData);

export default router;
