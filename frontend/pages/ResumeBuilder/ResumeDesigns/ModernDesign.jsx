import React from 'react';

const ModernDesign = ({ data }) => {
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
    <div style={{ fontFamily: 'system-ui, sans-serif', color: colors.text, maxWidth: '100%', margin: '0 auto' }}>
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: `2px solid ${colors.accent}`, paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.primary, marginBottom: '5px' }}>{data.name}</h1>
          <p style={{ fontSize: '14px', color: colors.secondary, marginBottom: '5px' }}>{data.location}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '14px', marginBottom: '5px', color: colors.secondary }}>{data.email}</p>
          <p style={{ fontSize: '14px', color: colors.secondary }}>{data.phone}</p>
        </div>
      </header>

      {/* Summary Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Professional Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{data.summary}</p>
      </section>

      {/* Skills Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {data.skills.map((skill, index) => (
            <span key={index} style={{ 
              padding: '5px 10px', 
              backgroundColor: colors.light, 
              color: colors.primary, 
              borderRadius: '15px', 
              fontSize: '12px',
              border: `1px solid ${colors.accent}`
            }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Professional Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary, marginBottom: '5px' }}>{exp.title}</h3>
            <p style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</p>
            <p style={{ fontSize: '12px', color: colors.secondary, marginBottom: '5px' }}>{exp.period}</p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
              {exp.details.map((detail, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary, marginBottom: '5px' }}>{edu.degree}</h3>
            <p style={{ fontSize: '14px', marginBottom: '3px' }}>{edu.institution}</p>
            <p style={{ fontSize: '12px', color: colors.secondary }}>{edu.year}</p>
          </div>
        ))}
      </section>

      {/* Languages Section */}
      <section>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px', borderBottom: `1px solid ${colors.accent}`, paddingBottom: '5px' }}>Languages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {data.languages.map((language, index) => (
            <span key={index} style={{ 
              padding: '5px 10px', 
              backgroundColor: colors.light, 
              color: colors.primary, 
              borderRadius: '15px', 
              fontSize: '12px',
              border: `1px solid ${colors.accent}`
            }}>
              {language}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModernDesign;