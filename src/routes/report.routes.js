const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   - name: Reports
 *     description: Stock reports
 */
/**
 * @swagger
 * /reports/stock-per-product:
 *   get:
 *     summary: Get total stock per product
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Stock per product data
 */
router.get(
  "/stock-per-product",
  protect,
  authorize("admin", "staff"),
  reportController.totalStockPerProduct
);
/**
 * @swagger
 * /reports/stock-per-category:
 *   get:
 *     summary: Get total stock per category
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Stock per category data
 */
router.get(
  "/stock-per-category",
  protect,
  authorize("admin", "staff"),
  reportController.totalStockPerCategory
);
/**
 * @swagger
 * /reports/stock-movements:
 *   get:
 *     summary: Get stock movements by date
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Stock movements data
 */
router.get(
  "/stock-movements",
  protect,
  authorize("admin", "staff"),
  reportController.stockMovementsByDate
);
/**
 * @swagger
 * /reports/low-stock:
 *   get:
 *     summary: Get low stock alerts
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Low stock products
 */
router.get(
  "/low-stock",
  protect,
  authorize("admin", "staff"),
  reportController.lowStockAlert
);
module.exports = router;
