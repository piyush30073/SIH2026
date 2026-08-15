import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import performanceRoutes from "./routes/performance.routes.js";
import injuryRoutes from "./routes/injury.routes.js";

const app = express();

// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://train-safe.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(
          new Error("Not allowed by CORS")
        );
      }
    },
    credentials: true,
  })
);

// ==========================================
// GENERAL MIDDLEWARE
// ==========================================

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// AUTH
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

// ==========================================
// WORKOUTS
// ==========================================

app.use(
  "/api/workouts",
  workoutRoutes
);

// ==========================================
// PERFORMANCE
// ==========================================

app.use(
  "/api/performance",
  performanceRoutes
);

// ==========================================
// INJURY PREVENTION
// ==========================================

app.use(
  "/api/injury",
  injuryRoutes
);

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error(
    "SERVER ERROR:",
    error
  );

  if (
    error.message ===
    "Not allowed by CORS"
  ) {
    return res.status(403).json({
      success: false,
      message: "CORS origin not allowed",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;