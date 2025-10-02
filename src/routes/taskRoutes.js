import express from "express";
import {
  addTask,
  deleteTask,
  getSingleTask,
  getTasks,
  assignTask,
  updateTask,
  updateTaskStatus,
} from "./../controllers/taskController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  assignTaskValidator,
  createTaskValidator,
  deleteTaskValidator,
  getSingleTaskValidator,
  updateTaskStatusValidator,
  updateTaskValidator,
} from "../validators/taskValidator.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.get("/", protectRoute("Admin", "Manager", "Employee"), getTasks);
router.get(
  "/:id",
  protectRoute("Admin", "Manager", "Employee"),
  getSingleTaskValidator,
  validateRequest,
  getSingleTask
);
router.post(
  "/",
  protectRoute("Admin", "Manager"),
  createTaskValidator,
  validateRequest,
  addTask
);
router.put(
  "/:id",
  protectRoute("Admin", "Manager"),
  updateTaskValidator,
  validateRequest,
  updateTask
);
router.delete(
  "/:id",
  protectRoute("Admin", "Manager"),
  deleteTaskValidator,
  validateRequest,
  deleteTask
);
router.patch(
  "/:id/status",
  protectRoute("Employee"),
  updateTaskStatusValidator,
  validateRequest,
  updateTaskStatus
);
router.post(
  "/:id/assign",
  protectRoute("Manager", "Admin"),
  assignTaskValidator,
  validateRequest,
  assignTask
);

export default router;
