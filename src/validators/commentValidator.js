import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

//add comment
export const addCommentValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task ID is required")
    .bail()
    .custom(isValidObjectId)
    .withMessage("Invalid Task ID"),

  body("comment").trim().notEmpty().withMessage("Comment text is required"),
];

//get comment
export const getCommentsValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task ID is required")
    .bail()
    .custom(isValidObjectId)
    .withMessage("Invalid Task ID"),
];
