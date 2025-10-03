import express from "express";
import { addComment } from "./../controllers/commentController.js";
import { protectRoute } from "./../middlewares/authMiddleware.js";
import { addCommentValidator } from "../validators/commentValidator.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.post(
  "/:taskId",
  protectRoute("Admin", "Employee", "Manager"),
  addCommentValidator,
  validateRequest,
  addComment
);

export default router;
