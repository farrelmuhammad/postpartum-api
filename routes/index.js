const express = require("express");
const { createActivity, getActivity, getActivityById } = require("../controllers/activityController");
const { createAnswer, getAnswers, updateAnswers, deleteAnswer } = require("../controllers/answerController");
const router = express.Router();
const { register, login, updateProfile, getUsers, getProfileById } = require("../controllers/authController");
const { createCategory, updateCategory, deleteCategory, getCategory, getCategoryById } = require("../controllers/categoryController");
const { createProfile } = require("../controllers/profileController");
const { createSymptoms, getSymptoms, getSymptomsById, updateSymnptoms, deleteSymptoms } = require("../controllers/symptomController");

router.post("/register", register);
router.post("/login", login);

router.get("/users", getUsers);
router.get("/profile/:id", getProfileById);
router.post("/profile", createProfile);
router.put("/profile/:id", updateProfile);

router.post("/activity", createActivity);
router.get("/activity", getActivity);
router.get("/activity/:id", getActivityById);

router.post("/symptom", createSymptoms);
router.put("/symptom/:id", updateSymnptoms);
router.delete("/symptom/:id", deleteSymptoms);
router.get("/symptom", getSymptoms);
router.get("/symptom/:id", getSymptomsById);

router.post("/answer", createAnswer);
router.put("/answer/:id", updateAnswers);
router.delete("/answer/:id", deleteAnswer);
router.get("/answer", getAnswers);

router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
router.get("/category", getCategory);
router.get("/category/:id", getCategoryById);

module.exports = router;