const express = require("express");
const {
    addAddress,
    editAddress,
    fetchAllAddress,
    deleteAddress,
} = require("../../controllers/shop/address-controller");
const { authMiddleware } = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addAddress);
router.get("/get/:userId", authMiddleware, fetchAllAddress);
router.put("/update/:userId/:addressId", authMiddleware, editAddress);
router.delete("/delete/:userId/:addressId", authMiddleware, deleteAddress);

module.exports = router;
