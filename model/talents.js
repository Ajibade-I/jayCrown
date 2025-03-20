const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    team: { type: String },
    imageUrl: {
      type: String,
    },
    skills: {
      type: [String], // Array of skills
      default: [],
    },
    availability: {
      type: String,
      enum: ["Available", "Busy", "On Leave"], // Restrict values
      default: "Available",
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto-set timestamp
    },
  },
  { timestamps: true } //
);

const Talent = mongoose.model("Talent", talentSchema);
module.exports = Talent;
