const mongoose = require('mongoose');
let empleave = new mongoose.Schema({

    Employee_name: {
        type: String,
        required : true
      },

      Employee_division: {
        type: String,
        required : true
      },

      Employee_department : {
        type: String,
        required : true
      },
     
      Reason_for_leave:{
        type : String,
        required: true
      },

      Leave_from :{
          type:Date,
          required : true
      },

      Leave_to : {
          type: Date,
          required : true
      },

      User_id : {
        type : String
      },
      
      Leave_status:{
          type : String,
          default : "Pending"
      }
})

mongoose.model('emleave', empleave)
module.exports = mongoose.model('emleave')