const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    isGroupChat:{
        type:Boolean,
        default:false,
    },
    usernames: [String],
    groupName:{
        type:String,
        default:''
    },
    lastMessage:{
        senderUsername:{type:String,default:''},
        message:{type:String,default:''}
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const Chat = new mongoose.model('chat',ChatSchema)

module.exports = Chat