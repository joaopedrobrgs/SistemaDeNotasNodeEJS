require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:" + process.env.PORT
}
app.use(cors(corsOptions));

const studentRoute = require("./api/student/routes/studentRoute")
const userRoute = require('./api/login/routes/userRoute');

mongoose.connect(process.env.MONGO_CONNECTION_URL, (error, db) => {
    if (!error) {
        console.log("-Database loaded");
    }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", bodyParser.urlencoded({ extended: true }), userRoute);
app.use(express.static(path.join(__dirname, "public")))

app.use("/students", bodyParser.urlencoded({ extended: true }), studentRoute);
app.use("/students", express.static(path.join(__dirname, "public")))

app.use("/students/add", express.static(path.join(__dirname, "public")))
app.use("/students/edit", express.static(path.join(__dirname, "public")))

app.listen(process.env.PORT, error => {
    if(!error){
        console.log("-Server running on port: " + process.env.PORT);
    }
})
