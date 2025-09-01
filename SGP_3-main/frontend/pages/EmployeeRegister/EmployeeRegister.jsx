import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Register as Employee</h1>
          <p className="text-xl text-gray-600">Join DomaiNetHire and discover amazing opportunities.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {message && (
            <div className={`p-4 rounded-lg font-medium text-center mb-6 ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-black text-lg font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g., John"
                  className={`w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g., Doe"
                  className={`w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., john.doe@email.com"
                  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g., +1 123-456-7890"
                  className={`w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Current Role</label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                  className={`w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                    errors.currentRole ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.currentRole && <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g., 3"
                min="0"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                  errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js, Python"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                  errors.skills ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Preferred Domains (comma-separated)</label>
              <input
                type="text"
                name="preferredDomains"
                value={formData.preferredDomains}
                onChange={handleChange}
                placeholder="e.g., Web Development, Mobile Apps, Data Science"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                  errors.preferredDomains ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preferredDomains && <p className="text-red-500 text-sm mt-1">{errors.preferredDomains}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Resume Link (optional)</label>
              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="e.g., https://drive.google.com/your-resume"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                  errors.resumeLink ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register as Employee'}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                Already have an employee account?{' '}
                <a 
                  href="#" 
                  onClick={() => navigate('/employee/login')}
                  className="text-purple-600 underline cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister; 