// port is either on 8080 or dev environment
// const PORT = process.env.PORT || 8080;
// dotenv for .env variables
require('dotenv').config();
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

const express = require('express');
// express app
const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

// conect to db
// have moved mongodb info to .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests from the .env file for extra security
        // source: https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })