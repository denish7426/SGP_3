import React from 'react';

const ClassicDesign = ({ data }) => {
  // Using the project's color theme
  const colors = {
    primary: '#6B3226', // Dark Cognac - for headings and important text
    secondary: '#B85D34', // Burnt Sienna - for section titles and accents
    accent: '#FF9F4F', // Sunset Amber - for highlights and borders
    light: '#FFE8B4', // Golden Sand - for backgrounds and subtle elements
    text: '#333333', // Dark text for readability
    background: '#FFFFFF' // White background
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: colors.text, maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
      {/* Header Section - Classic centered style */}
      <header style={{ textAlign: 'center', marginBottom: '30px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', letterSpacing: '1px' }}>{data.name}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: colors.secondary }}>
          <p>{data.phone}</p>
          <p>{data.email}</p>
          <p>{data.location}</p>
        </div>
      </header>

      {/* Summary Section */}
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Professional Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}>{data.summary}</p>
      </section>

      {/* Skills Section - Classic two-column layout */}
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {data.skills.map((skill, index) => (
            <p key={index} style={{ fontSize: '14px', margin: '3px 0', color: colors.secondary }}>
              • {skill}
            </p>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Professional Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary }}>{exp.title}</h3>
              <p style={{ fontSize: '14px', color: colors.secondary }}>{exp.period}</p>
            </div>
            <p style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '8px' }}>{exp.company}</p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
              {exp.details.map((detail, i) => (
                <li key={i} style={{ marginBottom: '5px' }}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary }}>{edu.degree}</h3>
              <p style={{ fontSize: '14px', color: colors.secondary }}>{edu.year}</p>
            </div>
            <p style={{ fontSize: '15px', fontStyle: 'italic' }}>{edu.institution}</p>
          </div>
        ))}
      </section>

      {/* Languages Section */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Languages</h2>
        <p style={{ fontSize: '14px' }}>{data.languages.join(' • ')}</p>
      </section>
    </div>
  );
};

export default ClassicDesign;