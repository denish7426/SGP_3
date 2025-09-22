import React, { useEffect, useState } from "react";
import axios from "axios";
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaTimes, FaComments, FaClipboardList, FaPlus, FaMapMarkerAlt, FaUsers, FaCoins, FaFilter, FaUserCircle, FaBuilding, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown for dropdown arrow
import { useNavigate } from "react-router-dom";
import FeatureDashboard from "./FeatureDashboard";

// Contest Creation Modal Component
const ContestModal = ({ jobs, open, onClose, onSubmit, loading }) => {
  const [selectedJob, setSelectedJob] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      axios.get('http://localhost:3000/api/auth/questions')
        .then(res => setQuestions(res.data))
        .catch(() => setQuestions([]));
      // Reset form fields when modal opens
      setTitle("");
      setDescription("");
      setSelectedJob("");
      setStartTime("");
      setEndTime("");
      setNumQuestions(1);
      setSelectedQuestions([]);
      setError("");
    }
  }, [open]);

  useEffect(() => {
    // Reset selected questions if numQuestions changes
    setSelectedQuestions(selectedQuestions.slice(0, numQuestions));
  }, [numQuestions]);

  if (!open) return null;

  const handleQuestionToggle = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== id));
    } else if (selectedQuestions.length < numQuestions) {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!title || !selectedJob || !startTime || !endTime || selectedQuestions.length !== Number(numQuestions)) {
      setError("Please fill all fields and select the required number of questions.");
      return;
    }
    onSubmit({
      title,
      description,
      jobId: selectedJob,
      questionIds: selectedQuestions,
      startTime,
      endTime
    });
  };

  // Helper to format date for datetime-local input
  const formatDateTimeLocal = (dt) => {
    if (!dt) return "";
    const d = new Date(dt);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#B85D34]">Create Contest</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Title:</label>
          <input className="w-full mb-4 p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea className="w-full mb-4 p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} />
          <label className="block mb-2 font-semibold">Select Job:</label>
          <select className="w-full mb-4 p-2 border rounded" value={selectedJob} onChange={e => setSelectedJob(e.target.value)} required>
            <option value="">-- Select Job --</option>
            {jobs.map(job => (
              <option key={job._id} value={job._id}>{job.title}</option>
            ))}
          </select>
          <label className="block mb-2 font-semibold">Start Time:</label>
          <input type="datetime-local" className="w-full mb-4 p-2 border rounded" value={formatDateTimeLocal(startTime)} onChange={e => setStartTime(e.target.value)} required />
          <label className="block mb-2 font-semibold">End Time:</label>
          <input type="datetime-local" className="w-full mb-4 p-2 border rounded" value={formatDateTimeLocal(endTime)} onChange={e => setEndTime(e.target.value)} required />
          <label className="block mb-2 font-semibold">Number of Questions:</label>
          <input type="number" className="w-full mb-4 p-2 border rounded" min={1} max={20} value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} required />
          <label className="block mb-2 font-semibold">Select Questions ({selectedQuestions.length}/{numQuestions}):</label>
          <div className="max-h-40 overflow-y-auto border rounded mb-4 p-2" style={{ minHeight: 60 }}>
            {questions.length === 0 ? (
              <div className="text-gray-500">No questions available.</div>
            ) : (
              questions.map(q => (
                <div key={q._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q._id)}
                    onChange={() => handleQuestionToggle(q._id)}
                    disabled={!selectedQuestions.includes(q._id) && selectedQuestions.length >= numQuestions}
                    className="mr-2"
                  />
                  <span>{q.question}</span>
                </div>
              ))
            )}
          </div>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button type="submit" className="w-full bg-[#B85D34] text-white py-2 rounded font-bold mt-2 hover:bg-[#6B3226] transition" disabled={loading}>
            {loading ? 'Creating...' : 'Create Contest'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ContestResultsModal = ({ open, onClose, contest, results }) => {
  if (!open || !contest) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl relative">
        <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#B85D34]">Results: {contest.title}</h2>
        {results.length === 0 ? (
          <div>No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-[#FFE8B4]">
                  <th className="px-3 py-2 border">Applicant</th>
                  <th className="px-3 py-2 border">Email</th>
                  <th className="px-3 py-2 border">Score</th>
                  <th className="px-3 py-2 border">Answers</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={r._id || idx} className="border-b">
                    <td className="px-3 py-2 border">{r.employeeId?.firstName} {r.employeeId?.lastName}</td>
                    <td className="px-3 py-2 border">{r.employeeId?.email}</td>
                    <td className="px-3 py-2 border font-bold">{r.score}</td>
                    <td className="px-3 py-2 border">
                      {r.answers.map((a, i) => (
                        <div key={i}>Q{i+1}: {a.answer}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyDashboard = () => {
  const [contests, setContests] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestResults, setContestResults] = useState([]);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Contest modal state
  const [showContestModal, setShowContestModal] = useState(false);
  const [contestLoading, setContestLoading] = useState(false);
  const [contestMsg, setContestMsg] = useState("");

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

  // Fetch contests for company jobs
  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/contests')
      .then(res => setContests(res.data))
      .catch(() => setContests([]));
  }, [jobs]);

  // Handle contest creation
  const handleCreateContest = async ({ title, description, jobId, questionIds, startTime, endTime }) => {
    setContestLoading(true);
    setContestMsg("");
    try {
      // Find companyId from job
      const job = jobs.find(j => j._id === jobId);
      const companyId = job?.companyId;
      const res = await axios.post('http://localhost:3000/api/auth/createContest', {
        title,
        description,
        companyId,
        jobId,
        questionIds,
        startTime,
        endTime
      });
      setContestMsg("Contest created and applicants notified!");
      setShowContestModal(false);
    } catch (err) {
      setContestMsg("Failed to create contest. Try again.");
      console.error(err);
    }
    setContestLoading(false);
  };

  // Handle view results
  const handleViewResults = async (contest) => {
    setSelectedContest(contest);
    setShowResultsModal(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/auth/contests/${contest._id}/results`);
      setContestResults(res.data);
    } catch {
      setContestResults([]);
    }
  };

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
            {/* <button
              onClick={() => navigate('/company/post-job')}
              className={`bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95 ${slideInUp}`}
            >
              <FaPlus className="text-xl" />
              <span className="text-lg">Post New Job</span>
            </button> */}
            <button
              onClick={() => setShowContestModal(true)}
              className={`bg-[#FF9F4F] hover:bg-[#B85D34] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4] transform hover:-translate-y-1 active:scale-95 ${slideInUp}`}
            >
              <FaClipboardList className="text-xl" />
              <span className="text-lg">Create Contest</span>
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

      {/* Contest Modal */}
      <ContestModal
        jobs={jobs}
        open={showContestModal}
        onClose={() => setShowContestModal(false)}
        onSubmit={handleCreateContest}
        loading={contestLoading}
      />
      {contestMsg && (
        <div className="fixed top-20 right-10 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {contestMsg}
        </div>
      )}


      {/* List contests for company jobs */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-[#B85D34]">Your Contests</h2>
        {contests.length === 0 ? (
          <div className="text-gray-600">No contests created yet.</div>
        ) : (
          <table className="min-w-full border text-sm mb-8">
            <thead>
              <tr className="bg-[#FFE8B4]">
                <th className="px-3 py-2 border">Title</th>
                <th className="px-3 py-2 border">Job</th>
                <th className="px-3 py-2 border">Start</th>
                <th className="px-3 py-2 border">End</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((c, idx) => (
                <tr key={c._id || idx} className="border-b">
                  <td className="px-3 py-2 border font-bold">{c.title}</td>
                  <td className="px-3 py-2 border">{jobs.find(j => j._id === c.jobId)?.title || 'N/A'}</td>
                  <td className="px-3 py-2 border">{c.startTime ? new Date(c.startTime).toLocaleString() : '-'}</td>
                  <td className="px-3 py-2 border">{c.endTime ? new Date(c.endTime).toLocaleString() : '-'}</td>
                  <td className="px-3 py-2 border">
                    <button className="bg-[#B85D34] text-white px-4 py-1 rounded hover:bg-[#6B3226]" onClick={() => handleViewResults(c)}>
                      View Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Feature-based Dashboard (keep below contests) */}
      <FeatureDashboard 
        jobs={jobs}
        employees={employees}
        skills={skills}
        onSelectSkill={setSelectedSkill}
        selectedSkill={selectedSkill}
        loading={loading}
        setSelectedEmployee={setSelectedEmployee}
        filtered={filtered}
        navigate={navigate}
      />

      {/* Contest Results Modal */}
      <ContestResultsModal
        open={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        contest={selectedContest}
        results={contestResults}
      />

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
