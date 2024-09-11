const express = require("express");
const {
  getAllClinics,
  getClinicById,
  addClinic,
  editClinicById,
  deleteClinicById,
} = require("../controllers/clinicController");

const router = express.Router();

router.get("/", getAllClinics);

router.get("/:id", getClinicById);

router.post("/", addClinic);

router.put("/:id", editClinicById);

router.delete("/:id", deleteClinicById);

module.exports = router;
