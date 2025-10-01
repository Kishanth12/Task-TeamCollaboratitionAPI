import { body, param } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const idValidator = param("id")
  .custom(isValidObjectId)
  .withMessage("Invalid user ID");

export const updateUserRoleValidator = [
  idValidator,
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .bail()
    .isIn(["Admin", "Manager", "Employee"])
    .withMessage("Role must be Admin, Manager, or Employee"),
];

export const getSingleUserValidator = [idValidator];

export const deleteUserValidator = [idValidator];
