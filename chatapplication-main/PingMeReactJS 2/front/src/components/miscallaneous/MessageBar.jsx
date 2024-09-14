import { Box, Button, FormControl, OutlinedInput, Stack } from '@mui/material'
import React, { useState } from 'react'
import postData from '../../utils/postData'

const MessageInput = (currentChat) => {
    const [message, setMessage] = useState('')
    
    const sendMessage = (e)=>{
        e.preventDefault()
        setMessage('')
        postData('POST','sendMessage',{
            jwt:localStorage.getItem('jwt'),
            chatId:currentChat.currentChat._id,
            message
        })
    }

    return (
        <>
            <Box>
                <form noValidate onSubmit={sendMessage} autoComplete="off">
                    <FormControl sx={{ width: '100%' }}>
                        <Stack direction='row'>
                            <OutlinedInput sx={{ width: '85%', display: 'inline' }} value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Type a message... 🤌" />
                            <Button sx={{ display: 'inline', width: '10%', ml: '5%' }} disabled={!message} type='submit' variant="contained" size="large">Send</Button>
                        </Stack>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}

export default MessageInput
