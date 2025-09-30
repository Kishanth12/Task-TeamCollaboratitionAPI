import User from "../models/userModel.js";
import jwt  from 'jsonwebtoken';

export const protectRoute = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token  = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized Login Again" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized Invalid Token" });
      }
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: " User Not Found" });
      }
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden Access Denied" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log("Error in auth middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
