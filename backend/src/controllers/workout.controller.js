import Workout from "../models/Workout.js";

// ==========================================
// CREATE WORKOUT
// ==========================================

export const createWorkout = async (req, res) => {
  try {
    const {
      exercise,
      duration,
      intensity,
      calories,
      completed,
      date,
    } = req.body;

    if (
      !exercise ||
      !duration ||
      !intensity
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Exercise, duration and intensity are required",
      });
    }

    if (
      !["low", "moderate", "high"].includes(
        intensity
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid workout intensity",
      });
    }

    const workout = await Workout.create({
      user: req.user.id,
      exercise: exercise.trim(),
      duration: Number(duration),
      intensity,
      calories: calories
        ? Number(calories)
        : 0,
      completed:
        completed !== undefined
          ? Boolean(completed)
          : true,
      date: date || new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    console.error(
      "CREATE WORKOUT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while creating workout",
    });
  }
};

// ==========================================
// GET USER WORKOUTS
// ==========================================

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error(
      "GET WORKOUTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching workouts",
    });
  }
};