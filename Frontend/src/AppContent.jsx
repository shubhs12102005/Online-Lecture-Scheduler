import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Dashboard from './Components/Pages/Dashboard'
import MainLayout from './Components/Layout/MainLayout'
import Courses from './Components/Pages/Courses/Courses'

const AppContent = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<MainLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/courses' element={<Courses />} />
      </Route>
    </Routes>
  )
}

export default AppContent