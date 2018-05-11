const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "")));
app.use(cookieParser());
app.get("/", function(req, res, next) {
  let message = "";
  let thanosChoice = req.cookies["thanosChoice"];
  if (!thanosChoice) {
    thanosChoice = Math.random();
    res.cookie("thanosChoice", thanosChoice);
  } else {
    thanosChoice = Number(thanosChoice);
  }
  if (thanosChoice < 0.5) {
    message = "Rest in peace.";
  } else {
    message = "You live to fight another day.";
  }
  res.render("index", { message: message });
});

const port = process.env.port || process.env.PORT || 9696;
app.listen(port, function() {
  console.log("Web Server listening on port %s", port);
});
