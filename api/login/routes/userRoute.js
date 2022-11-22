const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', (req, res) => {res.render('login')});
router.get('/register', (req, res) => {res.render('register')});

router.post('/', userController.login);
router.post('/register', userController.register);

module.exports = router;