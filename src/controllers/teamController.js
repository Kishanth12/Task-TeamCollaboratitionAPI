import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

// create team
export const createTeam = async (req, res) => {
  try {
    const { name, employees = [], manager = [] } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }
    if (!manager || manager.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one manager is required" });
    }
    const validateManager = await User.find({
      _id: { $in: manager },
      role: "Manager",
    });
    if (validateManager.length !== manager.length) {
      return res.status(400).json({ message: "Invalid managers are provided" });
    }
    const validateEmployee = await User.find({
      _id: { $in: employees },
      role: "Employee",
    });
    if (validateEmployee.length !== employees.length) {
      return res
        .status(400)
        .json({ message: "Invalid employees are provided" });
    }
    const team = new Team({
      name,
      employees: employees,
      manager: manager,
    });

    const savedTeam = await team.save();
    await User.updateMany(
      { _id: { $in: manager } },
      { $addToSet: { teams: savedTeam._id } }
    );
    await User.updateMany(
      { _id: { $in: employees } },
      { $addToSet: { teams: savedTeam._id } }
    );

    res.status(201).json({
      message: "Team created successfully",
      team: savedTeam,
    });
  } catch (error) {
    console.log("Error creating team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("employees").populate("manager");
    if (!teams) {
      return res.status(404).json({ message: "No teams found" });
    }
    res.status(200).json(teams);
  } catch (error) {
    console.log("Error fetching teams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get Single team
export const getSingleTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id)
      .populate("employees")
      .populate("manager");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.log("Error fetching team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete team
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndDelete(id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.log("Error deleting team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update team
// export const updateTeam = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, employees = [], manager = [] } = req.body;

//     const team = await Team.findById(id);
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }
//     const validManagers = await User.find({ _id: { $in: manager }, role: "Manager" });
//     if (validManagers.length !== manager.length) {
//       return res.status(400).json({ message: "One or more provided managers are invalid" });
//     }
//     const validEmployees = await User.find({ _id: { $in: employees }, role: "Employee" });
//     if (validEmployees.length !== employees.length) {
//       return res.status(400).json({ message: "One or more provided employees are invalid" });
//     }
//     team.name = name || team.name;
//     team.employees = employees.length ? employees : team.employees;
//     team.manager = manager.length ? manager : team.manager;

//     const updatedTeam = await team.save();

//     return res.status(200).json({
//       message: "Team updated successfully",
//       team: updatedTeam,
//     });

//   } catch (error) {
//     console.error("Error updating team:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
//update team
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    team.name = name || team.name;
    const updatedTeam = await team.save();
    return res.status(200).json({
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.log("Error updating team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get logged Manager team members
export const getTeamMembers = async (req, res) => {
  try {
    const userId = req.user._id;
    const teams = await Team.find({ manager: userId });
    if (!teams || teams.length === 0) {
      return res
        .status(404)
        .json({ message: "No teams found for this manager" });
    }
    const members = await User.find({
      teams: { $in: teams.map((team) => team._id) },
      _id: { $ne: userId },
    })
      .select("-password")
      .populate({
        path: "teams",
        select: "name",
      });
    if (!members) {
      return res.status(404).json({ message: "Members not found" });
    }
    res.status(200).json(members);
  } catch (error) {
    console.log("Error fetching team members:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
