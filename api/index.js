import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const port = process.env.PORT || 3001;

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000!!!");
});
