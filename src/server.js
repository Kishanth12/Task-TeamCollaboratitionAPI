import express from "express";
import connectDb from "./lib/db.js";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoute.js";
import reportRoute from "./routes/reportRoute.js";
import cookieParser from "cookie-parser";

import { server, app } from "./lib/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/task", taskRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/report", reportRoute);

app.get("/", (req, res) => {
  console.log("Test route hit");
  res.send({ message: "Server is working" });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDb();
});
