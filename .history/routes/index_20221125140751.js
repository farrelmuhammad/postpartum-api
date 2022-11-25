const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { createSymptoms, getSymptoms } = require("../controllers/symptomController");

router.post("/register", register);
router.post("/login", login);

router.post("/symptom", createSymptoms);
router.get("/symptom", getSymptoms);

module.exports = router;