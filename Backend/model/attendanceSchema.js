const mongoose = require('mongoose');
let AttendanceSchema = new mongoose.Schema({

  employee_name:{
    type:String,
    requred:true
  },
  employee_email:{
      type:String,
      requred:true
  },
  employee_role:{
    type:String,
    requred:true
  },
  Attendence: [
   
  ]
})

mongoose.model('attendance', AttendanceSchema)
module.exports = mongoose.model('attendance')