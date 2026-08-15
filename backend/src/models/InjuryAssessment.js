import mongoose from "mongoose";

const injuryAssessmentSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      trainingFrequency: {
        type: Number,
        required: true,
        min: 0,
        max: 14,
      },

      trainingLoad: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },

      previousInjury: {
        type: Boolean,
        default: false,
      },

      currentPain: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },

      sleepQuality: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },

      recoveryQuality: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },

      riskScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },

      riskLevel: {
        type: String,
        enum: [
          "Low",
          "Moderate",
          "High",
        ],
        required: true,
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

const InjuryAssessment =
  mongoose.model(
    "InjuryAssessment",
    injuryAssessmentSchema
  );

export default InjuryAssessment;