import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  forgotPassword,
  login,
  logout,
  signup,
  verifySignup,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifySignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
