import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppContent from './AppContent'

function App() {

  return (
    <>
      <div className='min-h-screen bg-gray-200'>
        <div className=' mx-auto'>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
