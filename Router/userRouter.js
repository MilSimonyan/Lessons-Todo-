const express = require('express');
const user = require('../Controllers/UserController');
const router = express.Router();

router
    .post(
        '/register', (req, res) => {
        user.register(req, res);
    })
    .post('/login', (req, res) => {
        user.logIn(req, res);
    })


module.exports = router;