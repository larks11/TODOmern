const express = require("express");
const dotenvFlow = require("dotenv-flow");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const { baseRoot } = require("./controllers/todoController");
const path = require("path");

// Load environment variables
dotenvFlow.config();

const app = express();

// CORS settings
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Parse JSON
app.use(express.json());

// MongoDB connection
const source = process.env.MONGODB_ATLAS_CONNECTION || process.env.MONGO_URI;

mongoose
  .connect(source)
  .then(() => console.log("✅ DB Connected Successfully"))
  .catch((error) => console.log("❌ DB Connection Error:", error));

// API routes
app.get("/", baseRoot);
app.use("/api", todoRoutes);

// Serve frontend static files (React + Vite build)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Render-friendly PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
