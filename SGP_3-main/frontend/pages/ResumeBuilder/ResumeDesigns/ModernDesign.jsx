import React from 'react';

const ModernDesign = ({ data }) => (
  <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '40px', maxWidth: '900px', background: '#fff', fontFamily: 'Segoe UI, Arial, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
  <div style={{ width: 70, height: 70, background: '#374151', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 'bold', marginRight: 24 }}>
        {data.initials}
      </div>
      <div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 'bold', color: '#222' }}>{data.name}</h1>
        <div style={{ color: '#444', fontSize: 18 }}>{data.location}</div>
        <div style={{ color: '#444', fontSize: 16 }}>{data.email} | {data.phone}</div>
      </div>
  <div style={{ marginLeft: 'auto', background: '#2563eb', color: '#fff', borderRadius: '16px', padding: '6px 20px', fontWeight: 'bold', fontSize: 18 }}>Modern</div>
    </div>
    <hr style={{ margin: '24px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
    <section>
      <h2 style={{ fontSize: 22, marginBottom: 10, color: '#2563eb', fontWeight: 'bold' }}>Summary</h2>
      <p style={{ fontSize: 16, color: '#222', marginBottom: 0 }}>{data.summary}</p>
    </section>
    <hr style={{ margin: '24px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
    <section>
      <h2 style={{ fontSize: 22, marginBottom: 10, color: '#2563eb', fontWeight: 'bold' }}>Skills</h2>
      <div style={{ display: 'flex', gap: '32px' }}>
        <ul style={{ flex: 1, fontSize: 16, color: '#222', margin: 0, padding: 0, listStyle: 'none' }}>
          {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, idx) => <li key={idx} style={{ marginBottom: 6 }}>{skill}</li>)}
        </ul>
        <ul style={{ flex: 1, fontSize: 16, color: '#222', margin: 0, padding: 0, listStyle: 'none' }}>
          {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, idx) => <li key={idx} style={{ marginBottom: 6 }}>{skill}</li>)}
        </ul>
      </div>
    </section>
    <hr style={{ margin: '24px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
    <section>
      <h2 style={{ fontSize: 22, marginBottom: 10, color: '#2563eb', fontWeight: 'bold' }}>Experience</h2>
      {data.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 'bold', fontSize: 18, color: '#222' }}>{exp.title}</div>
          <div style={{ fontSize: 16, color: '#444', marginBottom: 4 }}>{exp.company} ({exp.period})</div>
          <ul style={{ fontSize: 16, color: '#222', margin: 0, paddingLeft: 18 }}>
            {exp.details.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
          </ul>
        </div>
      ))}
    </section>
    <hr style={{ margin: '24px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
    <section>
      <h2 style={{ fontSize: 22, marginBottom: 10, color: '#2563eb', fontWeight: 'bold' }}>Education & Training</h2>
      {data.education.map((edu, idx) => (
        <div key={idx} style={{ fontSize: 16, color: '#222', marginBottom: 6 }}>{edu.degree} - {edu.institution} ({edu.year})</div>
      ))}
    </section>
    <hr style={{ margin: '24px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
    <section>
      <h2 style={{ fontSize: 22, marginBottom: 10, color: '#2563eb', fontWeight: 'bold' }}>Languages</h2>
      <ul style={{ fontSize: 16, color: '#222', margin: 0, paddingLeft: 18 }}>
        {data.languages.map((lang, idx) => <li key={idx} style={{ marginBottom: 4 }}>{lang}</li>)}
      </ul>
    </section>
  </div>
);

export default ModernDesign;
