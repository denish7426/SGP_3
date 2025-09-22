import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

// Import design components
import ModernDesign from './ResumeDesigns/ModernDesign';
import ClassicDesign from './ResumeDesigns/ClassicDesign';
import CreativeDesign from './ResumeDesigns/CreativeDesign';

const ResumePreview = () => {
  const [resumeData, setResumeData] = useState(null);
  const [resumeTemplate, setResumeTemplate] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const templates = [ModernDesign, ClassicDesign, CreativeDesign];
  const SelectedTemplate = templates[resumeTemplate];

  useEffect(() => {
    // Get resume data from local storage
    const storedData = localStorage.getItem('resumeData');
    const storedTemplate = localStorage.getItem('resumeTemplate');
    
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    } else {
      navigate('/resume-builder');
    }
    
    if (storedTemplate) {
      setResumeTemplate(parseInt(storedTemplate));
    }
  }, [navigate]);

  const handleSaveResume = async () => {
    try {
      setSaving(true);
      setError('');
      
      // Get username from localStorage (assuming user is logged in)
      const username = localStorage.getItem('username');
      
      if (!username) {
        setError('You must be logged in to save a resume');
        setSaving(false);
        return;
      }
      
      // Add username to resumeData
      const dataToSave = {
        ...resumeData,
        username,
        templateNumber: resumeTemplate
      };
      
      // Save to database
      const response = await axios.post('http://localhost:3000/api/resume/save', dataToSave);
      
      if (response.data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError('Failed to save resume');
      }
    } catch (err) {
      console.error('Error saving resume:', err);
      setError('An error occurred while saving your resume');
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Remove the blank first page issue by setting the correct position
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_resume.pdf`);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      setError('Failed to export PDF');
    }
  };

  const handleBack = () => {
    navigate('/resume-builder');
  };

  if (!resumeData) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: '#f8f5f0' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#6B3226' }}>Resume Preview</h1>
        <div className="space-x-4">
          <button 
            onClick={handleBack}
            style={{ 
              backgroundColor: '#FFE8B4', 
              color: '#6B3226', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFD380'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFE8B4'}
          >
            Back to Editor
          </button>
          <button 
            onClick={handleSaveResume}
            disabled={saving}
            style={{ 
              backgroundColor: '#B85D34', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              fontWeight: 'bold',
              border: 'none',
              cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => !saving && (e.currentTarget.style.backgroundColor = '#A04B27')}
            onMouseOut={(e) => !saving && (e.currentTarget.style.backgroundColor = '#B85D34')}
          >
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
          <button 
            onClick={handleExportPDF}
            style={{ 
              backgroundColor: '#FF9F4F', 
              color: '#6B3226', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FF8C2C'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF9F4F'}
          >
            Export as PDF (HTML2Canvas)
          </button>
          <PDFDownloadLink 
            document={<ResumePDF data={resumeData} templateNumber={resumeTemplate} />}
            fileName={`${resumeData.name.replace(/\s+/g, '_')}_resume.pdf`}
            style={{ 
              backgroundColor: '#6B3226', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5A2A1F'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6B3226'}
          >
            {({ blob, url, loading, error }) => 
              loading ? 'Generating PDF...' : 'Download PDF (React-PDF)'
            }
          </PDFDownloadLink>
        </div>
      </div>
      
      {error && (
        <div style={{
          backgroundColor: '#FFEBE6',
          border: '1px solid #B85D34',
          color: '#6B3226',
          padding: '0.75rem 1rem',
          borderRadius: '0.25rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      {saveSuccess && (
        <div style={{
          backgroundColor: '#E6FFE8',
          border: '1px solid #6B3226',
          color: '#6B3226',
          padding: '0.75rem 1rem',
          borderRadius: '0.25rem',
          marginBottom: '1rem'
        }}>
          Resume saved successfully!
        </div>
      )}
      
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 12px rgba(107, 50, 38, 0.15)',
          padding: '1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
          border: '1px solid #FFE8B4'
        }} 
        ref={resumeRef}
      >
        {SelectedTemplate && <SelectedTemplate data={resumeData} />}
      </div>
    </div>
  );
};

export default ResumePreview;