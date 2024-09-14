import { Box } from '@mui/material'
import React from 'react'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg'

const Messages = ({ chatMessages, user: { username }, currentChat }) => {
    const { usernames, isGroupChat, groupName } = currentChat
    const chatName = isGroupChat ? groupName : (username == usernames[0] ? usernames[1] : usernames[0])

    return (
        <Box sx={{ height: '77%', overflowY: 'scroll', overflowX: 'hidden' }} className='list'>

            {chatMessages.map(chatMessage => {
                return <ChatMsg
                    avatar={chatMessage.senderUsername!==username && `/profilePicture/${chatName}`}
                    side={chatMessage.senderUsername==username?'right':'left'}
                    messages={[
                        chatMessage.message
                    ]}
                />
            })}
        </Box>
    )
}

export default Messages
