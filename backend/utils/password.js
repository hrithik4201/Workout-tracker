const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../common/config')

exports.passwordBcrypt = async (password) => {

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash;
}

exports.createToken = (email) => {
    return jwt.sign({ email }, config.jwtSecret, { expiresIn: '3d' });
};


exports.compareBcrypt = async (password,userPassword) => {

  const match = await bcrypt.compare(password, userPassword)
  if (!match) {
    throw Error('Incorrect password')
  }

  return match;
}
