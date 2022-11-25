const express = require("express");
const { createAnswer, getAnswers, updateAnswers, deleteAnswer } = require("../controllers/answerController");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { createSymptoms, getSymptoms, getSymptomsById, updateSymnptoms, deleteSymptoms } = require("../controllers/symptomController");

router.post("/register", register);
router.post("/login", login);

router.post("/symptom", createSymptoms);
router.put("/symptom/:id", updateSymnptoms);
router.delete("/symptom/:id", deleteSymptoms);
router.get("/symptom", getSymptoms);
router.get("/symptom/:id", getSymptomsById);

router.post("/answer", createAnswer);
router.put("/answer/:id", updateAnswers);
router.delete("/answer/:id", deleteAnswer);
router.get("/answer", getAnswers);

module.exports = router;