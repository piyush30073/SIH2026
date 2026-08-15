import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

    intensity: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true,
    },

    calories: {
      type: Number,
      default: 0,
      min: 0,
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

const Workout = mongoose.model(
  "Workout",
  workoutSchema
);

export default Workout;