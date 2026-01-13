const express = require("express");
const router = express.Router();
const stockMovementController = require("../controllers/stockMovement.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   - name: Stock Movements
 *     description: Stock movement management
 */
/**
 * @swagger
 * /stock-movements:
 *   get:
 *     summary: Get all stock movements
 *     tags: [Stock Movements]
 *     responses:
 *       200:
 *         description: List of stock movements
 */
router.get(
  "/",
  protect,
  authorize("admin", "staff"),
  stockMovementController.getAllStockMovements
);
/**
 * @swagger
 * /stock-movements:
 *   post:
 *     summary: Create a new stock movement
 *     tags: [Stock Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [in, out]
 *               quantity:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Stock movement created
 */
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  stockMovementController.createStockMovement
);

module.exports = router;
