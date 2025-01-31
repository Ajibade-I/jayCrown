const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  linkSlug: String,
  ipAddress: String,
  os: String,
  location: String,
  userAgent: String,
  clickedAt: { type: Date, default: Date.now },
});

const Click = mongoose.model("Click", ClickSchema);

module.exports = Click