import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaComments, FaSignOutAlt, FaBriefcase, FaUserCircle, FaChartLine, FaCalendarAlt, FaCheckCircle, FaAward } from 'react-icons/fa'; // Added more icons for dashboard features

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom animation classes
  const fadeIn = "animate-fadeIn";
  const slideInUp = "animate-slideInUp";

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const type = localStorage.getItem('userType');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      setUserType(type);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] font-sans text-[#6B3226]">
        <div className="text-2xl font-semibold animate-pulse text-[#6B3226]">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] font-sans text-[#6B3226] antialiased">
      {/* Header */}
      <header className="bg-white shadow-xl sticky top-0 z-10 border-b-4 border-[#6B3226]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className={`text-4xl font-extrabold text-[#6B3226] tracking-tight ${fadeIn}`}>Dashboard</h1>
            <p className={`text-gray-700 text-base mt-1 ${fadeIn} delay-100`}>
              Welcome back, {userType === 'company' ? user?.companyName : `${user?.firstName} ${user?.lastName}`}!
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/messages')}
              className={`bg-[#B85D34] hover:bg-opacity-90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95 ${slideInUp}`}
            >
              <FaComments className="text-xl" />
              <span className="text-lg">Messages</span>
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className={`bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl 
                font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none 
                focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] 
                transform hover:-translate-y-1 active:scale-95 ${slideInUp} delay-100`}
            >
              Explore Jobs
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className={`bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl 
                font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none 
                focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] 
                transform hover:-translate-y-1 active:scale-95 ${slideInUp} delay-100`}
            >
              Onboarding
            </button>
            <button
              onClick={handleLogout}
              className={`bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-3 py-1 rounded-xl 
                font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none 
                focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] 
                transform hover:-translate-y-1 active:scale-95 ${slideInUp} delay-100`}
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className={`bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100 ${fadeIn} delay-400`}>
          <h3 className="text-3xl font-bold text-[#6B3226] border-b-2 border-gray-200 pb-5 mb-8 flex items-center gap-3">
            <FaUserCircle className="text-[#6B3226] text-2xl" />
            {userType === 'company' ? 'Company Information' : 'Employee Information'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-lg">
            {userType === 'company' ? (
              <>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Company Name</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.companyName}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Contact Email</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.contactEmail}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Company ID</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.id}</dd>
                </div>
                {/* Add more company-specific details */}
              </>
            ) : (
              <>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Full Name</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.firstName} {user?.lastName}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Email</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Employee ID</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.id}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Current Role</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.currentRole || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Years of Experience</dt>
                  <dd className="text-[#6B3226] font-semibold">{user?.yearsOfExperience || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Skills</dt>
                  <dd className="flex flex-wrap gap-2 mt-1">
                    {user?.skills?.length > 0 ? (
                      user.skills.map(skill => (
                        <span key={skill} className="bg-[#B85D34] text-[#FFE8B4] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#FF9F4F] opacity-90">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic text-sm">No skills listed.</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-medium mb-1">Preferred Domains</dt>
                  <dd className="flex flex-wrap gap-2 mt-1">
                    {user?.preferredDomains?.length > 0 ? (
                      user.preferredDomains.map(domain => (
                        <span key={domain} className="bg-[#B85D34] text-[#FFE8B4] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#FF9F4F] opacity-90">
                          {domain}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic text-sm">No preferred domains listed.</span>
                    )}
                  </dd>
                </div>
                {/* Add more employee-specific details */}
              </>
            )}
          </div>
        </div>

        {/* Additional Dashboard Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile Completion Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${slideInUp} delay-500`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#6B3226] rounded-xl flex items-center justify-center shadow-md">
                  <FaUserCircle className="w-6 h-6 text-[#FFE8B4]" />
                </div>
              </div>
              <div className="ml-5 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-600 truncate">Profile Status</dt>
                  <dd className="text-xl font-bold text-[#6B3226]">Complete</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${slideInUp} delay-600`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#FF9F4F] rounded-xl flex items-center justify-center shadow-md">
                  <FaCheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-5 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-600 truncate">Account Status</dt>
                  <dd className="text-xl font-bold text-[#6B3226]">Active</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Last Login Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${slideInUp} delay-700`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#B85D34] rounded-xl flex items-center justify-center shadow-md">
                  <FaCalendarAlt className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-5 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-600 truncate">Last Login</dt>
                  <dd className="text-xl font-bold text-[#6B3226]">Just now</dd> {/* Can be dynamic */}
                </dl>
              </div>
            </div>
          </div>
          
          {/* Example of a dynamic card based on userType */}
          {userType === 'employee' && (
            <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${slideInUp} delay-800`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#6B3226] rounded-xl flex items-center justify-center shadow-md">
                    <FaAward className="w-6 h-6 text-[#FFE8B4]" />
                  </div>
                </div>
                <div className="ml-5 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">Offers Received</dt>
                    <dd className="text-xl font-bold text-[#6B3226]">0</dd> {/* Replace with actual data */}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {userType === 'company' && (
            <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${slideInUp} delay-800`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#6B3226] rounded-xl flex items-center justify-center shadow-md">
                    <FaBriefcase className="w-6 h-6 text-[#FFE8B4]" />
                  </div>
                </div>
                <div className="ml-5 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">Active Job Postings</dt>
                    <dd className="text-xl font-bold text-[#6B3226]">0</dd> {/* Replace with actual data */}
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.7s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>
    </div>
  );
};

export default Dashboard;
