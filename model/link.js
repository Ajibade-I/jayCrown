const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  slug: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link