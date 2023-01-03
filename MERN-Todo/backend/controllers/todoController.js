const Todo = require('../models/todosModel')
const mongoose = require('mongoose')

// get all todos
const getTodos = async (req, res) => {
    // create variable for user id
    const user_id = req.user._id
    // only find docs that are equal to user_id prop - for login purposes
    const todos = await Todo.find({ user_id }).sort({})
    // respond with 200 and json
    res.status(200).json(todos)
}

// get single todo
const getTodo = async (req, res) => {
    const {
        id
    } = req.params
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'cannot get the todo, todo not found'
        })
    }
    // if valid find todo
    const todo = await Todo.findById(id)
    // if not found return error
    if (!todo) {
        return res.status(404).json({
            error: 'Todo id not found'
        })
    }

    res.status(200).json(todo)
}
// create a new todo
const createTodo = async (req, res) => {
    const {
        todoItem,
    } = req.body
    // check which fields are empty for error message
    let emptyFields = [];
    // if these fields are empty then push the string.
    if (!todoItem) {
        emptyFields.push('todo')
    }
    // reject and earn about an empty todo that has been submitted
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: 'Please enter a todo',
            emptyFields
        })    
    }
     //reject and warn about any todos longer than 140 characters 
    if (todoItem.length > 140) {
        return res.status(400).json({
            error: 'Exceeded limit of 140 characters',
            emptyFields
        })
    }
    // add document to database
    try {
        const user_id = req.user._id 
        // using todo model to create new document
        const todo = await Todo.create({
            todoItem,
            user_id
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
// delete a todo
const deleteTodo = async (req, res) => {
    const {
        id
    } = req.params
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'no such todo to delete'
        })
    }
    const todo = await Todo.findOneAndDelete({
        _id: id
    })
    // if no todo found then display error
    if (!todo) {
        return res.status(404).json({
            error: 'Todo id not found, cannot delete'
        })
    }
    // return json if everything is ok
    res.status(200).json(todo)
}
// update a todo
const updateTodo = async (req, res) => {
    const {
        id
    } = req.params
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Cannot find todo to update'
        })
    }
    const todo = await Todo.findOneAndUpdate({
        _id: id
    }, {
        // spread operator, whatever properties are on the body will be updated
        ...req.body
    })
    // if cannot find todo, return error
    if (!todo) {
        return res.status(404).json({
            error: 'Todo id not found to update'
        })
    }
    // return json if all ok
    res.status(200).json(todo)
}
// export the modules
module.exports = {
    updateTodo,
    deleteTodo,
    getTodos,
    getTodo,
    createTodo,
}