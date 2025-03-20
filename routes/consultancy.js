const express = require("express");
const {
  createConsultancy,
  getConsultancies,
  closeConsultancy,
} = require("../controller/consultancy");

const router = express.Router();

router.post("/create-consultancy", createConsultancy);
router.get("/get-consultancies", getConsultancies);
router.patch("/close-consultancy/:id", closeConsultancy);

module.exports = router;
