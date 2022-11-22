const express = require('express');
const router = express.Router();

const path = require("path");

const methodOverride = require("method-override")
router.use(methodOverride('_method'));

const authController = require('../controllers/authController');
const studentController = require("../controllers/studentController");

//GETTING ALL STUDENTS:
router.get("/admin/:token", authController.admin, studentController.allStudents);
router.get("/free/:token", authController.free, studentController.allStudents);

//GETTING ADD PAGE:
router.get("/add/:token", authController.admin, (req, res) => {res.render("addStudent", { token: req.params.token })});

//GETTING EDIT PAGE:
router.get("/edit/:id/:token", authController.admin, studentController.loadStudent);

//ADDING NEW STUDENT:
router.post("/:token", authController.admin, studentController.addStudent)

//DELETING STUDENT:
router.delete("/:token", authController.admin, studentController.deleteStudent)

//EDITING STUDENT:
router.put("/:token", authController.admin, studentController.editStudent)

module.exports = router;

