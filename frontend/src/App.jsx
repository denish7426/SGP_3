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

import MessagingPage from '../pages/Messaging/MessagingPage';
import MessagingNotification from './components/Messaging/MessagingNotification';

import AdminLogin from '../pages/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import EmployeeOnboarding from '../pages/Onboarding/EmployeeOnboarding.jsx';
import EmployeeJobFeed from '../pages/Jobs/EmployeeJobFeed.jsx';
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile.jsx';
import PostJob from '../pages/CompanyDashboard/PostJob.jsx';
import ApplicantsList from '../pages/CompanyDashboard/ApplicantsList.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';

// Resume Builder Components
import ResumeBuilder from '../pages/ResumeBuilder/ResumeBuilder.jsx';
import ResumePreview from '../pages/ResumeBuilder/ResumePreview.jsx';
import ResumeList from '../pages/ResumeBuilder/ResumeList.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registerCompany" element={<RegisterCompany />} />
        
        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/companyDashboard" element={<CompanyDashboard />} />
        {/* <Route path="/company" element={<CompanyDashboard />} /> */}
        <Route path="/company/post-job" element={<PostJob />} />
        <Route path="/companyDashboard/applicants/:jobId" element={<ApplicantsList />} />
        
        {/* Employee Routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/onboarding" element={<EmployeeOnboarding />} />
        <Route path="/jobs" element={<EmployeeJobFeed />} />
        <Route path="/company/:id" element={<CompanyProfile />} />
        

        {/* Messaging Route */}
        <Route path="/messages" element={<MessagingPage />} />

                 {/* Admin Routes */}
         <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Resume Builder Routes */}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
        <Route path="/my-resumes" element={<ResumeList />} />

      </Routes>
      
      {/* Global Messaging Notification */}
      <MessagingNotification />
    </Router>
  );
}

export default App
