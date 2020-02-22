const express = require("express");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", (req, res, next) => {
  res.send("logged in!");
});

module.exports = router;
