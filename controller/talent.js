const Talent = require("../model/talents");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:7400";

const createTalent = async (req, res) => {
  const { name, description, team } = req.body;

  // Build full image URL
  const imageUrl = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  const newTalent = new Talent({ name, description, team, imageUrl });
  await newTalent.save();

  res
    .status(201)
    .json({ message: "Talent created successfully", data: newTalent });
};

// Get all talent records
const getTalents = async (req, res) => {
  const talents = await Talent.find();
  res.status(200).json({ data: talents });
};

// Get a single talent record by ID
const getTalentById = async (req, res) => {
  const { id } = req.params;
  const talent = await Talent.findById(id);

  if (!talent) {
    return res.status(404).json({ error: "Talent not found." });
  }

  res.status(200).json({ data: talent });
};

const updateTalent = async (req, res) => {
  const { id } = req.params;
  const { name, description, team } = req.body;
  let updatedData = { name, description, team };

  const existingTalent = await Talent.findById(id);
  if (!existingTalent) {
    return res.status(404).json({ error: "Talent not found." });
  }

  // Handle new image upload and delete the old one
  if (req.file) {
    if (existingTalent.imageUrl) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(existingTalent.imageUrl)
      );
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log("Error deleting old image:", err);
      });
    }
    updatedData.imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
  }

  const updatedTalent = await Talent.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Talent updated successfully", data: updatedTalent });
};

// Delete a talent record
const deleteTalent = async (req, res) => {
  const { id } = req.params;
  const deletedTalent = await Talent.findByIdAndDelete(id);

  if (!deletedTalent) {
    return res.status(404).json({ error: "Talent not found." });
  }

  res.status(200).json({ message: "Talent deleted successfully" });
};

module.exports = {
  createTalent,
  getTalents,
  getTalentById,
  updateTalent,
  deleteTalent,
};
