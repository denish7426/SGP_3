import React, { useEffect, useState } from "react";
import axios from "axios";
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaTimes, FaComments, FaClipboardList, FaPlus, FaMapMarkerAlt, FaUsers, FaCoins, FaFilter, FaUserCircle, FaBuilding, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown for dropdown arrow
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Custom animation classes
  const fadeIn = "animate-fadeIn";
  const slideInUp = "animate-slideInUp";

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/auth/employees");
        const data = await res.json();
        setEmployees(data);
        setFiltered(data);
        // Collect unique skills
        const allSkills = new Set();
        data.forEach((emp) =>
          emp.skills?.forEach((skill) => allSkills.add(skill))
        );
        setSkills([...allSkills]);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setEmployees([]);
        setFiltered([]);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!selectedSkill) {
      setFiltered(employees);
    } else {
      setFiltered(
        employees.filter((emp) =>
          emp.skills?.map((s) => s.toLowerCase()).includes(selectedSkill.toLowerCase())
        )
      );
    }
  }, [selectedSkill, employees]);

  // Fetch jobs posted by company
  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/companyalljobs')
      .then(res => setJobs(res.data))
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
      });
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] font-sans text-[#6B3226] antialiased">
      {/* Header */}
      <header className="bg-white shadow-xl sticky top-0 z-10 border-b-4 border-[#6B3226]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className={`text-4xl font-extrabold text-[#6B3226] tracking-tight ${fadeIn}`}>Company Dashboard</h1>
            <p className={`text-gray-700 text-base mt-1 ${fadeIn} delay-100`}>Manage your posted jobs & discover top talent.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/company/post-job')}
              className={`bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95 ${slideInUp}`}
            >
              <FaPlus className="text-xl" />
              <span className="text-lg">Post New Job</span>
            </button>
            <button
              onClick={() => navigate('/messages')}
              className={`bg-[#B85D34] hover:bg-opacity-90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95 ${slideInUp} delay-100`}
            >
              <FaComments className="text-xl" />
              <span className="text-lg">Messages</span>
            </button>
          </div>
        </div>
      </header>

      {/* Your Posted Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className={`bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-100 ${fadeIn} delay-200`}>
          <h2 className="text-3xl font-bold text-[#6B3226] flex items-center gap-3 mb-8 pb-5 border-b-2 border-gray-200">
            <FaClipboardList className="text-[#6B3226] text-2xl" /> Your Posted Jobs
          </h2>
          {jobs.length === 0 ? (
            <div className={`flex flex-col items-center justify-center py-20 text-center bg-[#FFE8B4] rounded-xl border-4 border-[#6B3226] shadow-inner ${fadeIn} delay-300`}>
              <FaBriefcase className="text-8xl text-[#6B3226] opacity-30 mb-8 animate-bounce-slow" />
              <p className="text-[#6B3226] text-2xl font-semibold mb-6">No jobs posted yet. Ignite your hiring!</p>
              <button
                onClick={() => navigate('/company/post-job')}
                className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-10 py-4 rounded-xl font-bold text-xl flex items-center gap-3 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95"
              >
                <FaPlus className="text-2xl" />
                <span>Post Your First Job</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((j, index) => (
                <div key={j._id} className={`bg-white rounded-xl shadow-lg p-7 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 border border-gray-200 group transform hover:-translate-y-2 relative overflow-hidden ${slideInUp} delay-${index * 100 + 400}`}>
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#B85D34] animate-gradient-slide"></div> {/* Burnt Sienna top border with animation */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-3 bg-[#FFE8B4] rounded-lg flex-shrink-0 shadow-sm animate-pulse-small">
                      <FaBriefcase className="text-[#6B3226] text-2xl" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-[#6B3226] leading-tight group-hover:text-[#B85D34] transition-colors duration-200">{j.title}</h3>
                      <p className="text-sm text-gray-700 mt-1 flex items-center gap-1"><FaBuilding className="text-gray-500" /> {j.companyName}</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-base space-y-2 mb-6">
                    <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-500" /> {j.location}</p>
                    <p className="flex items-center gap-2"><FaCoins className="text-gray-500" /> ₹{j.salary} LPA</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${j.status === "Closed" ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                        {j.status || "Open"}
                      </span>
                      <span className="bg-[#FF9F4F] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 border border-[#B85D34]">
                        <FaUsers className="text-white" /> {j.applicants?.length || 0}
                      </span>
                    </div>
                    <button
                       className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                      onClick={() => navigate(`/companyDashboard/applicants/${j._id}`)}
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Employee Browse Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className={`flex flex-col sm:flex-row gap-6 justify-between items-center mb-8 pb-5 border-b-2 border-gray-200 ${fadeIn} delay-500`}>
          <h2 className="text-3xl font-bold text-[#6B3226]">Browse Employees</h2>
          <div className="flex items-center gap-4">
            <label htmlFor="skill-filter" className="font-semibold text-gray-700 text-base flex items-center gap-2">
              <FaFilter className="text-gray-500 text-lg" /> Filter by Skill:
            </label>
            <div className="relative w-full sm:w-auto custom-select-wrapper group"> {/* Added group for custom-select-wrapper */}
              <select
                id="skill-filter"
                className="block appearance-none w-full bg-[#FFF8E7] border-2 border-[#FF9F4F] text-[#6B3226] py-3 pl-5 pr-10 rounded-xl leading-tight focus:outline-none text-base transition-all duration-200 ease-in-out shadow-md cursor-pointer
                           group-hover:border-[#B85D34] focus:border-[#6B3226] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] focus:shadow-lg hover:shadow-lg"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6B3226]">
                <FaChevronDown className="h-5 w-5 transition-transform duration-200 transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </div>
            </div>
            <span className="text-gray-700 text-sm ml-4 hidden md:block">
              Showing <span className="font-semibold text-[#6B3226]">{filtered.length}</span> of <span className="font-semibold text-[#6B3226]">{employees.length}</span> employees
            </span>
          </div>
        </div>

        {loading ? (
          <div className={`flex justify-center items-center h-64 bg-white rounded-xl shadow-lg border border-gray-100 ${fadeIn} delay-600`}>
            <div className="text-xl text-[#6B3226] animate-pulse font-medium">Loading employee profiles...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className={`flex justify-center items-center h-64 flex-col text-center bg-white rounded-xl shadow-lg border border-gray-100 py-16 ${fadeIn} delay-600`}>
            <FaUserCircle className="text-8xl text-[#6B3226] opacity-30 mb-8 animate-bounce-slow" />
            <p className="text-xl text-gray-700 font-medium">No employees found matching "{(selectedSkill || 'All Skills').slice(0, 20)}{selectedSkill.length > 20 ? '...' : ''}".</p>
            {selectedSkill && (
                <button
                    className="mt-6 text-[#6B3226] hover:text-[#B85D34] text-base font-semibold transition-colors duration-200"
                    onClick={() => setSelectedSkill("")}
                >
                    Clear Filter
                </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((emp, index) => (
              <div
                key={emp._id || emp.id}
                className={`bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border border-gray-200 group transform hover:-translate-y-2 relative overflow-hidden ${slideInUp} delay-${index * 100 + 700}`}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9F4F] animate-gradient-slide-alt"></div> {/* Sunset Amber top border with animation */}
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-5 border-4 border-[#FFE8B4] group-hover:border-[#B85D34] transition-colors duration-300 shadow-md animate-pulse-small">
                  <span className="text-6xl font-extrabold text-[#6B3226] opacity-70">
                    {emp.firstName?.[0]}{emp.lastName?.[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#6B3226] mb-2 text-center group-hover:text-[#B85D34] transition-colors duration-200">{emp.firstName} {emp.lastName}</h3>
                <p className="text-base text-gray-700 mb-4 text-center truncate w-full px-2">{emp.email}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-5 max-w-full">
                  {emp.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#B85D34] text-[#FFE8B4] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#FF9F4F] opacity-90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 transform hover:scale-105 active:scale-95"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fade-in-backdrop">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full relative transform scale-95 animate-scale-up-bounce border border-gray-200">
            <button
              className="absolute top-5 right-5 text-gray-400 hover:text-[#6B3226] text-3xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-2"
              onClick={() => setSelectedEmployee(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-[#FF9F4F] flex items-center justify-center mb-6 border-4 border-[#B85D34] shadow-lg animate-spin-slow">
                <span className="text-7xl font-extrabold text-[#6B3226]">
                  {selectedEmployee.firstName?.[0]}{selectedEmployee.lastName?.[0]}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#6B3226] mb-3">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-base mt-5 w-full">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <FaEnvelope className="text-gray-600 text-xl" />
                  <span className="truncate">{selectedEmployee.email}</span>
                </div>
                {selectedEmployee.phone && (
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <FaPhone className="text-gray-600 text-xl" />
                    <span>{selectedEmployee.phone}</span>
                  </div>
                )}
                {selectedEmployee.education && (
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <FaGraduationCap className="text-gray-600 text-xl" />
                    <span className="truncate">{selectedEmployee.education}</span>
                  </div>
                )}
                {selectedEmployee.experience && (
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <FaBriefcase className="text-gray-600 text-xl" />
                    <span className="truncate">{selectedEmployee.experience}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-full">
                {selectedEmployee.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#B85D34] text-[#FFE8B4] px-4 py-1.5 rounded-full text-sm font-medium border border-[#FF9F4F] opacity-90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind CSS Custom Animations (add these to your main CSS file or a style tag if not using PostCSS) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUpBounce {
          0% { transform: scale(0.9); opacity: 0; }
          60% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseSmall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes gradientSlideAlt {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out forwards; }
        .animate-scale-up-bounce { animation: scaleUpBounce 0.4s ease-out forwards; }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
        .animate-pulse-small { animation: pulseSmall 2s infinite ease-in-out; }
        .animate-gradient-slide { animation: gradientSlide 4s ease-in-out infinite alternate; background-size: 200% 100%; }
        .animate-gradient-slide-alt { animation: gradientSlideAlt 4s ease-in-out infinite alternate; background-size: 200% 100%; }
        .animate-spin-slow { animation: spinSlow 10s linear infinite; }
        .animate-fade-in-backdrop { animation: fadeInBackdrop 0.2s ease-out forwards; }

        /* Delay utilities for staggered animations */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        /* Add more as needed, e.g., for loop rendering */

        /* Custom Dropdown Styles */
        .custom-select-wrapper {
          position: relative;
          display: inline-block; /* Or block, depending on layout needs */
        }

        .custom-select-wrapper select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: white; /* Ensure background is white */
          border: 2px solid #FF9F4F; /* Sunset Amber border */
          color: #6B3226; /* Dark Cognac text */
          padding: 0.75rem 2.5rem 0.75rem 1.25rem; /* Adjusted padding for custom arrow */
          border-radius: 0.75rem; /* Rounded-xl */
          font-size: 1rem; /* text-base */
          line-height: 1.25; /* leading-tight */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .custom-select-wrapper select:hover {
          border-color: #B85D34; /* Burnt Sienna on hover */
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
        }

        .custom-select-wrapper select:focus {
          outline: none;
          border-color: #6B3226; /* Dark Cognac on focus */
          box-shadow: 0 0 0 3px rgba(107, 50, 38, 0.5), 0 6px 15px rgba(0, 0, 0, 0.15); /* Custom focus ring + shadow */
        }

        .custom-select-wrapper .custom-select-arrow {
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%) rotate(0deg);
          pointer-events: none;
          color: #6B3226; /* Dark Cognac arrow */
          transition: transform 0.2s ease-in-out;
        }

        .custom-select-wrapper:focus-within .custom-select-arrow,
        .custom-select-wrapper:hover .custom-select-arrow {
          transform: translateY(-50%) rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default CompanyDashboard;
