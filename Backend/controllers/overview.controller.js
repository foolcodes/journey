import { Challenge } from "../models/user.challenges.js";

export const getCurrentDay = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentDate } = req.body;

    if (!userId || !currentDate) {
      return res
        .status(400)
        .json({ success: false, error: "Missing userId or currentDate" });
    }

    const response = await Challenge.findOne({
      user: userId,
      status: "active",
    });

    if (!response) {
      return res
        .status(404)
        .json({ success: false, error: "No active challenge found" });
    }

    const startDate = new Date(response.startDate).getTime();
    const currentDay = response.currentDay;
    const today = new Date(currentDate).getTime();

    const presentDay =
      Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + currentDay + 1;

    res.status(200).json({ success: true, presentDay });
  } catch (error) {
    console.log("Error while calculating present day:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
