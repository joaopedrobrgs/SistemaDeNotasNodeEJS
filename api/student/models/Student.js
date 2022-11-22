const mongoose = require("mongoose");

const studentSchema = {
    name: { type: String, required: true},
    testOne: { type: Number, required: true },
    testTwo: { type: Number, required: true },
    works: { type: Number, required: true },
}

module.exports = mongoose.model("Student", studentSchema);