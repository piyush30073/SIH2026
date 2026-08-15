import express from "express";

import {
  getNutrition,
  createMeal,
  deleteMeal,
} from "../controllers/nutrition.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Get today's nutrition
router.get(
  "/",
  authMiddleware,
  getNutrition
);

// Add meal
router.post(
  "/",
  authMiddleware,
  createMeal
);

// Delete meal
router.delete(
  "/:id",
  authMiddleware,
  deleteMeal
);

export default router;