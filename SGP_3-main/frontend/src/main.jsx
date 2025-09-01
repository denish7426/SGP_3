import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import ResumeList from '../pages/ResumeBuilder/ResumeList';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Route path="/resume-list" element={<ResumeList />} /> */}

  </StrictMode>,
)
