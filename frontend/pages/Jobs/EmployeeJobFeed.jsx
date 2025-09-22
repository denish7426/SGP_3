import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaComments, FaSearch, FaFilter, FaMapMarkerAlt, FaCoins, FaStar, FaCheckCircle, FaHeart, FaPaperPlane, FaBuilding, FaChevronDown, FaBriefcase } from 'react-icons/fa'; // FaBriefcase added here

const EmployeeJobFeed = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [contests, setContests] = useState([]);
  const [myResults, setMyResults] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultDetail, setResultDetail] = useState(null);
  const [showContest, setShowContest] = useState(false);
  const [currentContest, setCurrentContest] = useState(null);
  const [contestQuestions, setContestQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState('');
  const [minFit, setMinFit] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(20);
  const [showApplyMessage, setShowApplyMessage] = useState(false); // Renamed from showApplySuccess for clarity
  const [applyMessage, setApplyMessage] = useState({ type: '', text: '' });

  // Custom animation classes
  const fadeIn = "animate-fadeIn";
  const slideInUp = "animate-slideInUp";

  // Fetch jobs and contests from backend
  useEffect(() => {
    const fetchJobsAndContests = async () => {
      try {
        const [jobsRes, contestsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/auth/companyalljobs'),
          axios.get('http://localhost:3000/api/auth/contests')
        ]);
        setJobs(jobsRes.data);
        setContests(contestsRes.data);
        // Fetch my results for all contests
        const employeeId = localStorage.getItem('employeeId');
        if (employeeId && contestsRes.data.length > 0) {
          const results = {};
          await Promise.all(contestsRes.data.map(async (c) => {
            try {
              const res = await axios.get(`http://localhost:3000/api/auth/contests/${c._id}/myresult`, { params: { employeeId, contestId: c._id } });
              if (res.data) results[c._id] = res.data;
            } catch {}
          }));
          setMyResults(results);
        }
      } catch (err) {
        console.error('Failed to fetch jobs or contests:', err);
      }
    };
    fetchJobsAndContests();
  }, []);

  // Find contest for a job
  const getContestForJob = (jobId) => contests.find(c => c.jobId === jobId);

  // Handle Take Contest
  const handleTakeContest = async (contest) => {
    // Prevent retake if already submitted
    if (myResults[contest._id]) {
      setResultDetail(myResults[contest._id]);
      setShowResultModal(true);
      return;
    }
    setCurrentContest(contest);
    setShowContest(true);
    setSubmitMsg("");
    setSubmitting(false);
    try {
      const res = await axios.get(`http://localhost:3000/api/auth/contests/${contest._id}`);
      setContestQuestions(res.data.questions);
      setAnswers({});
    } catch (err) {
      setContestQuestions([]);
    }
  };

  // Handle answer change
  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  // Handle contest submit
  const handleSubmitContest = async () => {
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const employeeId = localStorage.getItem('employeeId');
      const res = await axios.post('http://localhost:3000/api/auth/contests/' + currentContest._id + '/submit', {
        contestId: currentContest._id,
        employeeId,
        answers
      });
      setShowContest(false);
      setResultDetail(res.data);
      setShowResultModal(true);
      // Update myResults
      setMyResults(prev => ({ ...prev, [currentContest._id]: res.data }));
    } catch (err) {
      setSubmitMsg('Failed to submit answers.');
    }
    setSubmitting(false);
  };

  // Extract all skills and locations from jobs
  const allSkills = useMemo(() => Array.from(new Set(jobs.flatMap((j) => j.skills || []))), [jobs]);
  const allLocations = useMemo(() => Array.from(new Set(jobs.map((j) => j.location))), [jobs]);

  // Filtering logic
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesQuery = `${j.title} ${j.companyId?.companyName || ''}`.toLowerCase().includes(query.toLowerCase());
      const matchesFit = j.fit ? j.fit >= minFit : true;
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.every((s) => (j.skills || []).includes(s));
      const matchesLocation = !location || j.location === location;
      const matchesSalary = j.salary ? j.salary >= salary : true;
      return matchesQuery && matchesFit && matchesSkills && matchesLocation && matchesSalary;
    });
  }, [jobs, query, minFit, selectedSkills, location, salary]);

  const toggleSkill = (s) => {
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleApply = async (jobId) => {
    const employeeId = localStorage.getItem('employeeId'); // Set this at login
    if (!employeeId) {
      setApplyMessage({ type: 'error', text: 'Please log in as an employee to apply.' });
      setShowApplyMessage(true);
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/auth/apply', { jobId, employeeId });
      setApplyMessage({ type: 'success', text: 'Applied successfully!' });
      setShowApplyMessage(true);
    } catch (err) {
      setApplyMessage({ type: 'error', text: err.response?.data?.error || 'Failed to apply.' });
      setShowApplyMessage(true);
    } finally {
      setTimeout(() => setShowApplyMessage(false), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] font-sans text-[#6B3226] antialiased">
      {/* Header */}
      <header className="bg-white shadow-xl sticky top-0 z-10 border-b-4 border-[#6B3226]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4">
          <div className="text-2xl font-extrabold text-[#6B3226] tracking-tight">
            DomaiNetHire
          </div>
          <div className="flex-1 mx-6 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles or companies..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:border-[#B85D34] text-[#6B3226] shadow-sm transition-all duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/messages')}
              className="bg-[#B85D34] hover:bg-opacity-90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95"
            >
              <FaComments className="text-xl" />
              <span className="text-lg">Messages</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Apply Success/Error Message */}
      {showApplyMessage && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white font-medium z-50 transition-all duration-300 ${
          applyMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {applyMessage.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className={`bg-white rounded-3xl shadow-2xl p-6 h-fit border border-gray-100 ${fadeIn} delay-100`}>
          <h3 className="text-2xl font-bold text-[#6B3226] mb-6 pb-3 border-b-2 border-gray-200 flex items-center gap-2">
            <FaFilter className="text-[#6B3226]" /> Filters
          </h3>
          <div className="space-y-6">
            {/* Job Fit Slider */}
            <div>
              <label htmlFor="minFit" className="block text-gray-700 text-base font-medium mb-2">Job fit score: <span className="font-semibold text-[#6B3226]">{minFit}%+</span></label>
              <input
                type="range"
                id="minFit"
                min="0"
                max="100"
                value={minFit}
                onChange={(e) => setMinFit(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B85D34] hover:accent-[#6B3226] transition-colors duration-200"
              />
            </div>
            {/* Minimum Salary Slider */}
            <div>
              <label htmlFor="salary" className="block text-gray-700 text-base font-medium mb-2">Minimum salary: <span className="font-semibold text-[#6B3226]">₹{salary} LPA+</span></label>
              <input
                type="range"
                id="salary"
                min="0"
                max="60"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B85D34] hover:accent-[#6B3226] transition-colors duration-200"
              />
            </div>
            {/* Skills Filter */}
            <div>
              <label className="block text-gray-700 text-base font-medium mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar rounded-lg p-2 bg-gray-50 border border-gray-200">
                {allSkills.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ease-in-out
                      ${selectedSkills.includes(s)
                        ? 'bg-[#6B3226] text-[#FFE8B4] border-[#B85D34] shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF9F4F] hover:text-[#B85D34]'
                      } focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-gray-700 text-base font-medium mb-2">Location</label>
              <div className="relative custom-select-wrapper group">
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block appearance-none w-full bg-white border-2 border-gray-300 text-[#6B3226] py-3 pl-5 pr-10 rounded-xl leading-tight focus:outline-none text-base transition-all duration-200 ease-in-out shadow-sm cursor-pointer
                             group-hover:border-[#B85D34] focus:border-[#6B3226] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] focus:shadow-lg hover:shadow-lg"
                >
                  <option value="">Any</option>
                  {allLocations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6B3226] transition-transform duration-200 transform group-hover:rotate-180 group-focus-within:rotate-180">
                  <FaChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <main className="lg:col-span-3 space-y-6">
          {filtered.length === 0 ? (
            <div className={`text-center text-gray-600 py-20 bg-white rounded-3xl shadow-lg border border-gray-100 ${fadeIn} delay-200`}>
              <FaBriefcase className="text-8xl mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No matching jobs found.</p>
              <p className="text-base mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            filtered.map((job, index) => (
              <div key={job._id} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 transform hover:-translate-y-2 ${slideInUp} delay-${index * 100 + 200}`}>
                <div className="flex items-start md:items-center flex-grow mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-xl bg-[#FFE8B4] flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                    {/* Placeholder for company logo/icon */}
                    <FaBuilding className="w-8 h-8 text-[#6B3226]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B3226] mb-1">{job.title}</h3>
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                      <span>{job.companyId?.companyName || 'N/A'}</span>
                      <FaMapMarkerAlt className="text-gray-500 text-xs" />
                      <span>{job.location}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(job.skills || []).map((s) => (
                        <span key={s} className="px-3 py-1.5 rounded-full bg-[#B85D34] text-[#FFE8B4] text-xs font-medium border border-[#FF9F4F] opacity-90">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6 flex-shrink-0">
                  {/* Job Fit */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-[#FF9F4F] flex items-center justify-center mx-auto shadow-md">
                      <div className="text-lg font-bold text-[#6B3226]">{job.fit || '--'}%</div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Job Fit</div>
                  </div>
                  {/* Salary */}
                  <div className="text-right md:text-center">
                    <div className="text-sm text-gray-600">Salary</div>
                    <div className="text-xl font-bold text-[#6B3226]">₹{job.salary} LPA</div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <button
                      className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-white"
                      onClick={() => handleApply(job._id)}
                    >
                      <FaPaperPlane className="inline-block mr-2" /> Apply
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-[#6B3226] px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white">
                      <FaHeart className="inline-block mr-2" /> Save
                    </button>
                    {(() => {
                      const contest = getContestForJob(job._id);
                      if (!contest) return null;
                      const myResult = myResults[contest._id];
                      return (
                        <>
                          <button
                            className={`bg-[#FF9F4F] hover:bg-[#B85D34] text-white px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-white ${myResult ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={() => handleTakeContest(contest)}
                            disabled={!!myResult}
                          >
                            {myResult ? 'Contest Completed' : '📝 Take Contest'}
                          </button>
                          {myResult && (
                            <div className="text-green-700 font-semibold mt-2">Score: {myResult.score} / {myResult.total || contest.questions?.length || '?'}</div>
                          )}
                        </>
                      );
                    })()}
                  </div>
      {/* Contest Modal */}
      {showContest && currentContest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500" onClick={() => setShowContest(false)}>
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#B85D34]">{currentContest.title || 'Contest'}</h2>
            <form onSubmit={e => { e.preventDefault(); handleSubmitContest(); }}>
              {contestQuestions.length === 0 ? (
                <div>Loading questions...</div>
              ) : (
                contestQuestions.map((q, idx) => (
                  <div key={q._id} className="mb-6">
                    <div className="font-semibold mb-2">Q{idx + 1}. {q.question}</div>
                    <div className="space-y-2">
                      {q.options.map((opt, i) => (
                        <label key={i} className="block cursor-pointer">
                          <input
                            type="radio"
                            name={`q_${q._id}`}
                            value={opt}
                            checked={answers[q._id] === opt}
                            onChange={() => handleAnswerChange(q._id, opt)}
                            className="mr-2"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              )}
              <button type="submit" className="w-full bg-[#B85D34] text-white py-2 rounded font-bold mt-2 hover:bg-[#6B3226] transition" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Answers'}
              </button>
            </form>
          </div>
        </div>
      )}
      {submitMsg && (
        <div className="fixed top-20 right-10 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {submitMsg}
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && resultDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500" onClick={() => setShowResultModal(false)}>
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#B85D34]">Your Contest Result</h2>
            <div className="mb-4 font-semibold text-lg text-green-700">Score: {resultDetail.score} / {resultDetail.total}</div>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-[#FFE8B4]">
                    <th className="px-3 py-2 border">Q#</th>
                    <th className="px-3 py-2 border">Your Answer</th>
                    <th className="px-3 py-2 border">Correct Answer</th>
                    <th className="px-3 py-2 border">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {resultDetail.results?.map((r, idx) => (
                    <tr key={r.questionId || idx} className="border-b">
                      <td className="px-3 py-2 border">{idx + 1}</td>
                      <td className="px-3 py-2 border">{r.selectedOption || '-'}</td>
                      <td className="px-3 py-2 border">{r.correctAnswer}</td>
                      <td className={`px-3 py-2 border font-bold ${r.isCorrect ? 'text-green-600' : 'text-red-600'}`}>{r.isCorrect ? '✔' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* Custom CSS for Animations and Scrollbar */}
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #B85D34; /* Burnt Sienna */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B3226; /* Dark Cognac */
        }

        /* Custom range slider styling */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #6B3226; /* Dark Cognac */
          cursor: pointer;
          border: 2px solid #FFE8B4; /* Golden Sand border */
          box-shadow: 0 0 0 2px rgba(107, 50, 38, 0.3); /* Subtle shadow */
          transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #6B3226; /* Dark Cognac */
          cursor: pointer;
          border: 2px solid #FFE8B4; /* Golden Sand border */
          box-shadow: 0 0 0 2px rgba(107, 50, 38, 0.3);
          transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          background: #B85D34; /* Burnt Sienna on hover */
          box-shadow: 0 0 0 3px rgba(184, 93, 52, 0.5);
        }
        input[type="range"]::-moz-range-thumb:hover {
          background: #B85D34; /* Burnt Sienna on hover */
          box-shadow: 0 0 0 3px rgba(184, 93, 52, 0.5);
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          background: #E0E0E0; /* Light gray track */
          border-radius: 5px;
          border: 0.5px solid #D1D5DB;
        }
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 8px;
          background: #E0E0E0; /* Light gray track */
          border-radius: 5px;
          border: 0.5px solid #D1D5DB;
        }
      `}</style>
    </div>
  );
};

export default EmployeeJobFeed;
