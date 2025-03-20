// require following EXTERNAL dependencies
const express = require('express');
const router = express.Router();

// require following INTERNAL dependencies
const ctrlSurvey = require("../controllers/controller_survey");

// use generateSessionId as a local Middleware for this router to generate a session id, in your application
router.use(ctrlSurvey.generateSessionId);

const TITLE = 'PROJEKT 2 - MEB';

/* route endpoint */
// HTTP GET request
router.get('/', (req, res, next) => {

  res.locals.løbeId = req.session.løbeId || "Ingen session ID fundet"; // ✅ Gør `løbeId` globalt for Pug
  
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
    });
});

router.get("/check-session", (req, res) => {
  res.json({ løbeId: req.session.løbeId || "Ingen session ID fundet" });
});

/* SKAL MÅSKE BRUGES:
router.get("/survey", (req, res) => {
  res.locals.løbeId = req.session.løbeId || "Ingen session ID fundet";
  res.render("survey", { title: "Spørgeskema" });
});
*/
/* ✅ Gør `løbeId` tilgængeligt i alle views */
router.use((req, res, next) => {
  res.locals.løbeId = req.session.løbeId || "Ingen session ID fundet";
  next();
});

module.exports = router;
