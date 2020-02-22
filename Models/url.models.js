const mongoose = require("mongoose");

const Link = mongoose.model("Links", {
  url: String,
  short: {
    type: String,
    unique: true,
  },
});

module.exports = Link;
