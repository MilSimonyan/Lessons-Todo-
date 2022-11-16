"use strict";

const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const filePath = './Storage/data.json';

module.exports = {
    create, update, getAll, index, destroy
};

function getAll() {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        return '{}';
    }
}

function index(req, res) {
    let uuid = req.params.uuid;
    let todos = getAll();

    todos = JSON.parse(todos);

    if (!todos[uuid]) {
        return res
                .status(403)
                .json({
                    success: false,
                    message: "Data Not Found"
                });
    }

    return res
        .status(200)
        .json({
            success: true,
            todo:  todos[uuid]
        })
}

function create(req, res) {
    let todos = getAll();
    let uuid = uuidv4();
    let newTodo = req.body;

    todos = JSON.parse(todos);
    newTodo.uuid = uuid;
    todos[uuid] = newTodo;
    todos = JSON.stringify(todos, null, 2);

    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })

    todos = JSON.parse(todos);

    return res
        .status(200)
        .json({
            success: true,
            todo:  todos
        })
}



function update(req, res) {
    let todos = getAll();
    let uuid = req.params.uuid;
    let todo = req.body.todo;
    let status = req.body.status;
    todos = JSON.parse(todos);

    if (!todos[uuid]){
        return res
            .status(403)
            .json({
                success: false,
                message: "invalid Data"
            });
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

     todos = JSON.stringify(todos, null, 2);
    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
    return res
        .status(200)
        .json({
            success: true,
            todo: todo
        });
}

function destroy(req, res) {
    let todos = getAll();
    let uuid = req.params.uuid;
    todos = JSON.parse(todos);

    if (!todos[uuid]){
        return res
            .status(403)
            .json({
                success: false,
                message: "invalid Data"
            });
    }
    delete todos[uuid];
    todos = JSON.stringify(todos, null, 2);

    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
    return res
        .status(200)
        .json({
            success: true,
            message: "delete"
        });
}