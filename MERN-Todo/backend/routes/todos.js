const express = require('express')
// functions from controllers
const {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo,
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// trigger requireAuth middleware function before the rest of the routes
// Eg if the user wants to do any request below this they have to be authenticated
router.use(requireAuth)

// GET all todos
router.get('/', getTodos)

// GET single todo
router.get('/:id', getTodo)

// POST a new todo
router.post('/', createTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

// update a todo
router.put('/edit/:id', updateTodo)


module.exports = router