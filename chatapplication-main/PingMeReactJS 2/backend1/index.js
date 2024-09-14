require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require('./config/MongoDB')
const userRouter = require('./routes/userRouter')
const chatRouter = require('./routes/chatRouter')
const PORT = process.env.PORT
const app = express()


const cors = require('cors')
connectToMongoDB()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/',userRouter)
app.use('/',chatRouter)

const server = app.listen(PORT, () => {
    console.log(`NodeJS Server running on https://127.0.0.1:${PORT}`);
})

const io = require('socket.io')(server,{
    pingTime:60000,
   cors:{
        origin:'http://localhost:3000'    }
})

 io.on('connection',(socket)=>{
     console.log("New User")
     socket.on("send-message",(mess)=>{
        console.log(mess)
     })
 })