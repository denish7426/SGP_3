import React from 'react';
import Login from '../pages/Login/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from '../pages/Register/register.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import RegisterCompany from '../pages/RegisterCompany/registerCompany.jsx';
import LandingPage from '../pages/LandingPage/LandingPage.jsx';
import CompanyLogin from '../pages/CompanyLogin/CompanyLogin.jsx';
import CompanyRegister from '../pages/CompanyRegister/CompanyRegister.jsx';
import EmployeeLogin from '../pages/EmployeeLogin/EmployeeLogin.jsx';
import EmployeeRegister from '../pages/EmployeeRegister/EmployeeRegister.jsx';
import CompanyDashboard from '../pages/CompanyDashboard/CompanyDashboard';
<<<<<<< HEAD
import MessagingPage from '../pages/Messaging/MessagingPage';
import MessagingNotification from './components/Messaging/MessagingNotification';
=======
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
>>>>>>> c9e738aed44d71ac6a96457f40761632120ab4a3

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registerCompany" element={<RegisterCompany />} />
        
        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/companyDashboard" element={<CompanyDashboard />} />
        
        {/* Employee Routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        
<<<<<<< HEAD
        {/* Messaging Route */}
        <Route path="/messages" element={<MessagingPage />} />
=======
                 {/* Admin Routes */}
         <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
>>>>>>> c9e738aed44d71ac6a96457f40761632120ab4a3
      </Routes>
      
      {/* Global Messaging Notification */}
      <MessagingNotification />
    </Router>
  );
}

export default App
