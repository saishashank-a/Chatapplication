import React, { useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Signinup from '../components/Signinup'
import { useContextState } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const HomePage = () => {

    const { user } = useContextState()
    const navigate = useNavigate()
    useEffect(() => {
        if (user.username)
            navigate('/chats')
    }, [user,navigate])

    return (
        <>
            <Stack direction={{ xs: 'row', sm: 'column', md: 'row' }}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'primary.dark', height: '100vh', width: '50vw' }}>
                    <Typography variant='h1' sx={{ color: 'white', mb: '20px' }}>PingMe<CircleIcon /></Typography>
                    <img src="https://sbr-technologies.com/wp-content/uploads/2021/06/mern.png" height="70px" alt="" />
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'white', height: '100vh', width: '50vw' }}>
                    <Signinup />
                </Box>
            </Stack>
        </>
    );
}

export default HomePage