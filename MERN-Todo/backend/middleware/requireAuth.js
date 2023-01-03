const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// invoking the next function to move on to the next piece of middleware
// once this middleware has run: https://expressjs.com/en/guide/writing-middleware.html
const requireAuth = async (req, res, next) => {
    // verify authentication by getting it from req.headers
    // which contains JWT
    const { authorization } = req.headers
    // check that auth has a value
    if (!authorization) {
        return res.status(401).json({error: 'Auth Token required'})
    }
    // get the token from authorization header
    // splitting the string into two parts to split the token and the string term 'bearer'
    // then taking the second object in that array which is the token
    const token = authorization.split(' ')[1]

    try {
        // verify token by passing in the secret from the .env file
        // returning the payload from the token
        // get the id from the token verification
        const {_id} = jwt.verify(token, process.env.SECRET)
        // find the user in the database using the id
        // returning the id property
        req.user = await User.findOne({ _id }).select('_id')
        // this triggers next handler
        next()
    // errors
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorised'})
    }


}

module.exports = requireAuth