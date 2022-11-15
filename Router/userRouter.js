const express = require('express');
const user = require('../Controllers/UserController');
const router = express.Router();

router
    .post('/register', (req, res) => {
        res.send(user.register(req));
    })

module.exports = router;