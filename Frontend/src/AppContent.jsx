import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Dashboard from './Components/Pages/dashboard'

const AppContent = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default AppContent