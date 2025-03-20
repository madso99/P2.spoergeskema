// require following EXTERNAL dependencies
const express = require("express");
const router = express.Router();

// require following INTERNAL dependencies
const ctrlSurvey = require("../controllers/controller_survey");
const surveyPages = require("../data/js/surveyContent");

// HTTP POST request
// router endpoint to save the users answer
router.post("/submit-response", ctrlSurvey.saveUserResponse);

// HTTP GET request
// Route til de dynamiske testsider som bliver indlæst via url paramtre
router.get("/:design", (req, res) => {
  const designKey = req.params.design;

  if (surveyPages.surveyContent[designKey]) {
    res.render("survey", {
      title: surveyPages.surveyContent[designKey].title,
      image: surveyPages.surveyContent[designKey].image,
      description: surveyPages.surveyContent[designKey].description,
    });
  } else {
    res.status(404).send("Design ikke fundet.");
  }
});

module.exports = router;
