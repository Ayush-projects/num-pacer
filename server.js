var express = require("express");
var app = express();
var fetch = require("cross-fetch");
var port = process.env.PORT || 3000;
const updater = "https://api.jsonbin.io/v3/b/6084ffd55210f622be3923b0";
const reader = "https://api.jsonbin.io/v3/b/6084ffd55210f622be3923b0/latest";
app.use(express.json());
app.set("view engine", "ejs");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.get("/", (req, res) => {
  fetch(reader)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      var score = resp.record.highscore.toString();
      res.render("game", { adi: score + " Seconds" });
    });
});

app.get("/gameOver", (req, res) => {
  fetch(reader)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      var score = resp.record.highscore.toString();
      res.render("gameover", { adi: score + " Seconds" });
    });
});
app.post("/scoreUpdate", (req, res) => {
  fetch(reader)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      var score = resp.record.highscore;
      var cscore = req.body.cscore;
      if (parseInt(cscore) < parseInt(score)) {
        fetch(updater, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            highscore: cscore,
          }),
        })
          .then(function (response1) {
            return response1.json();
          })
          .then(function (response2) {
            res.json({ score: "updated" });
          });
      } else {
        res.json({ score: "updated" });
      }
    });
});
app.get("/gameWin", (req, res) => {
  fetch(reader)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      var score = resp.record.highscore.toString();
      res.render("gamewin", { adi: score + " Seconds" });
    });
});

app.listen(port, function (error) {
  if (error) {
    console.log("error");
  } else {
    console.log("Server is Running");
  }
});
