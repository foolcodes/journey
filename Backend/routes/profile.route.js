import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { updateDetails } from "../controllers/profile.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("avatar"), updateDetails);

export default router;
