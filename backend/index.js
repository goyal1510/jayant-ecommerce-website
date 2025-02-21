const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://jayant-ecommerce-website.vercel.app",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// All routes
const authRoutes = require("./src/users/user.routes.js");
const productRoutes = require("./src/products/products.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Database Connection
async function main() {
  if (!process.env.DB_URL) {
    console.error("Error: Missing DB_URL in environment variables.");
    process.exit(1); // Exit process if DB_URL is not set
  }
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
}

main();

// Root Route for Testing
app.get("/", (req, res) => {
  res.send("🚀 Backend is Live!");
});

// Test Route
app.get("/hello", (req, res) => {
  res.send("Hello World!!");
});

// Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
