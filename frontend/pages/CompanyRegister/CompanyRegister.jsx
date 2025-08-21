import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    password: '',
    website: '',
    industry: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    contactEmail: '',
    phoneNumber: ''
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

  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
    if (errors[`address.${name}`]) {
      setErrors(prevErrors => ({ ...prevErrors, [`address.${name}`]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});

    try {
      const response = await fetch('http://localhost:3000/api/auth/registerCompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          navigate('/company/login');
        }, 2000);
      } else {
        if (data.errors) {
          setErrors(data.errors);
          setMessage({ type: 'error', text: 'Please correct the errors in the form.' });
        } else {
          setMessage({ type: 'error', text: data.message || 'Failed to register company.' });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900">Register Your Company</h1>
          <p className="text-xl text-gray-600">Join DomaiNetHire and start connecting with talented professionals.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2">Street</label>
    <input
      type="text"
      name="street"
      value={formData.address.street}
      onChange={handleAddressChange}
      placeholder="Street address"
      className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2">City</label>
    <input
      type="text"
      name="city"
      value={formData.address.city}
      onChange={handleAddressChange}
      placeholder="City"
      className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2">State</label>
    <input
      type="text"
      name="state"
      value={formData.address.state}
      onChange={handleAddressChange}
      placeholder="State"
      className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2">Postal Code</label>
    <input
      type="text"
      name="postalCode"
      value={formData.address.postalCode}
      onChange={handleAddressChange}
      placeholder="Postal Code"
      className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-2">Country</label>
    <input
      type="text"
      name="country"
      value={formData.address.country}
      onChange={handleAddressChange}
      placeholder="Country"
      className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., Global Tech Innovations"
                  className={`w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
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
                  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g., https://www.globaltech.com"
                  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                    errors.website ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select an Industry</option>
                  <option value="IT and Software">IT and Software</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Aerospace & Defense">Aerospace & Defense</option>
                  <option value="Media & Entertainment">Media & Entertainment</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Company Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Briefly describe your company, its mission, and what it does. Max 500 characters."
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g., info@globaltech.com"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., +91 1234567890"
                className={`w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Company'}
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                Already have a company account?{' '}
                <a 
                  href="#" 
                  onClick={() => navigate('/company/login')}
                  className="text-blue-600 underline cursor-pointer"
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

export default CompanyRegister; 