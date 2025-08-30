import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// IMPORTANT: If you encounter an error like "Could not resolve 'react-icons/fa'",
// please install the package in your project by running this command in your terminal:
// npm install react-icons
// or
// yarn add react-icons
import { FaArrowLeft, FaPlus } from "react-icons/fa";

const PostJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const [posting, setPosting] = useState(false);
  const [showPostMessage, setShowPostMessage] = useState(false);
  const [postMessage, setPostMessage] = useState({ type: '', text: '' });

  const companyId = localStorage.getItem('companyId');

  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    setShowPostMessage(false); // Hide previous message

    if (!companyId) {
      setPostMessage({ type: 'error', text: 'Company ID not found. Please log in.' });
      setShowPostMessage(true);
      setPosting(false);
      setTimeout(() => setShowPostMessage(false), 3000);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/post", { 
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        companyId: companyId
      });
      setJob({ title: '', description: '', location: '', salary: '' });
      setPostMessage({ type: 'success', text: "Job posted successfully!" });
      setShowPostMessage(true);
      setTimeout(() => {
        setShowPostMessage(false);
        navigate("/CompanyDashboard");
      }, 2000);
    } catch (err) {
      setPostMessage({ type: 'error', text: err.response?.data?.error || "Failed to post job." });
      setShowPostMessage(true);
      setTimeout(() => setShowPostMessage(false), 3000);
    }
    setPosting(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] px-4 py-8 font-sans text-[#6B3226]">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[900px] rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10 lg:p-12">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/companyDashboard')}
              className="text-[#6B3226] hover:text-[#B85D34] transition-colors duration-200 mr-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-white"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-4xl font-extrabold text-[#6B3226]">Post a New Job</h2>
          </div>

          {showPostMessage && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium text-center ${
              postMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {postMessage.text}
            </div>
          )}

          <form className="space-y-6 text-[#6B3226]" onSubmit={handlePost}>
            {/* Job Title Input */}
            <div className="input-box relative">
              <input
                type="text"
                name="title"
                id="title"
                value={job.title}
                onChange={e => setJob({ ...job, title: e.target.value })}
                required
                placeholder=" " // Important: Add a space as placeholder
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="title" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Job Title'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            {/* Location Input */}
            <div className="input-box relative">
              <input
                type="text"
                name="location"
                id="location"
                value={job.location}
                onChange={e => setJob({ ...job, location: e.target.value })}
                required
                placeholder=" " // Important: Add a space as placeholder
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="location" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Location'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            {/* Salary Input */}
            <div className="input-box relative">
              <input
                type="text" // Keep as text for flexible input (e.g., "50k-60k", "negotiable")
                name="salary"
                id="salary"
                value={job.salary}
                onChange={e => setJob({ ...job, salary: e.target.value })}
                placeholder=" " // Important: Add a space as placeholder
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="salary" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Salary'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            {/* Description Textarea */}
            <div className="input-box relative">
              <textarea
                name="description"
                id="description"
                value={job.description}
                onChange={e => setJob({ ...job, description: e.target.value })}
                required
                placeholder=" " // Important: Add a space as placeholder
                rows="4"
                className="input text-base outline-none p-3 block w-full rounded-xl border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 ease-in-out focus:border-[#B85D34] focus:ring-2 focus:ring-[#FF9F4F] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
              />
              <label htmlFor="description" className="label absolute pointer-events-none left-3 top-3 flex text-gray-500 text-base">
                {'Job Description'.split('').map((char, index) => (
                  <span key={index} className="char transition-all duration-200 ease-in-out" style={{ '--index': index }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </label>
            </div>

            <button
              type="submit"
              disabled={posting}
              className="w-full bg-[#6B3226] hover:bg-opacity-90 disabled:bg-gray-400 text-[#FFE8B4] py-3 text-lg font-semibold rounded-xl mt-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
            >
              {posting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>

        {/* Right Panel (Image Section) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-[#B85D34] to-[#6B3226] p-8 lg:p-12 rounded-r-3xl text-white text-center">
          <div className="space-y-6">
            <div className="w-36 h-36 bg-[#FFE8B4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FaPlus className="w-20 h-20 text-[#6B3226]" />
            </div>
            <h3 className="text-3xl font-bold text-[#FFE8B4] mb-3">Expand Your Team</h3>
            <p className="text-[#FF9F4F] text-lg">Post new job openings and connect with top talent.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Input Field Label Animation */}
      <style>{`
        .input-box .input:focus,
        .input-box .input:not(:placeholder-shown) {
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
            transition: all .2s ease;
        }
        .input-box .char {
            transition: .2s ease all;
            transition-delay: calc(var(--index) * .05s);
        }
        .input-box .input:focus~label .char,
        .input-box .input:not(:placeholder-shown)~label .char {
            transform: translateY(-28px); /* Adjusted for larger padding */
            font-size: 14px;
            color: #6B3226; /* Dark Cognac on focus/valid */
            background: white; /* Match input background */
            padding: 0 5px;
            border-radius: 5px;
            z-index: 1;
        }
        /* Adjust label position when input is focused/valid to prevent overlap with input border */
        .input-box .input:focus~label,
        .input-box .input:not(:placeholder-shown)~label {
            left: 10px; /* Adjust left position slightly */
            top: -5px; /* Move label up */
        }
      `}</style>
    </div>
  );
};

export default PostJob;
