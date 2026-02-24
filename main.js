import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});