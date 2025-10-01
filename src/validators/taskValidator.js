import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const idValidator = param("id")
  .custom(isValidObjectId)
  .withMessage("Invalid task ID");

export const createTaskValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional(),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium, or High"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
  body("assignedTo")
    .optional()
    .custom(isValidObjectId)
    .withMessage("AssignedTo must be a valid user ID"),
  body("teamId")
    .optional()
    .custom(isValidObjectId)
    .withMessage("TeamId must be a valid team ID"),
];

// Update Task
export const updateTaskValidator = [
  idValidator,
  body("title").optional(),
  body("description").optional(),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium, or High"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be Pending, In Progress, or Completed"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
];

// Reassign Task
export const reassignTaskValidator = [
  idValidator,
  body("newUserId")
    .notEmpty()
    .custom(isValidObjectId)
    .withMessage("New User ID must be valid"),
];

// Update Task Status
export const updateTaskStatusValidator = [
  idValidator,
  body("status")
    .notEmpty()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be Pending, In Progress, or Completed"),
];

// Get Single Task
export const getSingleTaskValidator = [idValidator];

// Delete Task
export const deleteTaskValidator = [idValidator];
