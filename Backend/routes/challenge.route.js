import express from "express";
import {
  createChallenge,
  deleteChallenge,
  getAim,
  getChallengeDataFromId,
  getChallenges,
  updateNote,
} from "../controllers/challenge.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChallenge);
router.get("/", verifyToken, getChallenges);
router.delete("/:challengeId", verifyToken, deleteChallenge);
router.get("/get-aim", verifyToken, getAim);
router.get("/:challengeId", verifyToken, getChallengeDataFromId);
router.post("/update-note", verifyToken, updateNote);
export default router;
