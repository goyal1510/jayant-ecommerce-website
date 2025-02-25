const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies.
app.use(cookieParser());

// Middleware for parsing request bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allowed origins for CORS.
const allowedOrigins = [
  "http://localhost:5173",
  "https://jayant-ecommerce-website.vercel.app"
];

// CORS configuration.
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests) and allowed origins.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent.
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods.
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Allowed headers.
  })
);

// Custom CORS middleware (for handling OPTIONS requests and setting headers).
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }

  // Handle OPTIONS requests.
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Middleware for logging requests.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import route handlers.
const authRoutes = require("./src/users/user.routes.js");
const productRoutes = require("./src/products/products.routes.js");
const cartRoutes = require("./src/cart/cart.routes.js");

// Use route handlers.
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

// Function to connect to MongoDB.
async function main() {
  if (!process.env.DB_URL) {
    console.error("Error: Missing DB_URL in environment variables.");
    process.exit(1); // Exit if DB_URL is missing.
  }
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if connection fails.
  }
}

// Call the main function to connect to MongoDB.
main();

// Test routes.
app.get("/", (req, res) => res.send("Backend is Live!"));
app.get("/hello", (req, res) => res.send("Hello World!!"));

// Start the server.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});