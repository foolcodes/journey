import { User } from "../models/user.model.js";
import { Challenge } from "../models/user.challenges.js";
import { ChallengeData } from "../models/user.challenge.data.js";

export const createChallenge = async (req, res) => {
  try {
    const { title, aim } = req.body;

    const challenge = await Challenge.create({
      user: req.userId,
      title,
      aim,
    });

    res.status(201).json({ success: true, data: challenge });
    console.log(
      "Challenge data added successfully with the following data:",
      challenge
    );
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log("Error adding the challenge", error.message);
  }
};

export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ user: req.userId });

    if (!challenges || challenges.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No challenges found" });
    }

    res.status(200).json({ success: true, data: challenges });
  } catch (error) {
    console.error("Error getting challenges:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createChallengeData = async (req, res) => {
  try {
    const { challengeId, day, hours, notes } = req.body;

    const challenge = await Challenge.findOne({
      _id: challengeId,
      user: req.userId,
    });

    if (!challenge) {
      return res.send(400).json({
        success: false,
        message: "No challenge found where the user want to add the day!",
      });
    }

    const newChallengeData = new ChallengeData({
      challenge: challengeId,
      day,
      hours,
      notes,
    });
    await newChallengeData.save();

    res.status(201).json({
      success: true,
      message: "Day challenge uploaded",
      data: newChallengeData,
    });
  } catch (error) {
    console.log("Error while uploading day data", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
  throw error;
};
