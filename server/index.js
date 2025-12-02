const express = require("express");
const dotenvFlow = require("dotenv-flow");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const { baseRoot } = require("./controllers/todoController");

// Load environment variables
dotenvFlow.config();

const app = express();

// CORS settings for Render + Vite frontend
app.use(
  cors({
    origin: "*",              // allow all origins
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Parse JSON request body
app.use(express.json());

// MongoDB connection
const source = process.env.MONGODB_ATLAS_CONNECTION || process.env.MONGO_URI;

mongoose
  .connect(source)
  .then(() => console.log("✅ DB Connected Successfully"))
  .catch((error) => console.log("❌ DB Connection Error:", error));

// Default route
app.get("/", baseRoot);

// API routes
app.use("/api", todoRoutes);

// Render-friendly PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
