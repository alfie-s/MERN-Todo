const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema for the todos
const todoSchema = new Schema({
    todoItem: {
        type: String,
        required: true
    },
    // added user id so that different users see different documents
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Todo', todoSchema);
