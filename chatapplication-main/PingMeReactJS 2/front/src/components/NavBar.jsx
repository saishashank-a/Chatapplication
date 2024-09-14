import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Avatar,Alert, Snackbar } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Search, SearchIconWrapper, StyledInputBase } from './miscallaneous'
import Circle from '@mui/icons-material/Circle'
import { useContextState } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import postData from '../utils/postData'

const NavBar = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const { user: { username }, setUser } = useContextState()
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const navigate = useNavigate()
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('This is a snackBar')
    const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); }
    const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null) }
    const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose() }
    const handleMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget) }
    const logout = () => { setUser({}); navigate('/'); localStorage.removeItem('jwt') }
    const menuId = 'primary-search-account-menu'
    const [searchQuery, setSearchQuery] = useState('')
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    )

    const closeSnackBar = ()=>{
        setSnackBarOpen(false)
    }

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    )

    const addUser = (e) => {
        e.preventDefault();
        postData('POST', 'createChat', {
            jwt: localStorage.getItem('jwt'),
            usernames: [`${searchQuery}`]
        }).then((data) => {
            console.log(data)
            setSnackBarMessage(`${data.msg}`)
            setSnackBarOpen(true)
        })
            .catch(err => { console.log(err) })
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity={'error'}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        PingMe
                        <Circle sx={{ height: '8px', ml: '-7px' }} />
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form onSubmit={addUser}>
                            <StyledInputBase placeholder="Find pingers" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} inputProps={{ 'aria-label': 'search' }} />
                        </form>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <Avatar sx={{ height: '32px', width: '32px' }} alt="Shashank Desai" src={`http://localhost:8000/profilePicture/${username}`} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
}

export default NavBar