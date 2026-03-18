const jwt = require("jsonwebtoken");

// Verify JWT token from cookie and attach user to request
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised — please log in",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        const message =
            error.name === "TokenExpiredError"
                ? "Session expired — please log in again"
                : "Invalid token — please log in again";

        return res.status(401).json({ success: false, message });
    }
};

// Factory: restrict access to specific roles
// Usage: authorizeRoles("admin")  or  authorizeRoles("admin", "user")
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied — insufficient permissions",
            });
        }
        next();
    };
};

module.exports = { authMiddleware, authorizeRoles };