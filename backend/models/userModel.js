const mongoose = require('mongoose')

const {createToken , compareBcrypt} = require('../utils/password')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: { 
    type: String,
  },
})


// static signup method
userSchema.statics.signup = async function(email, password) {

  const existing_user = await this.findOne({ email })

  if (existing_user) {
    throw Error('Email already in use') //redirect him to login
  }

  // create a token
  const user_token = createToken(email);

  const user = await this.create({ email, password ,token : user_token })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('User not existing! Please Register')
  }

  await compareBcrypt(password,user.password);

  // create a token
  const user_token = createToken(email);
  user.token = user_token;
  
  await user.save();

  return user
}

module.exports = mongoose.model('User', userSchema)