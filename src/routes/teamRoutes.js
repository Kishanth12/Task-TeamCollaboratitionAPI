import express from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getSingleTeam,
  getTeamMembers,
  updateTeam,
} from "./../controllers/teamController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/team", protectRoute('Admin'), createTeam);
router.get("/teams", getAllTeams);
router.delete("/team/:id", deleteTeam);
router.put("/team/:id", updateTeam);
router.get("/team/:id", getSingleTeam);
router.get('/teamMembers',protectRoute('Manager'),getTeamMembers)

export default router;
