import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`SIH2026 backend running on http://localhost:${PORT}`);
  });
};

startServer();