import express from "express";
import {
  createChallenge,
  createChallengeData,
  deleteChallenge,
  getAim,
  getChallengeDataFromId,
  getChallenges,
} from "../controllers/challenge.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChallenge);
router.get("/", verifyToken, getChallenges);
router.delete("/:challengeId", verifyToken, deleteChallenge);
router.get("/get-aim", verifyToken, getAim);
router.get("/:challengeId", verifyToken, getChallengeDataFromId);
// router.post("/", verifyToken, createChallengeData);

export default router;
