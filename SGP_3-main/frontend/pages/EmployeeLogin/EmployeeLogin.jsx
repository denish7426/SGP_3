import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
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
      const response = await fetch('http://localhost:3000/api/auth/loginEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and employee data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.employee));
        localStorage.setItem('userType', 'employee');
        
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
    navigate('/employee/register');
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
              className="text-purple-600 hover:text-purple-800 mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-[32px] font-bold text-[#111]">Employee Login</h2>
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
              placeholder="Your Email"
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
              className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-[#ccc] text-white py-3 text-[16px] rounded-md mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                Don't have an employee account?{' '}
                <a 
                  href="#" 
                  onClick={handleRegisterClick}
                  className="text-[#8b5cf6] underline cursor-pointer"
                >
                  Register as Employee
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
            <p className="text-gray-600">Access your profile and discover new opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin; 