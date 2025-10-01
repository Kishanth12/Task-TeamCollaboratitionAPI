import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const addCommentValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task ID is required")
    .bail()
    .custom(isValidObjectId)
    .withMessage("Invalid Task ID"),

  body("comment").trim().notEmpty().withMessage("Comment text is required"),
];
