const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    senderUsername:{
        type:String,
        required:true
    },
    chatId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    message:{
        type:String, 
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const MessageModel = new mongoose.model('message',messageSchema)

module.exports = MessageModel