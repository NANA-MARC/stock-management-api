const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get(
  "/",
  protect,
  authorize("admin", "staff"),
  productController.getAllProducts
);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  productController.createProduct
);
router.get(
  "/:id",
  protect,
  authorize("admin", "staff"),
  productController.getProductById
);
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  productController.updateProduct
);
router.delete(
  "/:id",
  protect,
  authorize("admin", "manager"),
  productController.deleteProduct
);

module.exports = router;
