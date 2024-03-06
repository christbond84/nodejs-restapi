const mongoose = require('mongoose')
mongoose.set('strictQuery',true)

const connectDB = (uri) => {
  mongoose.connect(uri)
  console.log('Connected to DB....')
}

module.exports = connectDB
