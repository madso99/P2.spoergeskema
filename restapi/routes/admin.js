const express = require("express");
const router = express.Router();

const ctrlAdmin = require("../controllers/controller_admin");

/* GET user register ie send form */
router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "Please Register",
    subtitle: "Follow the embedded cues",
  });
});

router.post(
  "/register",
  ctrlAdmin.handleRegistration,
  function (req, res, next) {
    res.status(201).json({ message: "Registration succesfull" });
  }
);

router.post("/register", function (req, res, next) {
  // variables from middleware
  res.json({ login: "failed, please try again" });
});

router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Please Login",
  });
});

router.post("/login", ctrlAdmin.handleLogin, function (req, res, next) {
  res.render("admin_page", {
    token: res.locals.token,
    msg: "Login successful",
  });
});

module.exports = router;
