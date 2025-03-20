// require following EXTERNAL dependencies
const express = require('express');
const router = express.Router();

// require following INTERNAL dependencies
const ctrlSurvey = require("../controllers/controller_survey");

// use generateSessionId as a local Middleware for this router to generate a session id, in your application
router.use(ctrlSurvey.generateSessionId);

// skriv noget her!!!
router.use((req, res, next) => {
  res.locals.løbeId = req.session.løbeId || "Ingen session ID fundet";
  next();
});

const TITLE = 'PROJEKT 2 - MEB';

/* route endpoint */
// HTTP GET request
router.get('/', (req, res, next) => {
  res.locals.løbeId = req.session.løbeId || "Ingen session ID fundet";
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
    });
});

router.get("/check-session", (req, res) => {
  res.json({ løbeId: req.session.løbeId || "Ingen session ID fundet" });
});

module.exports = router;
