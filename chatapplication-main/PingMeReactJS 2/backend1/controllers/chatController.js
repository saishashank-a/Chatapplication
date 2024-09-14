const UserModel = require('../models/userModel')
const ChatModel = require('../models/chatModel')
const MessageModel = require('../models/messageModel')

const getChats = async (req, res) => {
    const { id } = req.body
    const { username } = await UserModel.findById(id)
    const chats = await ChatModel.find({ usernames: { $in: [username] } })
    res.status(200).json(chats)
}

const getChatDetails = async (req, res) => {
    UserModel.findById(req.body.id)
        .then(userData => {
            ChatModel.findById(req.body.chatId)
                .then((ChatData) => {
                    res.status(200).json(ChatData)
                })
        }).catch(err => console.log(err))
}

const postCreateChat = async (req, res) => {

    const { usernames, id } = req.body
    const creatorUser = await UserModel.findById(id)
    const creatorUsername = creatorUser.username
    usernames.forEach(async (username) => {
        const data = await UserModel.findOne({ username })
        if (!data) {
            res.status(200).json({ msg: `${username} doesn't exists!` }).send()
        }
    })
    if (usernames.length == 1) {
        if (
            await ChatModel.findOne({ usernames: [usernames[0], creatorUsername] }) ||
            await ChatModel.findOne({ usernames: [creatorUsername, usernames[0]] })
        )
            res.status(200).json({ msg: 'Chat Already Exists' })
        else {
            const chat = await ChatModel.create({ usernames: [creatorUsername, usernames[0]] })
            res.status(201).json({msg:'Chat created Successfully!'})
        }
    }
    else {
        const { groupName } = req.body
        usernames.push(creatorUsername)
        await ChatModel.create({ usernames, groupName, isGroupChat: true })
        res.status(201).json({ msg: 'group created successfully' })
    }
}

const postMessage = async (req, res) => {
    const senderId = req.body.id
    const senderData = await UserModel.findById(senderId)
    const senderUsername = senderData.username
    const { chatId, message } = req.body
    ChatModel.findById(chatId)
        .then(data => {
            MessageModel.create({ senderUsername, chatId, message })
                .then(messageData => { res.status(200).json(messageData) }).catch(e => console.log(e))
            ChatModel.findOneAndUpdate({ _id: chatId }, {
                lastMessage: {
                    senderUsername,
                    message
                }
            }).catch(err => { console.log(err) })
        })
        .catch(err => {
            console.log(err)
        })
}

const getMessages = (req, res) => {
    const { chatId } = req.body
    MessageModel.find({ chatId })
        .then((messages) => {
            res.status(200).json(messages)
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = { getChats, getChatDetails, postCreateChat, postMessage, getMessages }