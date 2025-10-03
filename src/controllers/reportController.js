import Task from "../models/taskModel.js";

export const getTasksPerTeam = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $group: {
          _id: "$teamId",
          totalTasks: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "_id",
          as: "team",
        },
      },
      { $unwind: "$team" },
      {
        $project: {
          _id: 0,
          teamId: "$_id",
          teamName: "$team.name",
          totalTasks: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasksPerStatus = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedUser",
        },
      },
      {
        $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$status",
          totalTasks: { $sum: 1 },
          users: {
            $push: {
              name: "$assignedUser.name",
              email: "$assignedUser.email",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          totalTasks: 1,
          users: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOverdueTasks = async (req, res) => {
  try {
    const today = new Date();

    const result = await Task.aggregate([
      {
        $match: {
          dueDate: { $lt: today },
          status: { $ne: "done" },
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "team",
        },
      },
      { $unwind: "$team" },

      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedUser",
        },
      },
      { $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true } },

      {
        $project: {
          _id: 1,
          title: 1,
          status: 1,
          priority: 1,
          dueDate: 1,
          teamName: "$team.name",
          assignedUser: {
            name: "$assignedUser.name",
            email: "$assignedUser.email",
          },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
