const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Auth middleware with optional role check
function authentication(requiredRole) {
  return async function (req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;
      // If role check is required
      if (requiredRole) {
        const user = await User.findById(req.user);
        if (!user || user.role !== requiredRole) {
          return res.status(403).json({ msg: "Forbidden: Admins only" });
        }
      }
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
}

module.exports = authentication;
