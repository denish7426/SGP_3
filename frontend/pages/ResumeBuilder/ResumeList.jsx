import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // Get username from localStorage (assuming user is logged in)
        const username = localStorage.getItem('username');
        
        if (!username) {
          setError('You must be logged in to view your resumes');
          setLoading(false);
          return;
        }
        
        // Fetch resumes for the current user
        const response = await axios.get(`http://localhost:3000/api/resume/user/${username}`);
        
        if (response.data.success) {
          setResumes(response.data.resumes);
        } else {
          setError('Failed to fetch resumes');
        }
      } catch (err) {
        console.error('Error fetching resumes:', err);
        setError('An error occurred while fetching your resumes');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleViewResume = (resume) => {
    // Store resume data in localStorage for preview
    localStorage.setItem('resumeData', JSON.stringify(resume));
    localStorage.setItem('resumeTemplate', resume.templateNumber.toString());
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your resumes...</div>;
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: '#f8f5f0' }}>
        <div style={{ backgroundColor: '#FFEBE6', border: '1px solid #B85D34', color: '#6B3226', padding: '0.75rem 1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
          {error}
        </div>
        <Link to="/resume-builder" style={{ color: '#B85D34', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
          Create a new resume
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #FFE8B4 0%, #FF9F4F 50%, #B85D34 100%)',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(107, 50, 38, 0.2), 0 10px 10px -5px rgba(107, 50, 38, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      color: '#6B3226',
      fontFamily: 'sans-serif'
    }}>
      {/* Glass morphism overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        zIndex: 0
      }}></div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2.5rem',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(107, 50, 38, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px',
            boxShadow: '0 4px 8px rgba(107, 50, 38, 0.3)',
            transform: 'translateZ(10px)',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>R</span>
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: '#6B3226',
            textShadow: '2px 2px 4px rgba(107, 50, 38, 0.15)',
            letterSpacing: '0.5px',
            margin: 0
          }}>My Resumes</h1>
        </div>
        <Link 
          to="/resume-builder"
          style={{ 
            padding: '0.5rem 1rem', 
            background: 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)', 
            color: 'white', 
            borderRadius: '0.375rem', 
            boxShadow: '0 2px 4px rgba(107, 50, 38, 0.1)', 
            transition: 'all 0.2s',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }} 
          onMouseOver={(e) => e.target.style.boxShadow = '0 4px 6px rgba(107, 50, 38, 0.2)'} 
          onMouseOut={(e) => e.target.style.boxShadow = '0 2px 4px rgba(107, 50, 38, 0.1)'}
        >
          Create New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem', 
          background: 'rgba(255, 255, 255, 0.7)', 
          borderRadius: '1rem', 
          boxShadow: '0 20px 40px -10px rgba(107, 50, 38, 0.15)', 
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          zIndex: 1
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 159, 79, 0.3) 0%, rgba(184, 93, 52, 0.3) 100%)',
            filter: 'blur(2px)',
            zIndex: -1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 232, 180, 0.4) 0%, rgba(255, 159, 79, 0.4) 100%)',
            filter: 'blur(3px)',
            zIndex: -1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 232, 180, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            zIndex: -1
          }}></div>
          <p style={{ color: '#6B3226', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>You haven't created any resumes yet.</p>
          <Link 
            to="/resume-builder"
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(107, 50, 38, 0.1)',
              transition: 'all 0.2s'
            }} 
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 4px 6px rgba(107, 50, 38, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }} 
            onMouseOut={(e) => {
              e.target.style.boxShadow = '0 2px 4px rgba(107, 50, 38, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create your first resume
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.5rem' }}>
          {resumes.map((resume) => (
            <div key={resume._id} style={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '1rem', 
              boxShadow: '0 10px 30px rgba(107, 50, 38, 0.1)', 
              overflow: 'hidden', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              backdropFilter: 'blur(8px)',
              zIndex: 1
            }} 
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(107, 50, 38, 0.15)';
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
              e.currentTarget.style.borderColor = 'rgba(255, 159, 79, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(107, 50, 38, 0.1)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '8px',
                height: '100%',
                background: 'linear-gradient(to bottom, #FF9F4F, #B85D34, #6B3226)'
              }}></div>
              <div style={{ padding: '1.75rem 1.75rem 1.75rem 2.25rem' }}>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '800', 
                  marginBottom: '1rem', 
                  color: '#6B3226',
                  borderBottom: '2px solid rgba(255, 159, 79, 0.5)',
                  paddingBottom: '0.75rem',
                  letterSpacing: '0.5px'
                }}>{resume.name}</h2>
                <p style={{ 
                  color: '#6B3226', 
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  opacity: '0.85',
                  maxWidth: '90%'
                }}>{resume.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link 
                    to="/resume-preview"
                    onClick={() => handleViewResume(resume)}
                    style={{ 
                      color: 'white', 
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.625rem 1.25rem',
                      borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)',
                      boxShadow: '0 4px 10px rgba(107, 50, 38, 0.15)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      letterSpacing: '0.5px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.boxShadow = '0 6px 15px rgba(107, 50, 38, 0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.boxShadow = '0 4px 10px rgba(107, 50, 38, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    View & Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;