const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create variable from token using id as token
const createToken = (_id ) => {
    // storing secret key in ENV file for security reasons
    return jwt.sign({_id}, process.env.SECRET)
}
// login user
const loginUser = async (req, res) => {
    // get email and passowrd from req.body
    const {email, password} = req.body

    try {
        // pass the email and password we are logging in with from the req.body
        const user = await User.login(email, password)
        // create token using payload of _id from doc
        const token = createToken(user._id)
        // return email and token
        res.status(200).json({email, token})
    } catch (error) {
        // return error message
        res.status(400).json({error: error.message})
    }
}
// signup user
const signupUser = async (req, res) => {
    // destructuring an object
    const {email, password} = req.body
    // try catch block
    try {
        // passing arguments of email and password to create a user
        const user = await User.signup(email, password)
        // create token from variable of user and the id generated by mongoDB and the function made earlier
        const token = createToken(user._id)
        // send response if ok - new document created
        res.status(200).json({email, token})
    } catch (error) {
        // send response of erro if not ok
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser,
}