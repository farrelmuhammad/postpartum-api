const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { createSymptoms, getSymptoms, getSymptomsById, updateSymnptoms } = require("../controllers/symptomController");

router.post("/register", register);
router.post("/login", login);

router.post("/symptom", createSymptoms);
router.put("/symptom/:id", updateSymnptoms);
router.get("/symptom", getSymptoms);
router.get("/symptom/:id", getSymptomsById);

module.exports = router;