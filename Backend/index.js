import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import challengeRoutes from "./routes/challenge.route.js";
import overviewRoutes from "./routes/overview.route.js";
import profileRoutes from "./routes/profile.route.js";
import path from "path";

dotenv.config();

const app = express();
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/profile", profileRoutes);
app.use(express.static(path.join(_dirname, "/frontend/dist")));

if (process.env.NODE_ENV === "production") {
  app.use("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
