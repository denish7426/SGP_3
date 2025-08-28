import React, { useState } from "react";
// import{useAuth} from "react-redux"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
// import { useSelector } from "react-redux";


const PostJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const [posting, setPosting] = useState(false);

const companyId = localStorage.getItem('companyId'); // or hardcode for testing




  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      // Replace with companyId from auth/session
      console.log('Posting job with companyId:', companyId); // Debug log
      await axios.post("http://localhost:3000/api/auth/post", { 
  title: job.title,
  description: job.description,
  location: job.location,
  salary: job.salary,
  companyId: companyId // Replace with actual company ID if needed
});
      setJob({ title: '', description: '', location: '', salary: '' });
      alert("Job posted successfully!");
      navigate("/CompanyDashboard");
    } catch (err) {
      alert("Failed to post job.");
    }
    setPosting(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
        <button
          onClick={() => navigate('/companyDashboard')}
          className="mb-4 text-purple-600 hover:text-purple-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h2 className="text-2xl font-semibold text-purple-700 flex items-center gap-2 mb-4">
          <FaPlus /> Post a New Job
        </h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={handlePost}>
           <label className="text-black font-bold">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            className="border px-3 py-2 text-black rounded-md"
            value={job.title}
            onChange={e => setJob({ ...job, title: e.target.value })}
            required
          />   
          <label className="text-black font-bold">Location</label>
          <input
            type="text"
            placeholder="Location"
            className="border px-3 py-2 text-black rounded-md"
            value={job.location}
            onChange={e => setJob({ ...job, location: e.target.value })}
            required
          />
          <label className="text-black font-bold">salary</label>
          <input
            type="text"
            placeholder="Salary"
            className="border px-3 py-2 text-black rounded-md"
            value={job.salary}
            onChange={e => setJob({ ...job, salary: e.target.value })}
          />
          <label className="text-black font-bold">Description</label>
          <textarea
            placeholder="Job Description"
            className="border px-3 py-2 text-black rounded-md"
            value={job.description}
            onChange={e => setJob({ ...job, description: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            disabled={posting}
          >
            {posting ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;