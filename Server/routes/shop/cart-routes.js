const express = require("express");
const {
    addToCart,
    updateCartItemQty,
    deleteCartItem,
    fetchCartItems,
} = require("../../controllers/shop/cart-controller");
const { authMiddleware } = require("../../middleware/authmiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/get/:userId", authMiddleware, fetchCartItems);
router.put("/update-cart", authMiddleware, updateCartItemQty);
router.delete("/:userId/:productId", authMiddleware, deleteCartItem);

module.exports = router;
