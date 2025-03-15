import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/w5jDX3XrX_fn1BKdvt49O8aSKMC1mzE3ieVAiiF8q-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMTAvRGVm/YXVsdC1Qcm9maWxl/LVBpY3R1cmUtRG93/bmxvYWQtUE5HLUlt/YWdlLnBuZw",
    },
    about: {
      type: String,
      default:
        "I am gonna nail the challenge and be very productive throughtout the challenge.",
    },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
