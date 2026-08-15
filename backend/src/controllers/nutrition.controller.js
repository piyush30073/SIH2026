import Nutrition from "../models/Nutrition.js";

// ==========================================
// GET TODAY'S NUTRITION
// ==========================================

export const getNutrition = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Nutrition.find({
      user: req.user.id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({
      date: -1,
    });

    const totals = meals.reduce(
      (total, meal) => ({
        calories:
          total.calories + Number(meal.calories || 0),

        protein:
          total.protein + Number(meal.protein || 0),

        carbs:
          total.carbs + Number(meal.carbs || 0),

        fats:
          total.fats + Number(meal.fats || 0),
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      }
    );

    return res.status(200).json({
      success: true,
      nutrition: {
        meals,
        totals,
        mealCount: meals.length,
      },
    });
  } catch (error) {
    console.error(
      "GET NUTRITION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to load nutrition data",
    });
  }
};

// ==========================================
// ADD MEAL
// ==========================================

export const createMeal = async (req, res) => {
  try {
    const {
      meal,
      calories,
      protein,
      carbs,
      fats,
    } = req.body;

    if (
      !meal ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fats === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Meal and all nutrition values are required",
      });
    }

    const newMeal = await Nutrition.create({
      user: req.user.id,
      meal: meal.trim(),
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      date: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal: newMeal,
    });
  } catch (error) {
    console.error(
      "CREATE MEAL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to add meal",
    });
  }
};

// ==========================================
// DELETE MEAL
// ==========================================

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE MEAL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete meal",
    });
  }
};