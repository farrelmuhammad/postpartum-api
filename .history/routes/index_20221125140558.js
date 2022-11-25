const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { createSymptoms } = require("../controllers/symptomController");

router.post("/register", register);
router.post("/login", login);

router.post("/symptom", createSymptoms);


module.exports = router;