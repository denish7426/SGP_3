import React from 'react';

const CreativeDesign = ({ data }) => {
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
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', color: colors.text, maxWidth: '100%', margin: '0 auto', position: 'relative' }}>
      {/* Decorative Element */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '30%', 
        height: '100%', 
        backgroundColor: colors.light,
        zIndex: -1,
        borderRight: `3px solid ${colors.accent}`
      }}></div>

      {/* Header Section - Creative asymmetric layout */}
      <header style={{ display: 'flex', marginBottom: '30px', paddingLeft: '35%', position: 'relative' }}>
        <div style={{ width: '100%' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: colors.primary, marginBottom: '10px' }}>{data.name}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '14px', color: colors.secondary }}>
            <p>{data.phone}</p>
            <p>{data.email}</p>
            <p>{data.location}</p>
          </div>
        </div>
      </header>

      {/* Left Column - Contact & Skills */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', paddingRight: '20px' }}>
          {/* Skills Section */}
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: colors.primary, 
              marginBottom: '15px', 
              padding: '5px 10px',
              backgroundColor: colors.accent,
              display: 'inline-block',
              borderRadius: '0 15px 15px 0'
            }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.skills.map((skill, index) => (
                <p key={index} style={{ 
                  fontSize: '13px', 
                  margin: 0, 
                  color: colors.primary,
                  fontWeight: index % 2 === 0 ? 'bold' : 'normal'
                }}>
                  {skill}
                </p>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: colors.primary, 
              marginBottom: '15px', 
              padding: '5px 10px',
              backgroundColor: colors.accent,
              display: 'inline-block',
              borderRadius: '0 15px 15px 0'
            }}>Languages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {data.languages.map((language, index) => (
                <p key={index} style={{ fontSize: '13px', margin: 0, color: colors.primary }}>
                  {language}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Main Content */}
        <div style={{ width: '70%', paddingLeft: '20px' }}>
          {/* Summary Section */}
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: colors.primary, 
              marginBottom: '10px', 
              borderBottom: `2px solid ${colors.accent}`, 
              paddingBottom: '5px',
              position: 'relative'
            }}>
              Professional Summary
              <span style={{ 
                position: 'absolute', 
                bottom: '-2px', 
                left: 0, 
                width: '50px', 
                height: '2px', 
                backgroundColor: colors.secondary 
              }}></span>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{data.summary}</p>
          </section>

          {/* Experience Section */}
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: colors.primary, 
              marginBottom: '10px', 
              borderBottom: `2px solid ${colors.accent}`, 
              paddingBottom: '5px',
              position: 'relative'
            }}>
              Professional Experience
              <span style={{ 
                position: 'absolute', 
                bottom: '-2px', 
                left: 0, 
                width: '50px', 
                height: '2px', 
                backgroundColor: colors.secondary 
              }}></span>
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary }}>{exp.title}</h3>
                  <p style={{ 
                    fontSize: '13px', 
                    color: colors.light, 
                    backgroundColor: colors.secondary,
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>{exp.period}</p>
                </div>
                <p style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '8px', color: colors.primary }}>{exp.company}</p>
                <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
                  {exp.details.map((detail, i) => (
                    <li key={i} style={{ marginBottom: '5px' }}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Education Section */}
          <section>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: colors.primary, 
              marginBottom: '10px', 
              borderBottom: `2px solid ${colors.accent}`, 
              paddingBottom: '5px',
              position: 'relative'
            }}>
              Education
              <span style={{ 
                position: 'absolute', 
                bottom: '-2px', 
                left: 0, 
                width: '50px', 
                height: '2px', 
                backgroundColor: colors.secondary 
              }}></span>
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.secondary }}>{edu.degree}</h3>
                  <p style={{ 
                    fontSize: '13px', 
                    color: colors.light, 
                    backgroundColor: colors.secondary,
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>{edu.year}</p>
                </div>
                <p style={{ fontSize: '15px', fontStyle: 'italic', color: colors.primary }}>{edu.institution}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreativeDesign;