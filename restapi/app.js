require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const path = require("path");
const fileUpload = require('express-fileupload');

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const surveyRouter = require("./routes/survey");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/admin", adminRouter); // HUSK AT VI HAR ÆNDRET DETTE FRA /users til /admin og at vi måske mangler at ændre det et andet sted i projektet.
app.use("/survey", surveyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
