const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication failed')

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // const user =await  User.findById(payload.userId).select('-password')   
    // req.user = user
    req.user = { userId: payload.userId, name: payload.name}    
    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication failed')
  }
}

module.exports = authUser