const express = require("express");
const {
    addProductReview,
    getProductReviews,
} = require("../../controllers/shop/product-review-controller");
const { authMiddleware } = require("../../middleware/authmiddleware");

const router = express.Router();

// Must be logged in to leave a review
router.post("/add-review", authMiddleware, addProductReview);
// Public — anyone can read reviews
router.get("/get-reviews/:productId", getProductReviews);

module.exports = router;
