const mongoose = require('mongoose');
let Announcementschema = new mongoose.Schema({
    Announcement_Subject: {
        type: String,
      },
      Announcement: {
        type: String,
      },
      Announcement_created_by:{
        type: String,
      },
      Announcement_created_at: {
        type: Date,
        default : Date.now
    },
})

mongoose.model('Announcement', Announcementschema)
module.exports = mongoose.model('Announcement')