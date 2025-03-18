const express = require("express");
const session = require("express-session");
const router = express.Router();
const {
  generateSessionId,
  saveUserResponse,
} = require("../controllers/controller_survey");

// Tilføj session middleware
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware til at generere session ID
router.use(generateSessionId);

// Route til at gemme brugerens svar
router.post("/submit-response", saveUserResponse);

module.exports = router;
