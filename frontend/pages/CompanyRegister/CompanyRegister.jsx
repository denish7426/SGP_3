import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa'; // Import FaArrowLeft and FaChevronDown for the back button and dropdown

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
            <h2 className="text-4xl font-extrabold text-[#6B3226]">Register Company</h2>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-[#6B3226]">
            {/* Company Name */}
            <div className="input-box relative">
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder=" " // Important: Add a space as placeholder for the :not(:placeholder-shown) to work
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              />
              <label htmlFor="companyName" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Company Name'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
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

            {/* Website & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-box relative">
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.website ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="website" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Website URL'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
              </div>

              <div className="relative custom-select-wrapper group"> {/* Industry Select */}
                <select
                  name="industry"
                  id="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className={`block appearance-none w-full bg-white border-2 ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  } text-[#6B3226] py-3 pl-5 pr-10 rounded-xl leading-tight focus:outline-none text-base transition-all duration-200 ease-in-out shadow-sm cursor-pointer
                             group-hover:border-[#B85D34] focus:border-[#6B3226] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] focus:shadow-lg hover:shadow-lg`}
                >
                  <option value="" disabled>Select an Industry</option>
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6B3226] transition-transform duration-200 transform group-hover:rotate-180 group-focus-within:rotate-180">
                  <FaChevronDown className="h-5 w-5" />
                </div>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
            </div>

            {/* Company Description */}
            <div className="input-box relative">
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                placeholder=" " // Important: Add a space as placeholder
                maxLength="500"
                className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
              ></textarea>
              <label htmlFor="description" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Company Description (Max 500 chars)'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Address Fields */}
            <h3 className="text-2xl font-bold text-[#6B3226] border-b border-gray-200 pb-2 mt-8 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Street */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors['address.street'] ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="street" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Street Address'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors['address.street'] && <p className="text-red-500 text-sm mt-1">{errors['address.street']}</p>}
              </div>
              {/* City */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors['address.city'] ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="city" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'City'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors['address.city'] && <p className="text-red-500 text-sm mt-1">{errors['address.city']}</p>}
              </div>
              {/* State */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors['address.state'] ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="state" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'State / Province'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors['address.state'] && <p className="text-red-500 text-sm mt-1">{errors['address.state']}</p>}
              </div>
              {/* Postal Code */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleAddressChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors['address.postalCode'] ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="postalCode" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Postal Code'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors['address.postalCode'] && <p className="text-red-500 text-sm mt-1">{errors['address.postalCode']}</p>}
              </div>
              {/* Country */}
              <div className="input-box relative">
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors['address.country'] ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="country" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Country'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors['address.country'] && <p className="text-red-500 text-sm mt-1">{errors['address.country']}</p>}
              </div>
            </div>

            {/* Contact Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Email */}
              <div className="input-box relative">
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  placeholder=" " // Important: Add a space as placeholder
                  className={`input text-base outline-none p-3 block w-full rounded-xl border-2 ${
                    errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                  } bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]`}
                />
                <label htmlFor="contactEmail" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                  {'Contact Email'.split('').map((char, index) => (
                    <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </label>
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B3226] hover:bg-opacity-90 disabled:bg-gray-400 text-[#FFE8B4] py-3 text-lg font-semibold rounded-xl mt-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
            >
              {loading ? 'Registering...' : 'Register Company'}
            </button>

            <div className="text-center text-sm mt-6">
              <p className="text-gray-700">
                Already have a company account?{' '}
                <a
                  href="#"
                  onClick={() => navigate('/company/login')}
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
              <svg className="w-20 h-20 text-[#6B3226]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1  0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-[#FFE8B4] mb-3">Join Our Network!</h3>
            <p className="text-[#FF9F4F] text-lg">Register your company to connect with top talent and streamline your hiring.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Input Field Label Animation */}
      <style>{`
        .input-box .input:focus,
        .input-box .input:not(:placeholder-shown) { /* Corrected: Apply style when not showing placeholder */
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
            transition: all .2s ease; /* Smooth transition for the label itself */
        }
        .input-box .char {
            transition: .2s ease all;
            transition-delay: calc(var(--index) * .05s);
        }
        .input-box .input:focus~label .char,
        .input-box .input:not(:placeholder-shown)~label .char { /* Corrected: Apply style when not showing placeholder */
            transform: translateY(-28px); /* Adjusted for larger padding */
            font-size: 14px;
            color: #6B3226; /* Dark Cognac on focus/valid */
            background: white; /* Match input background */
            padding: 0 5px; /* Padding for background effect */
            border-radius: 5px;
            z-index: 1; /* Ensure label is above input border */
        }
        /* Adjust label position when input is focused/valid to prevent overlap with input border */
        .input-box .input:focus~label,
        .input-box .input:not(:placeholder-shown)~label { /* Corrected: Apply style when not showing placeholder */
            left: 10px; /* Adjust left position slightly */
            top: -5px; /* Move label up */
        }

        /* Styling for select dropdown to match input fields */
        select.input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B3226'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem; /* Make space for the custom arrow */
        }
      `}</style>
    </div>
  );
};

export default CompanyRegister;
