import {
  calculatePerformance,
} from "../services/performance.service.js";

export const getPerformance = async (
  req,
  res
) => {
  try {
    const performance =
      await calculatePerformance(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      performance,
    });
  } catch (error) {
    console.error(
      "GET PERFORMANCE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while calculating performance",
    });
  }
};