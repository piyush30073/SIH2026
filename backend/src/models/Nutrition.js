import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    meal: {
      type: String,
      required: true,
      trim: true,
    },

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    protein: {
      type: Number,
      required: true,
      min: 0,
    },

    carbs: {
      type: Number,
      required: true,
      min: 0,
    },

    fats: {
      type: Number,
      required: true,
      min: 0,
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

const Nutrition = mongoose.model(
  "Nutrition",
  nutritionSchema
);

export default Nutrition;