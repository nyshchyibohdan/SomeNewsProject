import express from "express";

import {
    deleteAccount,
    changePassword,
    updateBio,
    updateProfilePic,
    getProfile,
} from "../../handlers/user";

const router = express.Router();
require("dotenv").config();

router.get("/profile", getProfile);

router.post("/upload-pic", updateProfilePic);

router.post("/update-bio", updateBio);

router.post("/change-password", changePassword);

router.delete("/delete-account", deleteAccount);

// module.exports = router;
export default router;
