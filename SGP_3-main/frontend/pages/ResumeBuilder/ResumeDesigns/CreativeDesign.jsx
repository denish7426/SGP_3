import React from 'react';

const CreativeDesign = ({ data }) => (
  <div style={{ border: '2px dashed #f59e42', borderRadius: '12px', padding: '32px', maxWidth: '800px', background: '#fffbe6', fontFamily: 'cursive' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
      <div style={{ width: 60, height: 60, background: '#f59e42', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', marginRight: 16 }}>
        {data.initials}
      </div>
      <div>
        <h1 style={{ margin: 0, fontSize: 28 }}>{data.name}</h1>
        <div style={{ color: '#f59e42' }}>{data.location}</div>
        <div style={{ color: '#f59e42', fontSize: 14 }}>{data.email} | {data.phone}</div>
      </div>
      <div style={{ marginLeft: 'auto', background: '#f59e42', color: '#fff', borderRadius: '16px', padding: '4px 16px', fontWeight: 'bold' }}>Creative</div>
    </div>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Summary</h2>
      <p>{data.summary}</p>
    </section>
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Skills</h2>
      <ul style={{ columns: 2 }}>
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

export default CreativeDesign;
