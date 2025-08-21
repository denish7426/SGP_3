import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/loginCompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and company data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.company));
        localStorage.setItem('userType', 'company');
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check if the backend is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/company/register');
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[900px] rounded-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToLanding}
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-[32px] font-bold text-[#111]">Company Login</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-[#333]">
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2575fc] hover:bg-[#1b5fd1] disabled:bg-[#ccc] text-white py-3 text-[16px] rounded-md mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                Don't have a company account?{' '}
                <a 
                  href="#" 
                  onClick={handleRegisterClick}
                  className="text-[#2575fc] underline cursor-pointer"
                >
                  Register Company
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
            <p className="text-gray-600">Access your company dashboard and manage your hiring process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin; 