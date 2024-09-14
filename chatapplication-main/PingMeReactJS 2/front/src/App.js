import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import HomePage from './pages/HomePage'
import Chats from './pages/Chats.jsx'
import { LinearProgress } from '@mui/material'
import { useContextLoading } from './context/LoadContext'

const App = () => {
  const { loading } = useContextLoading()

  return (
    <>
      <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden', mb: '-5px' }} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chats' element={<Chats />} />
      </Routes>
    </>
  )
}

export default App
