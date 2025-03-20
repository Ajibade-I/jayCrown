const express = require("express");
const {
  createTalent,
  getTalents,
  getTalentById,
  updateTalent,
  deleteTalent,
} = require("../controller/talent");
const upload = require("../config/multer");

const router = express.Router();

router.post("/create-talent", upload.single("image"), createTalent);
router.get("/get-talents", getTalents);
router.get("/get-talent/:id", getTalentById);
router.patch("/update-talent/:id", updateTalent);
router.delete("/delete-talent/:id", deleteTalent);

module.exports = router;
