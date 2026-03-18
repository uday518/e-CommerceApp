const express = require("express");
const {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
} = require("../../controllers/admin/order-controller");
const { authMiddleware, authorizeRoles } = require("../../middleware/authmiddleware");

const router = express.Router();

router.get("/get", authMiddleware, authorizeRoles("admin"), getAllOrdersOfAllUsers);
router.get("/details/:id", authMiddleware, authorizeRoles("admin"), getOrderDetailsForAdmin);
router.put("/update/:id", authMiddleware, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;