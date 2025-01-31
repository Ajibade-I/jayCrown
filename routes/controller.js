const express = require("express");
const {
  createConsultancy,
  getConsultancies,
} = require("../controller/controller");

const router = express.Router();

router.post("/create-consultancy", createConsultancy);
router.get("/get-consultancies", getConsultancies);

module.exports = router