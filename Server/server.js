require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route imports
const authRouter = require("./routes/auth/auth");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminImageUploadRouter = require("./routes/admin/image-upload-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopFeatureRouter = require("./routes/shop/feature-routes");

const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Seed admin user from env vars (runs once on startup)
async function seedAdmin() {
    const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) return;

    const exists = await User.findOne({ email: ADMIN_EMAIL });
    if (exists) return;

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
        userName: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
    });
    console.log(`Admin user "${ADMIN_USERNAME}" seeded successfully`);
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        seedAdmin();
    })
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
        ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/images", adminImageUploadRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/feature", shopFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
