import express from "express";

import {
  createWorkout,
  getWorkouts,
} from "../controllers/workout.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getWorkouts
);

router.post(
  "/",
  authMiddleware,
  createWorkout
);

export default router;