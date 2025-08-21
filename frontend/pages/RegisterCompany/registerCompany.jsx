// src/components/CompanyRegistrationForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyRegistrationForm() {
    const navigate = useNavigate();
    // 1. State Management: Use useState to manage form input values.
    // Each input field will have its own state variable.
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

    // State for loading, success message, and error messages
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }
    const [errors, setErrors] = useState({}); // To store validation errors from backend

    // 2. Handle Input Changes: Update formData state as user types.
    // This function handles changes for all direct fields in formData.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    // This function handles changes for nested address fields.
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
        // Clear error for this field if it exists (for address fields, backend might return address.street etc.)
        if (errors[`address.${name}`]) {
            setErrors(prevErrors => ({ ...prevErrors, [`address.${name}`]: undefined }));
        }
    };

    // 3. Handle Form Submission: Send data to the backend.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission

        setLoading(true); // Show loading indicator
        setMessage(null); // Clear previous messages
        setErrors({}); // Clear previous errors

        try {
            // Use the correct backend API URL
            const response = await fetch('http://localhost:3000/api/auth/registerCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send formData as JSON
            });

            const data = await response.json();

            if (response.ok) { // Check if the response status is 2xx (e.g., 201 Created)
                setMessage({ type: 'success', text: data.message });
                setFormData({ // Reset form after successful submission
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
                // Redirect to login after successful registration
                setTimeout(() => {
                    navigate('/company/login');
                }, 2000);
            } else {
                // Handle backend validation errors or other server errors
                if (data.errors) {
                    // Backend sent specific validation errors
                    setErrors(data.errors);
                    setMessage({ type: 'error', text: 'Please correct the errors in the form.' });
                } else {
                    // Other errors (e.g., duplicate entry, server issues)
                    setMessage({ type: 'error', text: data.message || 'Failed to register company.' });
                }
                console.error('Error from backend:', data);
            }
        } catch (error) {
            // Handle network errors (e.g., server not reachable)
            console.error('Network error during company registration:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again later.' });
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    const handleBackToLanding = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <button
                            onClick={handleBackToLanding}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-4xl font-bold text-gray-900">Register Your Company</h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        Join DomaiNetHire and start connecting with talented professionals.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {message && (
                        <div className={`p-4 rounded-lg font-medium text-center mb-6 ${
                            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Basic Info */}
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
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Address Section */}
                        <div className="border border-gray-300 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Company Address</h3>
                            
                            <div className="mb-4">
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.address.street}
                                    onChange={handleAddressChange}
                                    placeholder="e.g., 123 Main Street"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                        errors['address.street'] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors['address.street'] && <p className="text-red-500 text-sm mt-1">{errors['address.street']}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.address.city}
                                        onChange={handleAddressChange}
                                        placeholder="e.g., Springfield"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                            errors['address.city'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors['address.city'] && <p className="text-red-500 text-sm mt-1">{errors['address.city']}</p>}
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                                        State/Province <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.address.state}
                                        onChange={handleAddressChange}
                                        placeholder="e.g., Illinois"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                            errors['address.state'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors['address.state'] && <p className="text-red-500 text-sm mt-1">{errors['address.state']}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                                        Postal Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.address.postalCode}
                                        onChange={handleAddressChange}
                                        placeholder="e.g., 62704"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                            errors['address.postalCode'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors['address.postalCode'] && <p className="text-red-500 text-sm mt-1">{errors['address.postalCode']}</p>}
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.address.country}
                                        onChange={handleAddressChange}
                                        placeholder="e.g., USA"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                            errors['address.country'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors['address.country'] && <p className="text-red-500 text-sm mt-1">{errors['address.country']}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
                                    placeholder="e.g., +1 123-456-7890"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </span>
                            ) : (
                                'Register Company'
                            )}
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
}

export default CompanyRegistrationForm;
