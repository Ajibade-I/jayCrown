const Consultancy = require("../model/consultancy");

// Create a new consultancy record
const createConsultancy = async (req, res) => {

    const { firstName, surName, email, phoneNumber, message } = req.body;

    // Validate required fields
    if (!firstName || !surName || !email || !phoneNumber || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newConsultancy = new Consultancy({
      firstName,
      surName,
      email,
      phoneNumber,
      message,
      status: "open", // Default status
    });

    await newConsultancy.save();

    res.status(201).json({
      message: "Consultancy record created successfully",
      data: newConsultancy,
    });

};

// Get all consultancy records
const getConsultancies = async (req, res) => {
 
    const consultancies = await Consultancy.find();
    res.status(200).json({ data: consultancies });
};

// Respond to a consultancy request
const respondConsultancy = async (req, res) => {

    const { id } = req.params;
    const { responseMessage } = req.body;

    if (!responseMessage) {
      return res.status(400).json({ error: "Response message is required." });
    }

    const consultancy = await Consultancy.findByIdAndUpdate(
      id,
      { responseMessage, status: "responded" },
      { new: true }
    );

    if (!consultancy) {
      return res.status(404).json({ error: "Consultancy record not found." });
    }

    res.status(200).json({ message: "Response added successfully", data: consultancy });

};

// Close a consultancy request
const closeConsultancy = async (req, res) => {
  
    const { id } = req.params;

    const consultancy = await Consultancy.findByIdAndUpdate(
      id,
      { status: "closed" },
      { new: true }
    );

    if (!consultancy) {
      return res.status(404).json({ error: "Consultancy record not found." });
    }

    res.status(200).json({ message: "Consultancy request closed successfully", data: consultancy });
};

module.exports = { createConsultancy, getConsultancies, respondConsultancy, closeConsultancy };
