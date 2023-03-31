const mongoose = require('mongoose')

const MesssageSchema = new mongoose.Schema({
    content: String,
    from: Object,
    socketid: String,
    time: String,
    date: String,
    to: String
})

const Message = mongoose.model('Message', MesssageSchema)

module.exports = Message