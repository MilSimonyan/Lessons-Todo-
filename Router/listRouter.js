const express = require('express');
const list = require('../Controllers/TodoController');
const router = express.Router();


router
    .get('/get', (req, res) => {
    res.send(list.getAll());
    })
    .get('/get/:uuid', (req, res) => {
    res.send(list.index(req));
    })
    .post('/create', (req, res) => {
    res.send(list.create(req));
    })
    .patch('/update/:uuid', (req, res)=> {
    res.send(list.update(req));
    })
    .delete('/delete/:uuid', (req, res) => {
    res.send(list.destroy(req));
    });

module.exports = router;