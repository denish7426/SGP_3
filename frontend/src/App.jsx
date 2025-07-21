import { useState } from 'react'
import Login from '../pages/Login/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Signup from '../pages/Register/register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
   
    </>
  )
}

export default App
