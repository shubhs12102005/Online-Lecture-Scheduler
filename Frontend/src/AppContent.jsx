import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Dashboard from './Components/Pages/Dashboard'
import MainLayout from './Components/Layout/MainLayout'
import Courses from './Components/Pages/Courses/Courses'
import AddCourse from './Components/Pages/Courses/AddCourse'
import Lectures from './Components/Pages/Lectures/Lectures'
import AddLecture from './Components/Pages/Lectures/AddLecture'
import Instructors from './Components/Pages/Instructors/Instructors'

const AppContent = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/add-course' element={<AddCourse />} />
        <Route path='/courses/edit-course/:id' element={<AddCourse />} />
        
        <Route path='/courses/:id/lectures' element={<Lectures />} />
        <Route path='/courses/:id/lectures/add-lecture' element={<AddLecture />} />
        <Route path='/courses/:id/lectures/edit-lecture/:lecId' element={<AddLecture />} />

        <Route path='/instructors' element={<Instructors />} />
        <Route path='/instructors/add-instructor' element={<Register />} />

      </Route>
    </Routes>
  )
}

export default AppContent