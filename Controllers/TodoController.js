"use strict";

const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const filePath = './Storage/data.json';

module.exports = {
    create, update, getAll, index, destroy
};

function getAll() {
    let todos = [];
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, '{}', function (err) {
            if (err) throw err;
            todos = {};
        })
    } else {
        todos = fs.readFileSync(filePath, 'utf8');
    }
    return todos;
}

function index(req) {
    let uuid = req.params.uuid;
    let todos = getAll();

    todos = JSON.parse(todos);

    if (!todos[uuid]) {
        return "Data Not Found";
    }

    return todos[uuid];
}

function create(req) {
    let todos = getAll();
    let uuid = uuidv4();
    let newTodo = req.body;

    todos = JSON.parse(todos);
    newTodo.uuid = uuid;
    todos[uuid] = newTodo;
    todos = JSON.stringify(todos);

    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
    return todos;
}



function update(req) {
    let todos = getAll();
    let uuid = req.params.uuid;
    let todo = req.body.todo;
    let status = req.body.status;
    todos = JSON.parse(todos);

    if (!todos[uuid]){
        return "invalid Data";
    }

    let oldStatus = todos[uuid].status
    if (todo === undefined || todo === ''){
        destroy(req)
    }
     else {
        todos[uuid].todo = todo;
        if (status === undefined || status === ''){
            todos[uuid].status = oldStatus;
        } else {
            todos[uuid].status = status;
        }
    }

     todos = JSON.stringify(todos);
    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
}

function destroy(req) {
    let todos = getAll();
    let uuid = req.params.uuid;
    todos = JSON.parse(todos);

    if (!todos[uuid]){
        return "invalid Data";
    }
    delete todos[uuid];
    todos = JSON.stringify(todos);

    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
    return "delete";
}