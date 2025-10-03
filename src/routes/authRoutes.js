import express from "express";

import { login, logout, register } from "../controllers/authController.js";

import {
  loginValidator,
  registerValidator,
} from "../validators/authValidator.js";

import { validateRequest } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

export default router;
