import { Challenge } from "../models/user.challenges.js";
import { ChallengeData } from "../models/user.challenge.data.js";

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

    const challengeDuration = response.title;
    const startDate = new Date(response.startDate);
    const startDay = startDate.getUTCDate();
    const currentDay = response.currentDay;
    const today = new Date(currentDate);
    const todayDay = today.getUTCDate();

    const presentDay = todayDay - startDay + currentDay + 1;

    console.log("present day is", presentDay);
    console.log("Challenge duration is ", challengeDuration);
    res.status(200).json({ success: true, presentDay, challengeDuration });
  } catch (error) {
    console.log("Error while calculating present day:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addDay = async (req, res) => {
  try {
    const userId = req.userId;
    const { day, hours, notes } = req.body;

    const challengeDataResponse = await Challenge.findOne({
      user: userId,
      status: "active",
    });

    if (!challengeDataResponse) {
      return res
        .status(400)
        .json({ success: false, message: "No active challenge!" });
    }

    const challengeId = challengeDataResponse._id;

    const sameDay = await ChallengeData.findOne({
      challenge: challengeId,
      day,
    });
    if (sameDay) {
      return res.status(400).json({
        success: false,
        message: "You have already added the data for today!",
      });
    }

    const challenge = new ChallengeData({
      challenge: challengeId,
      day,
      hours,
      notes,
    });

    await challenge.save();

    res.status(200).json({ success: true, message: "Day added successfully!" });
  } catch (error) {
    console.log("Error while adding the day!", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDaysData = async (req, res) => {
  try {
    const userId = req.userId;
    const activeChallenge = await Challenge.findOne({
      user: userId,
      status: "active",
    });

    if (!activeChallenge) {
      return res
        .status(400)
        .json({ success: false, message: "No active Challenge!" });
    }

    const activeChallengeId = activeChallenge._id;
    const allDaysData = await ChallengeData.find({
      challenge: activeChallengeId,
    }).sort({ day: -1 });

    // Calculate metrics
    const totalHours = allDaysData.reduce((sum, entry) => sum + entry.hours, 0);

    // Last 7 days data
    const last7Days = allDaysData.slice(0, 7);
    const dailyHours = last7Days.length > 0 ? last7Days[0].hours : 0;

    // Weekly hours (sum of last 7 days)
    const weeklyHours = last7Days.reduce((sum, entry) => sum + entry.hours, 0);

    // Monthly hours (sum of last 30 days or less if not available)
    const last30Days = allDaysData.slice(0, 30);
    const monthlyHours = last30Days.reduce(
      (sum, entry) => sum + entry.hours,
      0
    );

    res.status(200).json({
      success: true,
      message: "Retrieved challenge data successfully!",
      data: allDaysData.sort((a, b) => a.day - b.day), // Send back sorted by day ascending

      totalHours,
      dailyHours,
      weeklyHours,
      monthlyHours,
    });
  } catch (error) {
    console.log("Error while fetching challenge data!", error.message);
    res.status(400).json({
      success: false,
      error: error.message || "Error while fetching challenge data!",
    });
  }
};

export const updateTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { newTitle, challengeId } = req.body;

    const prevDetails = await Challenge.findById(challengeId);

    if (!prevDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Cant find the challenge!" });
    }
    const prevTitle = Number(prevDetails.title);

    const response = await Challenge.findByIdAndUpdate(
      challengeId,
      { $set: { title: prevTitle + newTitle } },
      { new: true }
    );

    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "Update failed!" });
    }
    res.status(200).json({
      success: true,
      message: "Challenge title updated!",
      updatedChallenge: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Error while updating title!",
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { status, challengeId } = req.body;

    const response = await Challenge.updateOne(
      { _id: challengeId },
      { $set: { status: status } }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error while changing status ", error.message);
    res
      .status(400)
      .json({
        success: false,
        message: error.message || "Error while changing status",
      });
  }
};
