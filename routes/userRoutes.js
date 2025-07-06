// boilerplate
const express = require('express');
const router = express.Router();
const {postLogin , postSignup} = require('../controllers/userController');

router.post('/register', postSignup);
router.post('/login', postLogin);

module.exports = router;