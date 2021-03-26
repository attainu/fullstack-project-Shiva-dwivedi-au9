const mongoose = require('mongoose');
let AttendanceSchema = new mongoose.Schema({
    employee_name: {
        type: String,
        required: true
      },
      employee_email: {
        type: String,
        required: true
      },
      employee_role: {
        type: String,
        required: true
      },
      employee_division:{
        type: String,
        required:true
      },
      Attendence_marked_at: {
        type: Date,
        default: Date.now
      }
})

mongoose.model('attendance', AttendanceSchema)
module.exports = mongoose.model('attendance')