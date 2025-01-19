import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Auth Middleware
export const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded token contains the `userId` and `role`
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    // Attach both `userId` and `role` to the request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role, // ✅ Added role here
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin Middleware
export const adminMiddleware = (req, res, next) => {
  // ✅ Check if the user has the 'admin' role
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export const doctorMiddleware = (req, res, next) => { 
  // ✅ Check if the user has the 'doctor' role
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Access denied. Doctors only." });
  }
  next();
};
