import InjuryAssessment from "../models/InjuryAssessment.js";

const calculateRisk = ({
  trainingFrequency,
  trainingLoad,
  previousInjury,
  currentPain,
  sleepQuality,
  recoveryQuality,
}) => {
  let score = 0;

  // Training frequency
  if (trainingFrequency >= 7) {
    score += 15;
  } else if (trainingFrequency >= 5) {
    score += 10;
  } else if (trainingFrequency >= 3) {
    score += 5;
  }

  // Training load
  score += trainingLoad * 3;

  // Previous injury
  if (previousInjury) {
    score += 15;
  }

  // Current pain
  score += currentPain * 4;

  // Sleep
  score += (10 - sleepQuality) * 2;

  // Recovery
  score += (10 - recoveryQuality) * 2;

  score = Math.round(
    Math.min(Math.max(score, 0), 100)
  );

  let riskLevel = "Low";

  if (score > 60) {
    riskLevel = "High";
  } else if (score > 30) {
    riskLevel = "Moderate";
  }

  return {
    score,
    riskLevel,
  };
};

const generateRecommendations = ({
  riskLevel,
  currentPain,
  sleepQuality,
  recoveryQuality,
  trainingLoad,
  previousInjury,
}) => {
  const recommendations = [];

  if (currentPain >= 5) {
    recommendations.push(
      "Consider reducing training intensity and assessing the source of your pain."
    );
  }

  if (sleepQuality < 6) {
    recommendations.push(
      "Prioritize consistent sleep and recovery."
    );
  }

  if (recoveryQuality < 6) {
    recommendations.push(
      "Add recovery sessions and allow adequate rest between intense workouts."
    );
  }

  if (trainingLoad >= 8) {
    recommendations.push(
      "Consider reducing training load to avoid excessive fatigue."
    );
  }

  if (previousInjury) {
    recommendations.push(
      "Pay extra attention to previously injured areas during training."
    );
  }

  if (recommendations.length === 0) {
    if (riskLevel === "Low") {
      recommendations.push(
        "Your current indicators look good. Continue your balanced training and recovery routine."
      );
    } else {
      recommendations.push(
        "Monitor your training load and recovery closely."
      );
    }
  }

  return recommendations;
};

// ==========================================
// CREATE ASSESSMENT
// ==========================================

export const createAssessment = async (
  req,
  res
) => {
  try {
    const {
      trainingFrequency,
      trainingLoad,
      previousInjury,
      currentPain,
      sleepQuality,
      recoveryQuality,
    } = req.body;

    if (
      trainingFrequency === undefined ||
      trainingLoad === undefined ||
      currentPain === undefined ||
      sleepQuality === undefined ||
      recoveryQuality === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All assessment fields are required",
      });
    }

    const result = calculateRisk({
      trainingFrequency: Number(
        trainingFrequency
      ),
      trainingLoad: Number(trainingLoad),
      previousInjury:
        Boolean(previousInjury),
      currentPain: Number(currentPain),
      sleepQuality: Number(sleepQuality),
      recoveryQuality: Number(
        recoveryQuality
      ),
    });

    const recommendations =
      generateRecommendations({
        riskLevel: result.riskLevel,
        currentPain: Number(currentPain),
        sleepQuality: Number(sleepQuality),
        recoveryQuality: Number(
          recoveryQuality
        ),
        trainingLoad: Number(trainingLoad),
        previousInjury:
          Boolean(previousInjury),
      });

    const assessment =
      await InjuryAssessment.create({
        user: req.user.id,
        trainingFrequency: Number(
          trainingFrequency
        ),
        trainingLoad: Number(trainingLoad),
        previousInjury:
          Boolean(previousInjury),
        currentPain: Number(currentPain),
        sleepQuality: Number(sleepQuality),
        recoveryQuality: Number(
          recoveryQuality
        ),
        riskScore: result.score,
        riskLevel: result.riskLevel,
        recommendations,
      });

    return res.status(201).json({
      success: true,
      message:
        "Injury assessment completed",
      assessment,
    });
  } catch (error) {
    console.error(
      "CREATE INJURY ASSESSMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create injury assessment",
    });
  }
};

// ==========================================
// GET LATEST ASSESSMENT
// ==========================================

export const getLatestAssessment =
  async (req, res) => {
    try {
      const assessment =
        await InjuryAssessment.findOne({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        assessment,
      });
    } catch (error) {
      console.error(
        "GET INJURY ASSESSMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load injury assessment",
      });
    }
  };