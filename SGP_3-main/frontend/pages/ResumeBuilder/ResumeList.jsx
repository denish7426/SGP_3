import React, { useEffect, useState } from 'react';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;
    fetch(`http://localhost:5000/api/resume?username=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setResumes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <div>Loading resumes...</div>;
  if (!resumes.length) return <div>No resumes found.</div>;

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Your Saved Resumes</h2>
      <ul>
        {resumes.map((resume, idx) => (
          <li key={resume._id || idx} style={{ marginBottom: 24, padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <div style={{ fontWeight: 'bold', fontSize: 20 }}>{resume.name}</div>
            <div>{resume.email} | {resume.phone}</div>
            <div>{resume.location}</div>
            <div style={{ marginTop: 8 }}><strong>Summary:</strong> {resume.summary}</div>
            <div style={{ marginTop: 8 }}><strong>Skills:</strong> {resume.skills && resume.skills.join(', ')}</div>
            <div style={{ marginTop: 8 }}><strong>Created:</strong> {new Date(resume.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
