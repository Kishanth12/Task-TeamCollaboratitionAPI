import User from "../models/userModel.js";

//updateUser Role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role || user.role;
    const updateUserRole = await user.save();
    res.status(200).json({
      message: "User role updated successfully",
      user: updateUserRole,
    });
  } catch (error) {
    console.log("Error updating user role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//list all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("teams");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get single user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("teams");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
