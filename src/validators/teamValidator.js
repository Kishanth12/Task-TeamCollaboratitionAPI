import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const idValidator = param("id")
  .custom(isValidObjectId)
  .withMessage("Invalid team ID");

// Create Team
export const createTeamValidator = [
  body("name").notEmpty().bail().withMessage("Team name is required"),

  body("manager")
    .isArray({ min: 1 })
    .withMessage("At least one manager is required")
    .bail()
    .custom((arr) => arr.every(isValidObjectId))
    .withMessage("Invalid manager IDs"),

  body("employees")
    .optional()
    .isArray()
    .withMessage("Employees must be an array")
    .bail()
    .custom((arr) => arr.every(isValidObjectId))
    .withMessage("Invalid employee IDs"),
];

// Update Team
export const updateTeamValidator = [
  idValidator,
  body("name")
    .optional()
    .notEmpty()
    .bail()
    .withMessage("Team name is required"),

  body("manager")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one manager is required if provided")
    .bail()
    .custom((arr) => arr.every(isValidObjectId))
    .withMessage("Invalid manager IDs"),

  body("employees")
    .optional()
    .isArray()
    .withMessage("Employees must be an array")
    .bail()
    .custom((arr) => arr.every(isValidObjectId))
    .withMessage("Invalid employee IDs"),
];

// Get Single Team
export const getSingleTeamValidator = [idValidator];

// Delete Team
export const deleteTeamValidator = [idValidator];
