const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        minLength: 2
    },
    status: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('todos', todoSchema);