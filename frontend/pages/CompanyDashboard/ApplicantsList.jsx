import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaUser, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] flex flex-col items-center p-4 font-sans text-[#6B3226] antialiased">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mt-10 border border-[#B85D34]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/companyDashboard')}
          className="mb-4 text-[#6B3226] hover:text-[#B85D34] flex items-center gap-2 transition-colors duration-300 ease-in-out font-semibold"
        >
          <FaArrowLeft /> Back to Dashboard
        </motion.button>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B85D34] to-[#6B3226] flex items-center justify-center text-[#FFE8B4]">
            <FaBriefcase />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#6B3226] to-[#B85D34] bg-clip-text text-transparent">
            Applicants for: <span className="text-gray-800 font-bold">{jobTitle}</span>
          </h2>
        </motion.div>
        {loading ? (
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-center text-[#B85D34] py-8 font-medium"
          >
            Loading applicants...
          </motion.div>
        ) : applicants.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 py-12 border border-dashed border-[#FF9F4F] rounded-lg bg-[#FFE8B4] bg-opacity-20"
          >
            <div className="text-[#B85D34] text-5xl mb-4"><FaUser /></div>
            <div className="font-medium text-[#6B3226]">No applicants yet.</div>
            <div className="text-sm text-[#B85D34] mt-1">Check back later for updates</div>
          </motion.div>
        ) : (
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {applicants.map((emp, index) => (
              <motion.li 
                key={emp._id || emp.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(107, 50, 38, 0.2)" }}
                className="bg-gradient-to-r from-[#FFE8B4] to-white bg-opacity-50 rounded-lg p-5 flex items-center gap-4 border border-[#FF9F4F] transition-all duration-300">

                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-[#B85D34] to-[#6B3226] flex items-center justify-center text-[#FFE8B4] text-xl font-bold shadow-md">

                  <FaUser />
                </motion.div>
                <div className="flex-1">
                  <div className="font-semibold text-lg bg-gradient-to-r from-[#6B3226] to-[#B85D34] bg-clip-text text-transparent">
                    {emp.firstName} {emp.lastName}
                  </div>
                  <div className="text-[#6B3226] text-sm flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#FF9F4F]"></span>
                    {emp.email}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {emp.skills?.map((skill) => (
                      <motion.span 
                        key={skill} 
                        whileHover={{ scale: 1.1 }}
                        className="bg-[#B85D34] text-[#FFE8B4] px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-[#FF9F4F] opacity-90">
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

export default ApplicantsList;