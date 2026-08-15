import express from "express";

import {
  getRecovery,
  createRecovery,
  completeRecovery,
} from "../controllers/recovery.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getRecovery
);

router.post(
  "/",
  authMiddleware,
  createRecovery
);

router.patch(
  "/:id/complete",
  authMiddleware,
  completeRecovery
);

export default router;