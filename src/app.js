const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
const healthRoutes = require("./routes/health.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const stockMovementRoutes = require("./routes/stockMovement.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();
const reportRoutes = require("./routes/report.routes");
const { swaggerUi, specs } = require("./config/swagger");
connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
