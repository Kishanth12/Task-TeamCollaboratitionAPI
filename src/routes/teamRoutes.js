import express from "express";

import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
} from "./../controllers/teamController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";

import {
  createTeamValidator,
  deleteTeamValidator,
  getSingleTeamValidator,
  updateTeamValidator,
} from "../validators/teamValidator.js";

import { validateRequest } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protectRoute("Admin"),
  createTeamValidator,
  validateRequest,
  createTeam
);

router.get("/", protectRoute("Admin"), getAllTeams);

router.delete(
  "/:id",
  protectRoute("Admin"),
  deleteTeamValidator,
  validateRequest,
  deleteTeam
);

router.put(
  "/:id",
  protectRoute("Admin"),
  updateTeamValidator,
  validateRequest,
  updateTeam
);

router.get(
  "/:id",
  protectRoute("Admin"),
  getSingleTeamValidator,
  validateRequest,
  getSingleTeam
);


export default router;
