import Task from "../models/taskModel.js";
import Team from "../models/teamModel.js";
import Log from "./../models/logModel.js";
import { io } from "../lib/socket.js";

export const createLog = async (userId, taskId, activity, extra = {}) => {
  try {
    const log = await Log.create({ user: userId, task: taskId, activity });

    const task = await Task.findById(taskId);
    const team = await Team.findById(task.teamId);

    let notifyUsers = [];

    if (activity === "assigned") {
      if (task.assignedTo) notifyUsers.push(task.assignedTo);
    } else if (activity === "reassigned") {
      const { oldUserId } = extra;
      if (oldUserId && oldUserId !== task.assignedTo?.toString())
        notifyUsers.push(oldUserId);
      if (task.assignedTo) notifyUsers.push(task.assignedTo);
    } else if (activity === "commented" || activity === "updated") {
      if (task.assignedTo) notifyUsers.push(task.assignedTo);
      if (team && team.manager && team.manager.length > 0)
        notifyUsers.push(...team.manager);
    }

    notifyUsers.forEach((us) => {
      io.to(us.toString()).emit("newNotification", {
        userId: us,
        taskId,
        activity,
        createdAt: log.createdAt,
      });
    });

    console.log("Notifications emitted to users:", notifyUsers);
  } catch (error) {
    console.log("Error creating log:", error);
  }
};
