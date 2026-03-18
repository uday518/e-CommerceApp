const express = require("express");
const { upload, imageUploadUtil } = require("../../helpers/cloudinary");
const { authMiddleware, authorizeRoles } = require("../../middleware/authmiddleware");

const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    authorizeRoles("admin"),
    upload.single("image"),
    async (req, res) => {
        try {
            // Convert multer buffer to base64 data URI
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const result = await imageUploadUtil(dataURI);

            res.status(200).json({
                success: true,
                result,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Error occurred while uploading image",
            });
        }
    }
);

module.exports = router;
