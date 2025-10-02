import express from "express";

import {
  getTasksPerTeam,
  getTasksPerStatus,
  getOverdueTasks,
} from "../controllers/reportController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/tasks-per-team", protectRoute("Admin"), getTasksPerTeam);
router.get("/tasks-per-status", protectRoute("Admin"), getTasksPerStatus);
router.get("/overdue-tasks", protectRoute("Admin"), getOverdueTasks);

export default router;
