import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeJobFeed = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [minFit, setMinFit] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(20);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/companyalljobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };
    fetchJobs();
  }, []);

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

  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">DomaiNetHire</div>
          <div className="flex-1 mx-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles or companies"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-x-3">
            <button onClick={() => navigate('/messages')} className="px-3 py-2 text-sm bg-gray-100 rounded-lg">Messages</button>
            <button onClick={() => navigate('/onboarding')} className="px-3 py-2 text-sm bg-gray-100 rounded-lg">Profile</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="bg-white rounded-xl shadow p-4 h-fit">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">Job fit score: {minFit}%+</label>
              <input type="range" min="0" max="100" value={minFit} onChange={(e) => setMinFit(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Minimum salary (LPA)</label>
              <input type="range" min="0" max="60" value={salary} onChange={(e) => setSalary(parseInt(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-600">{salary} LPA+</div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Skills</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allSkills.map((s) => (
                  <button key={s} onClick={() => toggleSkill(s)} className={`px-3 py-1.5 rounded-full border text-sm ${selectedSkills.includes(s) ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Any</option>
                {allLocations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 space-y-4">
          {filtered.map((job) => (
            <div key={job._id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-100 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="text-sm text-gray-600">{job.companyId?.companyName || ''} • {job.location}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(job.skills || []).map((s) => (
                      <span key={s} className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-200 flex items-center justify-center">
                    <div className="text-purple-700 font-semibold">{job.fit || '--'}%</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Job Fit</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">From</div>
                  <div className="text-lg font-semibold">₹{job.salary} LPA</div>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-2 rounded-lg bg-purple-600 text-white">Apply</button>
                  <button className="px-3 py-2 rounded-lg bg-gray-100">Save</button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-12 bg-white rounded-xl">No matching jobs. Try adjusting filters.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeJobFeed;