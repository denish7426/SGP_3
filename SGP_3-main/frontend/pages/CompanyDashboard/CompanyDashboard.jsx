import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaTimes, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">Company Dashboard</h1>
            <p className="text-gray-500">Browse & filter employee profiles</p>
          </div>
          <button
            onClick={() => navigate('/messages')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
          >
            <FaComments />
            <span>Messages</span>
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 items-center">
        <label className="font-medium text-gray-700">
          Filter by Skill:
          <select
            className="ml-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <span className="ml-auto text-gray-500 text-sm">
          Showing {filtered.length} of {employees.length} employees
        </span>
      </div>

      {/* Employee Cards - Responsive Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-purple-600 animate-pulse">Loading employees...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">No employees found for this skill.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
            {filtered.map((emp) => (
              <div
                key={emp._id || emp.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col items-center border-t-4 border-purple-400"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-3xl font-bold mb-3">
                  {emp.firstName?.[0]}
                  {emp.lastName?.[0]}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {emp.firstName} {emp.lastName}
                </h2>
                <p className="text-gray-500 mb-2">{emp.email}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {emp.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl"
              onClick={() => setSelectedEmployee(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-4xl font-bold mb-3">
                {selectedEmployee.firstName?.[0]}
                {selectedEmployee.lastName?.[0]}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <FaEnvelope className="mr-2" />
                <span>{selectedEmployee.email}</span>
              </div>
              {selectedEmployee.phone && (
                <div className="flex items-center text-gray-600 mb-2">
                  <FaPhone className="mr-2" />
                  <span>{selectedEmployee.phone}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedEmployee.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {selectedEmployee.education && (
                <div className="w-full mb-2">
                  <div className="flex items-center text-purple-700 font-semibold mb-1">
                    <FaGraduationCap className="mr-2" /> Education
                  </div>
                  <div className="bg-purple-50 rounded p-2 text-gray-700 text-sm">
                    {selectedEmployee.education}
                  </div>
                </div>
              )}
              {selectedEmployee.experience && (
                <div className="w-full mb-2">
                  <div className="flex items-center text-purple-700 font-semibold mb-1">
                    <FaBriefcase className="mr-2" /> Experience
                  </div>
                  <div className="bg-purple-50 rounded p-2 text-gray-700 text-sm">
                    {selectedEmployee.experience}
                  </div>
                </div>
              )}
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;