import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaUser } from "react-icons/fa";

const ApplicantsList = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/applicants/${jobId}`);
        setApplicants(res.data.applicants || []);
        setJobTitle(res.data.title || "");
      } catch (err) {
        setApplicants([]);
      }
      setLoading(false);
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl mt-10">
        <button
          onClick={() => navigate('/companyDashboard')}
          className="mb-4 text-purple-600 hover:text-purple-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          Applicants for: <span className="text-black">{jobTitle}</span>
        </h2>
        {loading ? (
          <div className="text-center text-purple-600">Loading...</div>
        ) : applicants.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No applicants yet.</div>
        ) : (
          <ul className="space-y-4">
            {applicants.map((emp) => (
              <li key={emp._id || emp.id} className="bg-purple-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center text-white text-xl font-bold">
                  <FaUser />
                </div>
                <div>
                  <div className="font-semibold text-lg text-purple-700">
                    {emp.firstName} {emp.lastName}
                  </div>
                  <div className="text-gray-600 text-sm">{emp.email}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {emp.skills?.map((skill) => (
                      <span key={skill} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;