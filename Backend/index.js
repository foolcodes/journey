import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import challengeRoutes from "./routes/challenge.route.js";
import overviewRoutes from "./routes/overview.route.js";
import profileRoutes from "./routes/profile.route.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/challenges", challengeRoutes);
app.use("/overview", overviewRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
