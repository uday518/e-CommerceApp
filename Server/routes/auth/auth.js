const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
} = require("../../controllers/auth/auth-controller");
const { authMiddleware } = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
    res.json({
        user: req.user,
        success: true,
        message: "User is authenticated",
    });
});

module.exports = router;
