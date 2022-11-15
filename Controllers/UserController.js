"use strict";

const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const filePath = './Storage/user.json';

module.exports = {
    register, logIn, logOut
};

function register(req) {
    let users = getAll();
    const uuid = uuidv4()
    let user = {
        email:  req.body.email,
        password: req.body.password
    }
    let confPass = req.body.confPass;

    if (user.password !== confPass) {
        return "Passwords do not match."
    }

    user['uuid'] = uuid
    users = JSON.parse(users)
    users[uuid] = user;
    users = JSON.stringify(users);

    fs.writeFile(filePath, users, (err) => {
        if (err)
            return err;
    })

    return user;
}

function logIn(){}
function logOut(){}

function getAll() {
    let users = [];
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, '{}', function (err) {
            if (err) throw err;
            users = {};
        })
    } else {
        users = fs.readFileSync(filePath, 'utf8');
    }
    return users;
}