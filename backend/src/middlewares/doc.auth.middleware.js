import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const docAuthMiddleware = (req, res, next) => {
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
        if (!decoded.docId || !decoded.role) {
          return res.status(401).json({ message: "Invalid token structure" });
        }
    
        // Attach both `userId` and `role` to the request object
        req.doctor = {
        docId: decoded.docId,
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
}