const Student = require("../models/Student");

const allStudents = async (req, res) => {
    try {
        let doc = await Student.find();
        if(req.userVerified.admin){
            res.render("studentsAdmin", { students: doc, token: req.params.token });
        }else{
            res.render("studentsFree", { students: doc, token: req.params.token });
        }
        
    } catch (error) {
        res.send("Error: " + error);
    }
}

const addStudent = async (req, res) => {
    var newDoc = new Student(req.body);
    try {
        await newDoc.save();
        console.log("-Document added successfully.");
        res.redirect("/students/admin/" + req.params.token);
    } catch (error) {
        res.send("Error: " + error);
    }
}

const deleteStudent = async (req, res) => {
    let id = req.body.id;
    try {
        await Student.findByIdAndDelete(id);
        console.log("-Document of ID " + id + " deleted successfully.");
        res.redirect("/students/admin/" + req.params.token);
    } catch (error) {
        res.send("Error: " + error);
    }
}

const loadStudent = async (req, res) => {
    let id = req.params.id;
    try{
        let doc = await Student.findById(id);
        res.render("editStudent", { student: doc, token: req.params.token });
    }catch (error) {
        res.send("Error: " + error);
    }
}

const editStudent = async (req, res) => {
    let doc = {
        id: req.body.id,
        name: req.body.name,
        testOne: req.body.testOne,
        testTwo: req.body.testTwo,
        works: req.body.works,
    }
    try {
        await Student.findByIdAndUpdate(doc.id, doc);
        console.log("-Document of ID " + doc.id + " edited successfully.");
        res.redirect("/students/admin/" + req.params.token);
    } catch (error) {
        res.send("Error: " + error);
    }
}

module.exports = { allStudents, addStudent, deleteStudent, loadStudent, editStudent }