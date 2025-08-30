import React, { useState, useRef } from 'react';
import { FaClipboardList, FaPlus, FaUsers, FaFilter, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

// This component will be the main container for the feature-based dashboard
const FeatureDashboard = ({ jobs, employees, skills, onSelectSkill, selectedSkill, loading, setSelectedEmployee, filtered, navigate }) => {
  // State to track which feature is currently active
  const [activeFeature, setActiveFeature] = useState('jobs'); // Default to jobs dashboard

  // Custom animation classes
  const fadeIn = "animate-fadeIn";
  const slideInUp = "animate-slideInUp";

  // Refs for scrolling
  const contentRef = useRef(null);

  // Feature selection buttons with horizontal scrolling
  const renderFeatureButtons = () => {
    const features = [
      { id: 'jobs', name: 'Job Dashboard', icon: <FaClipboardList className="text-2xl" />, description: 'Manage your posted jobs' },
      { id: 'post', name: 'Post New Job', icon: <FaPlus className="text-2xl" />, description: 'Create a new job listing' },
      { id: 'talent', name: 'Find Talent', icon: <FaUsers className="text-2xl" />, description: 'Browse skilled employees' },
    ];

    // Scroll navigation horizontally
    const scrollRef = useRef(null);
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    return (
      <div className="relative">
        <div className="flex items-center">
          <button
            onClick={scrollLeft}
            className="hidden md:flex items-center justify-center h-10 w-10 bg-[#6B3226] text-[#FFE8B4] rounded-full shadow-md hover:bg-opacity-90 focus:outline-none z-10 absolute left-0 transform -translate-x-1/2"
          >
            <FaChevronLeft />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto py-2 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex-shrink-0 snap-center mx-2 min-w-[280px] bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${activeFeature === feature.id ? 'border-[#6B3226] ring-4 ring-[#FF9F4F] ring-opacity-50 transform scale-105' : 'border-gray-200 hover:border-[#FF9F4F]'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-full ${activeFeature === feature.id ? 'bg-[#6B3226] text-[#FFE8B4]' : 'bg-[#FFE8B4] text-[#6B3226]'} transition-colors duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B3226]">{feature.name}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="hidden md:flex items-center justify-center h-10 w-10 bg-[#6B3226] text-[#FFE8B4] rounded-full shadow-md hover:bg-opacity-90 focus:outline-none z-10 absolute right-0 transform translate-x-1/2"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Feature indicator dots */}
        <div className="flex justify-center mt-4">
          {['jobs', 'post', 'talent'].map((id) => (
            <button
              key={id}
              onClick={() => setActiveFeature(id)}
              className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${activeFeature === id ? 'bg-[#6B3226] w-6' : 'bg-[#FFE8B4] border border-[#6B3226]'}`}
              aria-label={`Switch to ${id}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render the active feature content
  const renderFeatureContent = () => {
    switch(activeFeature) {
      case 'jobs':
        return renderJobsDashboard();
      case 'post':
        return renderPostJobButton();
      case 'talent':
        return renderTalentFinder();
      default:
        return renderJobsDashboard();
    }
  };

  // Jobs Dashboard Feature
  const renderJobsDashboard = () => (
    <div className={`bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-100 ${fadeIn} delay-200`}>
      <h2 className="text-3xl font-bold text-[#6B3226] flex items-center gap-3 mb-8 pb-5 border-b-2 border-gray-200">
        <FaClipboardList className="text-[#6B3226] text-2xl" /> Your Posted Jobs
      </h2>
      {jobs.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-20 text-center bg-[#FFE8B4] rounded-xl border-4 border-[#6B3226] shadow-inner ${fadeIn} delay-300`}>
          <FaClipboardList className="text-8xl text-[#6B3226] opacity-30 mb-8 animate-bounce-slow" />
          <p className="text-[#6B3226] text-2xl font-semibold mb-6">No jobs posted yet. Ignite your hiring!</p>
          <button
            onClick={() => setActiveFeature('post')}
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
              <div className="absolute top-0 left-0 w-full h-2 bg-[#B85D34] animate-gradient-slide"></div>
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 bg-[#FFE8B4] rounded-lg flex-shrink-0 shadow-sm animate-pulse-small">
                  <FaClipboardList className="text-[#6B3226] text-2xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-xl text-[#6B3226] leading-tight group-hover:text-[#B85D34] transition-colors duration-200">{j.title}</h3>
                  <p className="text-sm text-gray-700 mt-1 flex items-center gap-1">{j.companyName}</p>
                </div>
              </div>
              <div className="text-gray-700 text-base space-y-2 mb-6">
                <p className="flex items-center gap-2">{j.location}</p>
                <p className="flex items-center gap-2">₹{j.salary} LPA</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${j.status === "Closed" ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    {j.status || "Open"}
                  </span>
                  <span className="bg-[#FF9F4F] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 border border-[#B85D34]">
                    {j.applicants?.length || 0}
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
  );

  // Post Job Feature
  const renderPostJobButton = () => (
    <div className="flex justify-center items-center py-10">
      <button
        onClick={() => navigate('/company/post-job')}
        className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-10 py-6 rounded-xl font-bold text-2xl flex items-center gap-4 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#FF9F4F] focus:ring-offset-4 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-2 active:scale-95"
      >
        <FaPlus className="text-3xl" />
        <span>Post a New Job</span>
      </button>
    </div>
  );

  // Talent Finder Feature
  const renderTalentFinder = () => (
    <div className={`bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 ${fadeIn} delay-200`}>
      <div className={`flex flex-col sm:flex-row gap-6 justify-between items-center mb-8 pb-5 border-b-2 border-gray-200 ${fadeIn} delay-500`}>
        <h2 className="text-3xl font-bold text-[#6B3226]">Browse Employees</h2>
        <div className="flex items-center gap-4">
          <label htmlFor="skill-filter" className="font-semibold text-gray-700 text-base flex items-center gap-2">
            <FaFilter className="text-gray-500 text-lg" /> Filter by Skill:
          </label>
          <div className="relative w-full sm:w-auto custom-select-wrapper group">
            <select
              id="skill-filter"
              className="block appearance-none w-full bg-[#FFF8E7] border-2 border-[#FF9F4F] text-[#6B3226] py-3 pl-5 pr-10 rounded-xl leading-tight focus:outline-none text-base transition-all duration-200 ease-in-out shadow-md cursor-pointer
                          group-hover:border-[#B85D34] focus:border-[#6B3226] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] focus:shadow-lg hover:shadow-lg"
              value={selectedSkill}
              onChange={(e) => onSelectSkill(e.target.value)}
            >
              <option value="">All Skills</option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
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
          <FaUsers className="text-8xl text-[#6B3226] opacity-30 mb-8 animate-bounce-slow" />
          <p className="text-xl text-gray-700 font-medium">No employees found matching "{(selectedSkill || 'All Skills').slice(0, 20)}{selectedSkill.length > 20 ? '...' : ''}".</p>
          {selectedSkill && (
            <button
              className="mt-6 text-[#6B3226] hover:text-[#B85D34] text-base font-semibold transition-colors duration-200"
              onClick={() => onSelectSkill("")}
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
              <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9F4F] animate-gradient-slide-alt"></div>
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
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {renderFeatureButtons()}
      <div ref={contentRef} className="mt-6 transition-all duration-500 ease-in-out transform">
        {renderFeatureContent()}
      </div>
    </section>
  );
};

export default FeatureDashboard;