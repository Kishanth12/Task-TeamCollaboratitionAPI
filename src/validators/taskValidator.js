import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const idValidator = param("id")
  .custom(isValidObjectId)
  .withMessage("Invalid task ID");

export const createTaskValidator = [
  body("title").notEmpty().withMessage("Title is required").bail(),
  body("description").optional(),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .bail()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
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
  body("title").optional().notEmpty().withMessage("Title is Required").bail(),
  body("description").optional(),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Status must be todo, in-progress, or done"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
];

// assign Task
export const assignTaskValidator = [
  idValidator,
  body("userId")
    .notEmpty()
    .bail()
    .custom(isValidObjectId)
    .withMessage("User ID must be valid"),
  body("oldUserId")
    .optional()
    .custom(isValidObjectId)
    .withMessage("Old User ID must be valid"),
];

// Update Task Status
export const updateTaskStatusValidator = [
  idValidator,
  body("status")
    .notEmpty()
    .bail()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Status must be todo, in-progress, or done"),
];

// Get Single Task
export const getSingleTaskValidator = [idValidator];

// Delete Task
export const deleteTaskValidator = [idValidator];
