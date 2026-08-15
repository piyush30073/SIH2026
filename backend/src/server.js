import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = Number(process.env.PORT) || 10000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`SIH2026 backend running on 0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();