import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate('/company/login');
  };

  const handleEmployeeClick = () => {
    navigate('/employee/login');
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">DomaiNetHire</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect talented professionals with innovative companies. Choose your path to get started.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Company Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">I'm a Company</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Looking for talented professionals? Post jobs, find candidates, and grow your team with our platform.
              </p>
              <button
                onClick={handleCompanyClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started as Company
              </button>
            </div>
          </div>

          {/* Employee Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">I'm an Employee</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ready to find your next opportunity? Discover jobs, showcase your skills, and advance your career.
              </p>
              <button
                onClick={handleEmployeeClick}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started as Employee
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Already have an account?{' '}
            <span className="text-blue-600 font-medium">Contact support</span>
          </p>
                     <div className="border-t border-gray-200 pt-4">
             <div className="flex flex-col space-y-2">
               <a
                 href="/admin/login"
                 className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200"
               >
                 Admin Login
               </a>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 