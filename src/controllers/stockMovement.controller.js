const StockMovement = require("../models/stockMovement.model");
const Product = require("../models/product.model");

exports.createStockMovement = async (req, res) => {
  try {
    const { product: productId, type, quantity } = req.body;
    const productDoc = await Product.findById(productId);

    if (!productDoc)
      return res.status(404).json({ error: "Product not found" });
    if (type === "OUT" && quantity > productDoc.stockQuantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const movement = new StockMovement({ product: productId, type, quantity });
    await movement.save();

    productDoc.stockQuantity =
      type === "IN"
        ? productDoc.stockQuantity + quantity
        : productDoc.stockQuantity - quantity;
    await productDoc.save();

    res.status(201).json(movement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find().populate("product");
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
