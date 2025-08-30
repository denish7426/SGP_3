import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaArrowLeft, FaUserTie } from 'react-icons/fa'; // FaUserTie for employee icon

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
        localStorage.setItem('employeeId', data.employee.id);
        console.log(data.employee.id)
        
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
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] flex items-center justify-center px-4 py-8 font-sans text-[#6B3226]">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[900px] rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10 lg:p-12">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBackToLanding}
              className="text-[#6B3226] hover:text-[#B85D34] transition-colors duration-200 mr-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-4xl font-extrabold text-[#6B3226]">Employee Login</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-[#6B3226]">
            {/* Email Input Field with Animation */}
            <div className="input-box relative">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder=" " // Important: Add a space as placeholder for the :not(:placeholder-shown) to work
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="email" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Your Email'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            {/* Password Input Field with Animation */}
            <div className="input-box relative">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder=" " // Important: Add a space as placeholder
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="password" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Password'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B3226] hover:bg-opacity-90 disabled:bg-gray-400 text-[#FFE8B4] py-3 text-lg font-semibold rounded-xl mt-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center text-sm mt-6">
              <p className="text-gray-700">
                Don't have an employee account?{' '}
                <a
                  href="#"
                  onClick={handleRegisterClick}
                  className="text-[#B85D34] hover:text-[#6B3226] underline cursor-pointer font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white rounded-md p-1"
                >
                  Register as Employee
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section (Right Panel) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-[#B85D34] to-[#6B3226] p-8 lg:p-12 rounded-r-3xl text-white text-center">
          <div className="space-y-6">
            <div className="w-36 h-36 bg-[#FFE8B4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FaUserTie className="w-20 h-20 text-[#6B3226]" /> {/* Employee icon */}
            </div>
            <h3 className="text-3xl font-bold text-[#FFE8B4] mb-3">Welcome Back!</h3>
            <p className="text-[#FF9F4F] text-lg">Access your profile and discover new opportunities.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Input Field Label Animation */}
      <style>{`
        .input-box .input:focus,
        .input-box .input:not(:placeholder-shown) {
            border-color: #B85D34; /* Burnt Sienna on focus */
        }
        .input-box .label {
            color: #999; /* Default label color */
            font-size: 16px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 15px;
            top: 12px;
            display: flex;
            transition: all .2s ease;
        }
        .input-box .char {
            transition: .2s ease all;
            transition-delay: calc(var(--index) * .05s);
        }
        .input-box .input:focus~label .char,
        .input-box .input:not(:placeholder-shown)~label .char {
            transform: translateY(-28px); /* Adjusted for larger padding */
            font-size: 14px;
            color: #6B3226; /* Dark Cognac on focus/valid */
            background: white; /* Match input background */
            padding: 0 5px;
            border-radius: 5px;
            z-index: 1;
        }
        /* Adjust label position when input is focused/valid to prevent overlap with input border */
        .input-box .input:focus~label,
        .input-box .input:not(:placeholder-shown)~label {
            left: 10px; /* Adjust left position slightly */
            top: -5px; /* Move label up */
        }
      `}</style>
    </div>
  );
};

export default EmployeeLogin;
