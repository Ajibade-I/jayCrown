
const Consultancy = require("../model/consultancy");

const createConsultancy = async (req, res) => {
  const { firstName, surName, email, phoneNumber, message } = req.body;

  const newConsultancy = new Consultancy({
    firstName,
    surName,
    email,
    phoneNumber,
    message,
  });

  await newConsultancy.save();
  
  res.status(201).json({
    message: "Consultancy record created successfully",
    data: newConsultancy,
  });
};

// GET endpoint to fetch all consultancy records
const getConsultancies = async (req, res) => {
  const consultancies = await Consultancy.find();
  res.status(200).json({ data: consultancies });
};

module.exports = { createConsultancy, getConsultancies };
