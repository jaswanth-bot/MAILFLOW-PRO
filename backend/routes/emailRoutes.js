const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send", emailController.sendEmailAction);
router.get("/history", emailController.getHistoryAction);

module.exports = router;
