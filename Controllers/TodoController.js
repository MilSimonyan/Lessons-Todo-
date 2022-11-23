"use strict";

const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const Todo = require('./../Models/todomodel');

module.exports = {
    create, update, getAll, index, destroy
};

function getAll() {}

function index(req, res) {}

function create(req, res) {
    let data = req.body;
    if (data.status === undefined) {
        data.status = false;
    }
    Todo.create(data);

    return res.send('sdfghjkl');
}

function update(req, res) {}

function destroy(req, res) {}