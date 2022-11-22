const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('./validateController');

const userController = {

    register: async function (req, res) {

        const docValidation = validate.register(req.body);
        if(docValidation.error) return res.status(400).send(docValidation.error.message);

        const doc = new User(req.body);
        doc.password = bcrypt.hashSync(req.body.password);
        const compareEmails = await User.findOne({ email: req.body.email });
        try {
            if (compareEmails) {
                res.status(400).send("Email already registered.")
            } else if (req.body.password.match(/[a-z]/gi) == null) {
                res.status(400).send("Password must have at least one alphabetic character.")
            } else if (req.body.password.match(/[0-9]/gi) == null) {
                res.status(400).send("Password must have at least one numeric character.")
            } else {
                await doc.save();
                console.log("User registered successfully.");
                res.redirect("/");
            }
        } catch (error) {
            res.status(400).send("Error: " + error)
        }
    },

    login: async function (req, res) {

        const docValidation = validate.login(req.body);
        if(docValidation.error) return res.status(400).send(docValidation.error.message);

        let email = req.body.email;
        try {
            let doc = await User.findOne({ email })
            if (doc) {
                let password = req.body.password;
                let dbSavedPassword = doc.password;
                if (bcrypt.compareSync(password, dbSavedPassword)) {
                    const token = jwt.sign({id: doc.id, admin: doc.admin}, process.env.TOKEN_SECRET, {expiresIn: 300});
                    console.log('User Logged.')
                    if(doc.admin == true){
                        res.redirect('/students/admin/' + token)
                    }else{
                        res.redirect('/students/free/' + token)
                    }
                } else {
                    res.status(400).send("E-mail or password incorrect.")
                }
            } else {
                res.status(400).send("E-mail or password incorrect.")
            }
        } catch (error) {
            res.status(400).send("Error: " + error)
        }
    }
}

module.exports = userController;

