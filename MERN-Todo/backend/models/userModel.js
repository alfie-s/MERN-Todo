const mongoose = require('mongoose')
// bcrypt added to hash paswword in a secure way to help keep security with the database
const bcrypt = require('bcrypt')
// this is to validate email addresses
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // allow only one unique email
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method so someone can sign up and info will be encoded and added to database
// validator info found at https://express-validator.github.io/docs/
// static method: https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// cannot use arrow function with 'this'keyword
userSchema.statics.signup = async function (email, password) {
    // if user enters nothing
    if (!email || !password) {
        throw Error(`Please fill out all required fields`);
    }
    // if usernames do not end with substring '@gmail.com'
    // found this method here: https://www.w3schools.com/jsref/jsref_endswith.asp
    if (!email.endsWith('@gmail.com')) {
        throw Error(`Please enter an email ending in '@gmail.com'`);
    }
    // if email is not a valid email using validator
    if (!validator.isEmail(email)) {
        throw Error(`Please enter a valid email address`);
    }
    // check if password is strong
    if (!validator.isStrongPassword(password)) {
        throw Error(`Please enter a stronger password`);
    }
    // find if email entered is in database
    const exists = await this.findOne({ email })
    // if exists throw error
    if (exists) {
        throw Error('Email already exists on our system')
    }
    // need to use salt as using bcrypt which adds random characters to the end of the hash string
    // await as this can take time, stuck with default value of 10
    const salt = await bcrypt.genSalt(10)
    // hash salt with password
    const hash = await bcrypt.hash(password, salt)
    // store password in database with user email
    // create the document and have the password as the varibale hash
    const user = await this.create({ email, password: hash})

    return user
}
// static login method so someone can login and info will be encoded
userSchema.statics.login = async function(email, password) {
    // if user enters nothing
    if (!email ||!password) {
        throw Error(`Please fill out all required fields`);
    }
    // set variable for searching for user in the database
    const user = await this.findOne({ email })
    // if document not found throw error
    if (!user) {
        throw Error('Email not found')
    }
    // comparing plain text and hashed password
    const match = await bcrypt.compare(password, user.password)
    // if they don't match throw an error
    if (!match) {
    throw Error('Password incorrect')
    }
    // if they do match return the user
    return user
} 

module.exports = mongoose.model('User', userSchema)