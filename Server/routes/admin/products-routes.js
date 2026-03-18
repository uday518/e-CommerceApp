const express = require("express");
const {
    addProduct,
    editProduct,
    fetchAllProducts,
    deleteProduct,
} = require("../../controllers/admin/products-controller");
const { authMiddleware, authorizeRoles } = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/add", authMiddleware, authorizeRoles("admin"), addProduct);
router.put("/edit/:id", authMiddleware, authorizeRoles("admin"), editProduct);
router.delete("/delete/:id", authMiddleware, authorizeRoles("admin"), deleteProduct);
router.get("/get", authMiddleware, authorizeRoles("admin"), fetchAllProducts);

module.exports = router;