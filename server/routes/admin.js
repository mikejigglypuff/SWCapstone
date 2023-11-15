const express = require("express");
const router = express.Router();
const { adminAuth, postAdmin, getAdminName } = require("../controller/admin");

router.post("/auth", adminAuth);
router.post("/register", postAdmin);
router.get("/adminName", getAdminName);

module.exports = router;