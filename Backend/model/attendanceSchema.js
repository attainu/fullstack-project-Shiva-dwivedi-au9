const mongoose = require('mongoose');
let AttendanceSchema = new mongoose.Schema({
  Attendence: [
    {
      
    }
  ]
})

mongoose.model('attendance', AttendanceSchema)
module.exports = mongoose.model('attendance')