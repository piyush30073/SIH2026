import express from "express";

import {
  createAssessment,
  getLatestAssessment,
} from "../controllers/injury.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/latest",
  authMiddleware,
  getLatestAssessment
);

router.post(
  "/assessment",
  authMiddleware,
  createAssessment
);

export default router;