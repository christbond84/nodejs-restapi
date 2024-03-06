const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  company:{
    type:String,
    required:[true,'Company name is required'],
    maxlength:50    
    },
  position:{
    type:String,
    required:[true,'Job position is required'],
    maxlength:100
  },
  status:{
    type:String,
    enum:['interview','declined','pending','accepted'],
    default:'pending'
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    required:[true,'created by Id is required']
  }  
},{timestamps:true})

module.exports = mongoose.model('Job',jobSchema)