const User = require('../models/userModel');
const {passwordBcrypt} = require('../utils/password')

const signUpUserService = async (email,password) => {

    const hash = await passwordBcrypt(password);

    const user = await User.signup(email, hash);

    return user;
    
}

const logInUserService = async (email,password) => {

    const user = await User.login(email, password);

    return user;
    
}

module.exports = {signUpUserService ,logInUserService}