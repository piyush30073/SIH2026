import express from "express";

import {
  getPerformance,
} from "../controllers/performance.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getPerformance
);

export default router;