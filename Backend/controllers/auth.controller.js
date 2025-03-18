import crypto from "crypto";
import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../nodemailer/emails.js";
import { sendPasswordResetEmail } from "../nodemailer/emails.js";
import { sendSuccessEmail } from "../nodemailer/emails.js";

export const signup = async (request, response) => {
  const { email, password, name } = request.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return response
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpires: Date.now() + 600000,
    });
    await user.save();

    generateTokenAndSetCookie(response, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    response.status(201).json({
      success: true,
      message: "User created",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return response
      .status(400)
      .json({ success: false, message: error.message });
  }
};

export const verifySignup = async (request, response) => {
  const { code } = request.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return response.status(401).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    response.status(201).json({
      success: true,
      message: "User verified",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    throw new Error("Invalid or expired verification code");
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid email" });
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    generateTokenAndSetCookie(response, user._id);
    user.lastLogin = Date.now();

    await user.save();

    response.status(201).json({
      success: true,
      message: "User logged in",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error logging in: ", error);
    response.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (request, response) => {
  response.clearCookie("token");
  response
    .status(200)
    .json({ success: true, message: "Logged out Successfully" });
};

export const forgotPassword = async (request, response) => {
  const { email } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 600000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    // Send email with resetToken
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    response
      .status(200)
      .json({ success: true, message: "Reset password email sent" });
    console.log("Reset password email sent");
  } catch (error) {
    console.log("Error sending reset password email: ", error);
    response.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (request, response) => {
  try {
    const { token } = request.params;
    const { password } = request.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    await sendSuccessEmail(user.email);
    response.status(200).json({ success: true, message: "Password reset" });
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (request, response) => {
  try {
    const user = await User.findById(request.userId).select("-password");
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Unauthorized" });
    }
    response.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error checking auth: ", error);
    response.status(400).json({ success: false, message: error.message });
  }
};
