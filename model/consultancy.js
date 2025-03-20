const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    surName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "responded", "closed"],
      default: "open",
    },
    responseMessage: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Consultancy = mongoose.model("Consultancy", consultSchema);
module.exports = Consultancy;
