import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaArrowLeft, FaUserTie, FaChevronDown } from 'react-icons/fa'; // FaUserTie for employee icon, FaChevronDown for dropdown

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    currentRole: '',
    yearsOfExperience: '',
    skills: '',
    preferredDomains: '',
    resumeLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});

    // Convert skills and preferredDomains from strings to arrays
    const submitData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
      preferredDomains: formData.preferredDomains ? formData.preferredDomains.split(',').map(domain => domain.trim()) : [],
      yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : 0
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/registerEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          navigate('/employee/login');
        }, 2000);
      } else {
        if (data.errors) {
          setErrors(data.errors);
          setMessage({ type: 'error', text: 'Please correct the errors in the form.' });
        } else {
          setMessage({ type: 'error', text: data.message || 'Failed to register employee.' });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] flex items-center justify-center px-4 py-8 font-sans text-[#6B3226]">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[1200px] rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10 lg:p-12">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBackToLanding}
              className="text-[#6B3226] hover:text-[#B85D34] transition-colors duration-200 mr-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-4xl font-extrabold text-[#6B3226]">Register as Employee</h2>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-[#6B3226]">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="firstName" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'First Name'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="lastName" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Last Name'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="input-box relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="email" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Email'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="input-box relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="password" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Password'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="input-box relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="phoneNumber" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Phone Number'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Current Role */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="currentRole"
                  id="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.currentRole ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="currentRole" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Current Role'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.currentRole && <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>}
              </div>
            </div>

            {/* Years of Experience */}
            <div className="input-box relative">
              <input
                type="number"
                name="yearsOfExperience"
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder=" " // Important: Add a space as placeholder
                min="0"
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              />
              <label htmlFor="yearsOfExperience" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Years of Experience'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
            </div>

            {/* Skills */}
            <div className="input-box relative">
              <input
                type="text"
                name="skills"
                id="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder=" " // Important: Add a space as placeholder
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.skills ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              />
              <label htmlFor="skills" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Skills (comma-separated)'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            {/* Preferred Domains */}
            <div className="input-box relative">
              <input
                type="text"
                name="preferredDomains"
                id="preferredDomains"
                value={formData.preferredDomains}
                onChange={handleChange}
                placeholder=" " // Important: Add a space as placeholder
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.preferredDomains ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              />
              <label htmlFor="preferredDomains" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Preferred Domains (comma-separated)'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.preferredDomains && <p className="text-red-500 text-sm mt-1">{errors.preferredDomains}</p>}
            </div>

            {/* Resume Link */}
            <div className="input-box relative">
              <input
                type="url"
                name="resumeLink"
                id="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder=" " // Important: Add a space as placeholder
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.resumeLink ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              />
              <label htmlFor="resumeLink" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Resume Link (optional)'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>}
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B3226] hover:bg-opacity-90 disabled:bg-gray-400 text-[#FFE8B4] py-3 text-lg font-semibold rounded-xl mt-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
            >
              {loading ? 'Registering...' : 'Register as Employee'}
            </button>

            <div className="text-center text-sm mt-6">
              <p className="text-gray-700">
                Already have an employee account?{' '}
                <a
                  href="#"
                  onClick={() => navigate('/employee/login')}
                  className="text-[#B85D34] hover:text-[#6B3226] underline cursor-pointer font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white rounded-md p-1"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Right Panel (Image Section) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-[#B85D34] to-[#6B3226] p-8 lg:p-12 rounded-r-3xl text-white text-center">
          <div className="space-y-6">
            <div className="w-36 h-36 bg-[#FFE8B4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FaUserTie className="w-20 h-20 text-[#6B3226]" /> {/* Employee icon */}
            </div>
            <h3 className="text-3xl font-bold text-[#FFE8B4] mb-3">Join Our Network!</h3>
            <p className="text-[#FF9F4F] text-lg">Register your profile to discover new opportunities.</p>
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

export default EmployeeRegister;
