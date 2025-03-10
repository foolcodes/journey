import mongoose from "mongoose";

const Schema = mongoose.Schema;

const challengeDataSchema = new Schema(
  {
    challenge: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    day: { type: Number, required: true },
    hours: { type: Number, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ChallengeData = mongoose.model(
  "ChallengeData",
  challengeDataSchema
);
