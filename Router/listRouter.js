const express = require('express');
const list = require('../Controllers/TodoController');
const router = express.Router();


router
    .get('/get', (req, res) => {
    res.status(200).send(list.getAll());
    })
    .get('/get/:uuid', (req, res) => {
    list.index(req, res);
    })
    .post('/create', (req, res) => {
    list.create(req, res);
    })
    .patch('/update/:uuid', (req, res)=> {
    list.update(req, res);
    })
    .delete('/delete/:uuid', (req, res) => {
    list.destroy(req, res);
    });

module.exports = router;