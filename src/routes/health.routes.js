const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: API health check
 */
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "API is running" });
});
module.exports = router;
