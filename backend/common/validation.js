const validator = require('validator')

exports.validateSignUpUserData = (email,password) => {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
    throw Error('Email not valid')
    }

    if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
    }
}

exports.validateLogInUserData = (email,password) => {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
}