import React from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaBuilding, FaUserTie } from 'react-icons/fa'; // Using FaBuilding for company and FaUserTie for employee

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate('/company/login');
  };

  const handleEmployeeClick = () => {
    navigate('/employee/login');
  };

  // Custom animation classes
  const fadeIn = "animate-fadeIn";
  const slideInUp = "animate-slideInUp";

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] flex items-center justify-center px-4 py-12 font-sans text-[#6B3226] antialiased">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className={`text-center mb-16 ${fadeIn}`}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#6E291B] mb-4 drop-shadow-md">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B3226] to-[#B85D34]">DomaiNetHire</span>
          </h1>
          <p className="text-xl md:text-2xl  text-[#551C11] opacity-80 max-w-3xl mx-auto leading-relaxed font-medium"> {/* Changed color and added opacity/font-medium */}
            Connect talented professionals with innovative companies. Choose your path to get started.
          </p>
        </div>

        {/* Main Content - Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Company Card */}
          <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 transform hover:-translate-y-3 transition-all duration-300 ease-in-out group ${slideInUp}`}>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#FFE8B4] rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#6B3226] shadow-lg group-hover:border-[#B85D34] transition-colors duration-300">
                <FaBuilding className="w-12 h-12 text-[#6B3226] group-hover:text-[#B85D34] transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-[#6B3226] mb-4 group-hover:text-[#B85D34] transition-colors duration-300">I'm a Company</h2>
              <p className="text-gray-700 mb-10 leading-relaxed text-base">
                Looking for talented professionals? Post jobs, find candidates, and grow your team with our platform.
              </p>
              <button
                onClick={handleCompanyClick}
                className="w-full bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] font-semibold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              >
                Get Started as Company
              </button>
            </div>
          </div>

          {/* Employee Card */}
          <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 transform hover:-translate-y-3 transition-all duration-300 ease-in-out group ${slideInUp} delay-100`}>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#FFE8B4] rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#6B3226] shadow-lg group-hover:border-[#B85D34] transition-colors duration-300">
                <FaUserTie className="w-12 h-12 text-[#6B3226] group-hover:text-[#B85D34] transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-[#6B3226] mb-4 group-hover:text-[#B85D34] transition-colors duration-300">I'm an Employee</h2>
              <p className="text-gray-700 mb-10 leading-relaxed text-base">
                Ready to find your next opportunity? Discover jobs, showcase your skills, and advance your career.
              </p>
              <button
                onClick={handleEmployeeClick}
                className="w-full bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] font-semibold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              >
                Get Started as Employee
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-16 ${fadeIn} delay-200`}>
          <p className="text-[#6B3226] opacity-90 mb-4 text-lg font-medium"> {/* Changed color and added opacity/font-medium */}
            Already have an account?{' '}
            <a href="#" className="text-[#B85D34] hover:text-[#FF9F4F] underline font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white rounded-md p-1"> {/* Refined hover/focus */}
              Contact support
            </a>
          </p>
          <div className="border-t border-gray-300 pt-6 mt-6">
            <a
              href="/admin/login"
              className="text-base text-[#B85D34] hover:text-[#6B3226] transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white rounded-md p-1" /* Refined hover/focus */
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.7s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default LandingPage;
