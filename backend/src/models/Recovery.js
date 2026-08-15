import mongoose from "mongoose";

const recoverySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    exercise: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Recovery = mongoose.model(
  "Recovery",
  recoverySchema
);

export default Recovery;