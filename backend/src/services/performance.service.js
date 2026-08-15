import Workout from "../models/Workout.js";

export const calculatePerformance = async (userId) => {
  const workouts = await Workout.find({
    user: userId,
  }).sort({ date: -1 });

  const totalWorkouts = workouts.length;

  const totalMinutes = workouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) =>
      total + Number(workout.calories || 0),
    0
  );

  const completedWorkouts = workouts.filter(
    (workout) => workout.completed
  ).length;

  // -----------------------------
  // Fitness Score
  // -----------------------------

  let fitnessScore = 0;

  if (totalWorkouts > 0) {
    const workoutScore = Math.min(
      totalWorkouts * 10,
      40
    );

    const durationScore = Math.min(
      totalMinutes / 10,
      30
    );

    const completionScore =
      (completedWorkouts / totalWorkouts) * 30;

    fitnessScore = Math.round(
      workoutScore +
        durationScore +
        completionScore
    );
  }

  // -----------------------------
  // Weekly workouts
  // -----------------------------

  const now = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(
    now.getDate() - 7
  );

  const weeklyWorkouts = workouts.filter(
    (workout) =>
      new Date(workout.date) >=
      sevenDaysAgo
  );

  const weeklyMinutes =
    weeklyWorkouts.reduce(
      (total, workout) =>
        total +
        Number(workout.duration || 0),
      0
    );

  const weeklyCalories =
    weeklyWorkouts.reduce(
      (total, workout) =>
        total +
        Number(workout.calories || 0),
      0
    );

  return {
    totalWorkouts,
    totalMinutes,
    totalCalories,
    completedWorkouts,
    fitnessScore,

    weekly: {
      workouts: weeklyWorkouts.length,
      minutes: weeklyMinutes,
      calories: weeklyCalories,
    },
  };
};