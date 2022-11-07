const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./Controllers/TodoController');
const fs = require("fs");


const PORT = 5050;

const app = express();
app.use(bodyParser.json());

app.get('/list/get', (req, res) => {
   res.send(todo.getAll());
});

app.get('/list/get/:uuid', (req, res) => {
    res.send(todo.index(req));
})

app.post('/list/create', (req, res) => {
    res.send(todo.create(req));
})

app.patch('/list/update/:uuid', (req, res)=> {
    res.send(todo.update(req));
})

app.delete('/list/delete/:uuid', (req, res) => {
    res.send(todo.destroy(req));
})
app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
})