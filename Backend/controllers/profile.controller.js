import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

export const updateDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { imageUrl, password, name, about } = req.body;

    // Create an object to store the fields that need to be updated
    const updatedFields = {};

    if (imageUrl) updatedFields.imageUrl = imageUrl;
    if (name) updatedFields.name = name;
    if (about) updatedFields.about = about;

    // If password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // Update the user document
    const response = await User.updateOne(
      { _id: userId },
      { $set: updatedFields }
    );

    if (response.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes were made." });
    }

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
};
