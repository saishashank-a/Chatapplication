import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Tab, Tabs, TextField, Stack, Button, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useContextState } from '../context/AuthContext';
import { useContextLoading } from '../context/LoadContext';
import postData from '../utils/postData'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export default function Signinup() {
    const [value, setValue] = useState(0);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [file, setFile] = useState()
    const [snackBarMessage, setSnackBarMessage] = useState('This is a snackBar')
    const { setUser } = useContextState()
    const { loading, setLoading } = useContextLoading()
    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const closeSnackBar = () => {
        setSnackBarOpen(false)
    }

    const uploadProfilePicture = async () => {
        if (file) {
            const formData = new FormData()
            formData.append('profilePicture', file)
            formData.append('username', username)
            try {
                fetch('http://localhost:8000/uploadProfilePicture', { method: 'POST', body: formData })
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!username || !password) {
            setSnackBarOpen(true)
            setSnackBarMessage('Username and password fields cannot be empty')
            return
        }
        else if (value === 0) {
            setLoading(true)
            postData('POST', 'signin', { username, password, email })
                .then(async data => {
                    if (data.jwt) {
                        await localStorage.setItem('jwt', data.jwt)
                        const fetchData = await postData('POST', 'user', { jwt: localStorage.getItem('jwt') })
                        setUser({ username: fetchData.username })
                        navigate('/chats')
                    }
                    else {
                        setSnackBarOpen(true)
                        setSnackBarMessage(data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            setTimeout(() => { setLoading(false) }, 350)
        }
        else {
            setLoading(true)
            postData('POST', 'signup', { email, username, password })
                .then(data => {
                    if (data.ok) {
                        setSnackBarOpen(true)
                        setSnackBarMessage("Account successfully Created!")
                        setValue(0)
                        uploadProfilePicture()
                    }
                    else {
                        setSnackBarOpen(true)
                        if (data.code === 11000) {
                            setSnackBarMessage("User with the same username/email already exists")
                        }
                        else if (data.errors.email) {
                            setSnackBarMessage(data.errors.email.message)
                        }
                        else if (data.errors.username) {
                            setSnackBarMessage(data.errors.username.message)
                        }
                        else if (data.errors.password) {
                            setSnackBarMessage(data.errors.password.message)
                        }
                    }
                }
                )
                .catch(err => {
                    console.log(err)
                })
            setTimeout(() => { setLoading(false) }, 350)
        }
    }
    return (
        <Box sx={{ width: '50%' }}>
            <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity={'error'}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="sign in" sx={{ width: '50%' }} />
                    <Tab label="register" sx={{ width: '50%' }} />
                </Tabs>
            </Box>
            <Stack direction='column'>
                <form onSubmit={handleSubmit}>
                    <Stack sx={{ height: '400px' }} direction='column' justifyContent='center' alignItems='center'>
                        {value === 1 && <TextField label="Email" variant="filled" onChange={(e) => { setEmail(e.target.value) }} sx={{ width: '80%', mt: '100px', mb: '20px' }} />}
                        <TextField label="Username" variant="filled" onChange={(e) => { setUsername(e.target.value) }} sx={{ width: '80%', mb: '20px' }} />
                        <TextField label="Password" type='password' variant="filled" onChange={(e) => { setPassword(e.target.value) }} sx={{ width: '80%', mb: '20px' }} />
                        <Box sx={{ width: '90%', marginLeft: 'auto', mt: '10px' }}>{value === 1 &&
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload File
                                <VisuallyHiddenInput type='file' name='profilePicture' onChange={(e) => { setFile(e.target.files[0]) }} />
                            </Button>
                        }</Box>
                        <Box sx={{ width: '90%', marginLeft: 'auto', mt: '30px' }}><Button variant='contained' type='submit' disabled={loading} sx={{ width: '100px' }}>{`${value === 0 ? 'sign in' : 'register'}`}</Button></Box>
                    </Stack>
                </form>
            </Stack>
        </Box>
    )
}