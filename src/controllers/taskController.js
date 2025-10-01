import { createLog } from "./logController.js";
import Task from "./../models/taskModel.js";

// add task
export const addTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, priority, dueDate, teamId } = req.body;
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      teamId,
    });
    const savedTask = await newTask.save();

    try {
      await createLog(userId, savedTask._id, "created");
    } catch (error) {
      console.error("Failed to create log:", error);
    }
    res.status(201).json(savedTask);
  } catch (error) {
    console.log("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
    const updatedTask = await task.save();

    try {
      await createLog(req.user._id, updatedTask._id, "updated");
    } catch (error) {
      console.error("Failed to create log:", error);
    }
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//assign task
export const assignTask = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { newUserId } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.assignedTo = newUserId;
    await task.save();

    await createLog(user._id, task._id, "Task assigned");

    res.status(200).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error("Error in assigning task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get tasks
export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let tasks;

    if (role === "Employee") {
      tasks = await Task.find({ assignedTo: userId }).populate(
        "teamId",
        "name"
      );
    } else if (role === "Manager") {
      tasks = await Task.find({ teamId: { $in: req.user.teams } })
        .populate("assignedTo", "name")
        .populate("teamId", "name");
    } else if (role === "Admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("teamId", "name");
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get singleTask
export const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("teamId", "name")
      .populate("assignedTo", "name email");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error fetching task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { status } = req.body;
    const task = await Task.findOne({ _id: id, assignedTo: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updateStatus = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updateStatus) {
      return res.status(404).json({ message: "Task not found" });
    }
    try {
      await createLog(userId, updateStatus._id, "Status updated");
    } catch (error) {
      console.log("Failed to create log:", error);
    }
    res.status(200).json(updateStatus);
  } catch (error) {
    console.log("Error updating task status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
