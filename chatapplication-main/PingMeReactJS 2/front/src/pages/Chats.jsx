import React, { useEffect, useState } from 'react'
import { useContextState } from '../context/AuthContext'
import { useContextLoading } from '../context/LoadContext'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router'
import ChatList from '../components/ChatList'
import { Box, Stack } from '@mui/material'
import '../css/chats.css'
import ChatBox from '../components/ChatBox'
import getData from '../utils/getData'

const Chats = () => {

    const { loading, setLoading } = useContextLoading()
    const navigate = useNavigate()
    const { user } = useContextState()
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState({
        "lastMessage": {
            "senderUsername": "",
            "message": ""
        },
        "_id": "",
        "isGroupChat": false,
        "usernames": [
            "",
            ""
        ],
        "groupName": "",
        "timestamp": "",
        "__v": 0
    })

    useEffect(() => {
        if (!user.username)
            navigate('/')
        const jwt = localStorage.getItem('jwt')
        setLoading(true)
        getData('chats', { jwt }).then((data) => {
            setChats(data)
        })
        setTimeout(() => { setLoading(false) }, 350)
    }, [user, navigate])

    return (
        <Box >
            <NavBar props={{ chats, setChats }}/>
            <Stack className='mainContainer' direction='row' justifyContent='center' alignItems='center'>
                <Box className='chatList container'><ChatList chats={chats} currentChat={{ currentChat, setCurrentChat }} /></Box>
                <Box className='chatBox container'>{currentChat._id !== "" && <ChatBox currentChat={currentChat} user={user} />}</Box>
            </Stack>
        </Box>
    )
}

export default Chats
