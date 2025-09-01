import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please check if the backend is running on http://localhost:3000 and MongoDB is connected.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[900px] rounded-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10">
          <h2 className="text-[32px] font-bold mb-[25px] text-[#111]">Sign up</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-[#333]">
            <input
              type="text"
              name="username"
              placeholder="Your Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />

            <label className="text-[13px] mt-2 block">
              <input type="checkbox" className="mr-2" required />
              I agree all statements in{' '}
              <a href="#" className="text-[#2575fc] underline">
                Terms of service
              </a>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2575fc] hover:bg-[#1b5fd1] disabled:bg-[#ccc] text-white py-3 text-[16px] rounded-md mt-2"
            >
              {loading ? 'Creating Account...' : 'Submit'}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                I am already member{' '}
                <a 
                  href="#" 
                  onClick={handleLoginClick}
                  className="text-[#333] underline cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-white p-8">
          <img
            src="download.jpg"
            alt="Sign up illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
