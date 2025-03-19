// require following EXTERNAL dependencies
const express = require("express");
const router = express.Router();

// require following INTERNAL dependencies
const ctrlSurvey = require("../controllers/controller_survey");

// HTTP POST request
// router endpoint to save the users answer
router.post("/submit-response", ctrlSurvey.saveUserResponse);

module.exports = router;
