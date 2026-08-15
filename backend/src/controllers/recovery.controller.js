import Recovery from "../models/Recovery.js";

// ==========================================
// GET RECOVERY DATA
// ==========================================

export const getRecovery = async (
  req,
  res
) => {
  try {
    const exercises = await Recovery.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });

    const totalExercises =
      exercises.length;

    const completedExercises =
      exercises.filter(
        (exercise) => exercise.completed
      ).length;

    const totalMinutes =
      exercises.reduce(
        (total, exercise) =>
          total +
          Number(exercise.duration || 0),
        0
      );

    const completedMinutes =
      exercises
        .filter(
          (exercise) => exercise.completed
        )
        .reduce(
          (total, exercise) =>
            total +
            Number(exercise.duration || 0),
          0
        );

    const recoveryScore =
      totalExercises === 0
        ? 0
        : Math.round(
            (completedExercises /
              totalExercises) *
              100
          );

    return res.status(200).json({
      success: true,
      recovery: {
        totalExercises,
        completedExercises,
        totalMinutes,
        completedMinutes,
        recoveryScore,
        exercises,
      },
    });
  } catch (error) {
    console.error(
      "GET RECOVERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load recovery data",
    });
  }
};

// ==========================================
// CREATE RECOVERY EXERCISE
// ==========================================

export const createRecovery = async (
  req,
  res
) => {
  try {
    const {
      exercise,
      duration,
    } = req.body;

    if (
      !exercise ||
      duration === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Exercise and duration are required",
      });
    }

    const recovery =
      await Recovery.create({
        user: req.user.id,
        exercise: exercise.trim(),
        duration: Number(duration),
        completed: false,
      });

    return res.status(201).json({
      success: true,
      message:
        "Recovery exercise created",
      recovery,
    });
  } catch (error) {
    console.error(
      "CREATE RECOVERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create recovery exercise",
    });
  }
};

// ==========================================
// COMPLETE RECOVERY EXERCISE
// ==========================================

export const completeRecovery =
  async (req, res) => {
    try {
      const recovery =
        await Recovery.findOne({
          _id: req.params.id,
          user: req.user.id,
        });

      if (!recovery) {
        return res.status(404).json({
          success: false,
          message:
            "Recovery exercise not found",
        });
      }

      recovery.completed =
        !recovery.completed;

      await recovery.save();

      return res.status(200).json({
        success: true,
        message:
          recovery.completed
            ? "Recovery exercise completed"
            : "Recovery exercise marked incomplete",
        recovery,
      });
    } catch (error) {
      console.error(
        "COMPLETE RECOVERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update recovery exercise",
      });
    }
  };