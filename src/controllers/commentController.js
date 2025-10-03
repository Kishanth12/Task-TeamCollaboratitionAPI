import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";
import Team from "./../models/teamModel.js";
import { createLog } from "./logController.js";

// add comment to task
export const addComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    const { taskId } = req.params;
    const { comment } = req.body;

    const checkTask = await Task.findById(taskId).populate("teamId");
    if (!checkTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    let canComment = false;

    if (role === "Admin") {
      canComment = true;
    } else if (role === "Manager") {
      const isManager = await Team.findOne({
        _id: checkTask.teamId,
        manager: userId,
      });
      if (isManager) canComment = true;
    } else if (role === "Employee") {
      if (checkTask.assignedTo?.toString() === userId.toString()) {
        canComment = true;
      }
    }
    if (!canComment) {
      return res
        .status(403)
        .json({ message: "You are not allowed to comment on this task" });
    }
    const newComment = new Comment({
      task: taskId,
      user: userId,
      text: comment,
    });

    const savedComment = await newComment.save();

    await createLog(userId, taskId, "commented");

    res.status(201).json(savedComment);
  } catch (error) {
    console.log("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

