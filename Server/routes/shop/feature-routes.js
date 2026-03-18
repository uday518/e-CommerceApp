const express = require("express");
const {
    addFeatureImage,
    getFeatureImages,
    updateFeatureImage,
    deleteFeatureImage,
} = require("../../controllers/shop/feature-controller");
const { authMiddleware, authorizeRoles } = require("../../middleware/authmiddleware");

const router = express.Router();

// Public — fetch feature images for the storefront
router.get("/get", getFeatureImages);

// Admin only — manage feature images
router.post("/add", authMiddleware, authorizeRoles("admin"), addFeatureImage);
router.put("/update/:id", authMiddleware, authorizeRoles("admin"), updateFeatureImage);
router.delete("/delete/:id", authMiddleware, authorizeRoles("admin"), deleteFeatureImage);

module.exports = router;
