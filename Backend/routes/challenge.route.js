import express from "express";
import {
  createChallenge,
  createChallengeData,
  deleteChallenge,
  getChallenges,
} from "../controllers/challenge.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChallenge);
router.get("/", verifyToken, getChallenges);
router.delete("/:challengeId", verifyToken, deleteChallenge);
// router.post("/", verifyToken, createChallengeData);

export default router;
