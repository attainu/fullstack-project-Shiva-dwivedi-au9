const mongoose = require('mongoose');
let leavemodal = new mongoose.Schema({
    role: {
        type: String,
      },
    leaves:{
       type:Number
    }
     
})

mongoose.model('leave', leavemodal)
module.exports = mongoose.model('leave')