const mongoose = require('mongoose');
let Taskmodal = new mongoose.Schema({
    Task_name: {
        type: String,
        required: true
      },
      Task_created_by: {
        type: String,
        required: true,
      },
      Department: {
        type: String,
        required: true
      },
      Status:{
        type:String,
        default : "Pending"
      },
      Deadline: {
        type: Number,
      },  
      Priority: {
        type: String,
      },
      Task_created_at: {
        type: Date,
        default: Date.now
      },
      Remark:{
        type:String
      },
      id:{
        type:Number,
        default: Math.random() * (2000 - 10) + 10
      },
      Task_completed_by:{
        type:String
      }

})

mongoose.model('task', Taskmodal)
module.exports = mongoose.model('task')