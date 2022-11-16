"use strict";

const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const jwt = require("jsonwebtoken");
const filePath = './Storage/user.json';

module.exports = {
    register, logIn, logOut
};

function register(req, res) {
    const uuid = uuidv4()
    let users = getAll();
    let confPass = req.body.confPass;
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    user['uuid'] = uuid;
    users = JSON.parse(users);

    let exists = users.find(item => item.email === user.email);

    if(exists) {
        return res
            .status(401)
            .json({
                "message": 'Email already exists'
            });
    }

    if (user.password !== confPass) {
        return res
                .status(401)
                .json({
                    "message": "Passwords do not match."
                });
    }

    users.push(user);
    users = JSON.stringify(users,null, 2);
    fs.writeFile(filePath, users, (err) => {
        if (err)
            return err;
    })

    return res
            .status(200)
            .send(user);
}

function logIn(req, res , next) {
    let {email, password} = req.body;
    let users = getAll();
    users = JSON.parse(users);

    let exists = users.find(item => item.email === email);

    if (!exists){
        return res
            .status(401)
            .json({
                "message":  "Wrong Email."
            });
    }

    if (exists.password !== password) {
        return res
            .status(401)
            .json({
                "message": "Wrong Password."
            });

    }

    let token;
    try {
        token = jwt.sign(
            { userId: exists.uuid, email: exists.email},
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    res
        .status(201)
        .json({
            success: true,
            data: {
                user: exists,
                token: token },
        });

    return "aaa";
}


function logOut() {
}

function getAll() {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        return '[]';
    }
}