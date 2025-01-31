const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Mark as required
  },
  surName: {
    type: String,
    required: true, // Mark as required
  },
  email: {
    type: String,
    required: true, // Mark as required
  },
  phoneNumber: {
    type: String,
    required: true, // Mark as required
  },
  message: {
    type: String,
    required: true, // Mark as required
  },
});

const Consultancy = mongoose.model("Consultancy", consultSchema);
module.exports = Consultancy;
