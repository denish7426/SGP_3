import React from 'react';

const ClassicDesign = ({ data }) => (
  <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '32px', maxWidth: '800px', background: '#f9fafb', fontFamily: 'serif' }}>
    <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>{data.name}</h1>
    <div style={{ color: '#374151', marginBottom: 16 }}>{data.location} | {data.email} | {data.phone}</div>
    <div style={{ background: '#e5e7eb', borderRadius: '8px', padding: '8px 16px', display: 'inline-block', marginBottom: 16 }}>Classic</div>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Summary</h2>
      <p>{data.summary}</p>
    </section>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Skills</h2>
      <ul>
        {data.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
      </ul>
    </section>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Experience</h2>
      {data.experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <strong>{exp.title}</strong> | {exp.company} ({exp.period})<br />
          <ul>
            {exp.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      ))}
    </section>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Education and Training</h2>
      {data.education.map((edu, idx) => (
        <div key={idx}>{edu.degree} - {edu.institution} ({edu.year})</div>
      ))}
    </section>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Languages</h2>
      <ul>
        {data.languages.map((lang, idx) => <li key={idx}>{lang}</li>)}
      </ul>
    </section>
  </div>
);

export default ClassicDesign;
