import { Challenge } from "../models/user.challenges.js";
import { ChallengeData } from "../models/user.challenge.data.js";

export const createChallenge = async (req, res) => {
  try {
    const isActiveChallenge = await Challenge.findOne({
      user: req.userId,
      status: "active",
    });

    if (isActiveChallenge) {
      return res.status(400).json({
        success: false,
        errorType: "ACTIVE_CHALLENGE_EXISTS",
        message:
          "You already have an active challenge. Complete or abandon it before starting a new one!",
      });
    }

    const { title, aim, currentDay } = req.body;

    const challenge = await Challenge.create({
      user: req.userId,
      title,
      aim,
      currentDay,
    });

    res.status(201).json({ success: true, data: challenge });
    console.log("Challenge data added successfully:", challenge);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
      return res.status(400).json({
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

export const deleteChallenge = async (req, res) => {
  const { challengeId } = req.params;
  try {
    const response = await Challenge.deleteOne({ _id: challengeId });
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "Error while deleting" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deletion successfull" });
  } catch (error) {
    console.log("Error while deleting the challenge", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Error while deleting the challenge",
    });
  }
};

export const getAim = async (req, res) => {
  try {
    const userId = req.userId;

    const response = await Challenge.findOne({
      user: userId,
      status: "active",
    });
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "No active challenges found!" });
    }
    return res.status(200).json({ success: true, aim: response.aim });
  } catch (error) {
    console.log("Unable to fetch aim data", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to gather aim",
    });
  }
};

export const getChallengeDataFromId = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const response = await ChallengeData.find({ challenge: challengeId });

    if (!response) {
      res
        .status(400)
        .json({ success: false, error: "No Challenge Data Found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error while fetching Challenge Data" });
    console.log("Error while fetching Challenge data");
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { updatedNote } = req.body;

    const update = await Challenge.updateOne(
      { user: userId, status: "active" },
      { $set: { aim: updatedNote } },
      { new: true }
    );

    if (!update) {
      res
        .status(400)
        .json({ success: false, message: "No active challenge found!" });
    }

    res.status(200).json({ success: true, update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Error while updating AIM!",
    });
  }
};
