// require following EXTERNAL dependencies
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const fileUpload = require('express-fileupload');

const app = express();

// set view engine to be Pug, in your application
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// require following INTERNAL dependencies
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const surveyRouter = require("./routes/survey");

// use following dependencies, in your application
app.use(cookieParser());
app.use(cors());
//app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(fileUpload());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// use the INTERNAL dependencies to set following route prefixes, in your application
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/survey", surveyRouter);
app.use('/data/xml', express.static('data/xml')); // ☢️ Denne kode sikrer, at din XML-fil kan tilgås via /data/xml/questions.xml på serveren.

// use this as a global Middleware to catch 404 and forward to next middleware, in your application
app.use( (req, res, next) => {
  next(createError(404));
});

// THE END of the middleware-chaine and is also the error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
