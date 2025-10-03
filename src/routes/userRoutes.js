import express from "express";

import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserRole,
} from "../controllers/userController.js";

import {
  deleteUserValidator,
  getSingleUserValidator,
  updateUserRoleValidator,
} from "../validators/userValidator.js";

import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute("Admin"), getAllUsers);

router.get(
  "/:id",
  protectRoute("Admin"),
  getSingleUserValidator,
  validateRequest,
  getSingleUser
);

router.patch(
  "/:id",
  protectRoute("Admin"),
  updateUserRoleValidator,
  validateRequest,
  updateUserRole
);

router.delete(
  "/:id",
  protectRoute("Admin"),
  deleteUserValidator,
  validateRequest,
  deleteUser
);

export default router;
