const express = require("express");
const Link = require("../Models/url.models");

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Short me!" });
});

router.post("/createurl", (req, res, next) => {
  function generateShortURL(n) {
    const text =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let result = "";
    for (let i = 0; i < n; i += 1) {
      result += text[Math.floor(Math.random() * 61)];
    }
    return result;
  }
  const data = new Link({
    url: req.body.longurl,
    short: generateShortURL(6),
  });
  data.save((err, d) => {
    if (err) {
      console.error(err);
      res.send("Some errors occured.");
    } else {
      res.render("landing", {
        title: `Short Me`,
        message: `Success! Your new URL is: `,
        url: `http://localhost:3000/${data.short}`,
      });
    }
  });
});

router.get("/:shorturl", (req, res, next) => {
  Link.findOne({ short: req.params.shorturl }, (err, link) => {
    if (err) {
      console.error(err);
      res.render("landing", {
        title: `Short Me`,
        message: "Your link isn't found!",
      });
    } else if (link !== null) {
      res.redirect(link.url);
    } else {
      res.render("landing", {
        title: `Short Me`,
        message: "Your link isn't found!",
      });
    }
  });
});

module.exports = router;
