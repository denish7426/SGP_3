import React from 'react';
import ModernDesign from './ResumeDesigns/ModernDesign';
import ClassicDesign from './ResumeDesigns/ClassicDesign';
import CreativeDesign from './ResumeDesigns/CreativeDesign';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const templates = [
  { name: 'Modern', component: ModernDesign },
  { name: 'Classic', component: ClassicDesign },
  { name: 'Creative', component: CreativeDesign },
];

const ResumePreview = () => {
  const resumeData = JSON.parse(localStorage.getItem('resumeData'));
  const selected = parseInt(localStorage.getItem('resumeTemplate'), 10) || 0;
  const TemplateComponent = templates[selected].component;

  // Assume username is stored in localStorage (or get from context/auth)
  const username = localStorage.getItem('username') || 'guest';
  const [isSaved, setIsSaved] = React.useState(false);

  const saveToDatabase = async () => {
    if (isSaved) return;
    try {
      const response = await fetch('http://localhost:3000/api/resume/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resumeData, template: selected, username })
      });
      const result = await response.json();
      if (response.ok) {
        setIsSaved(true);
        // Optionally show a message
      }
    } catch (err) {
      // Optionally handle error
    }
  };

  const exportPDF = async () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    let y = 60;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(resumeData.name || '', 40, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    y += 24;
    doc.text(resumeData.location || '', 40, y);
    y += 18;
    doc.text(`${resumeData.email || ''} | ${resumeData.phone || ''}`, 40, y);
    y += 32;
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235); // #2563eb
    doc.text('Summary', 40, y);
    doc.setTextColor(0, 0, 0);
    y += 18;
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(resumeData.summary || '', 500), 40, y);
    y += 40;
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Skills', 40, y);
    doc.setTextColor(0, 0, 0);
    y += 18;
    doc.setFontSize(12);
    if (resumeData.skills && resumeData.skills.length) {
      // Split skills into two columns
      const mid = Math.ceil(resumeData.skills.length / 2);
      const leftSkills = resumeData.skills.slice(0, mid);
      const rightSkills = resumeData.skills.slice(mid);
      leftSkills.forEach((skill, i) => {
        doc.text(skill, 40, y + i * 14);
      });
      rightSkills.forEach((skill, i) => {
        doc.text(skill, 240, y + i * 14);
      });
      y += Math.max(leftSkills.length, rightSkills.length) * 14 + 10;
    }
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Experience', 40, y);
    doc.setTextColor(0, 0, 0);
    y += 18;
    doc.setFontSize(13);
    if (resumeData.experience && resumeData.experience.length) {
      resumeData.experience.forEach(exp => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.title} | ${exp.company} (${exp.period})`, 40, y);
        y += 16;
        doc.setFont('helvetica', 'normal');
        exp.details.forEach(detail => {
          doc.text('- ' + detail, 60, y);
          y += 14;
        });
        y += 10;
      });
    }
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Education & Training', 40, y);
    doc.setTextColor(0, 0, 0);
    y += 18;
    doc.setFontSize(13);
    if (resumeData.education && resumeData.education.length) {
      resumeData.education.forEach(edu => {
        doc.text(`${edu.degree} - ${edu.institution} (${edu.year})`, 40, y);
        y += 16;
      });
      y += 10;
    }
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Languages', 40, y);
    doc.setTextColor(0, 0, 0);
    y += 18;
    doc.setFontSize(13);
    if (resumeData.languages && resumeData.languages.length) {
      doc.text(doc.splitTextToSize(resumeData.languages.join(', '), 500), 40, y);
      y += 20;
    }
    doc.save('resume.pdf');
  };

  if (!resumeData) {
    return <div style={{ padding: 32 }}>No resume data found. Please build your resume first.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', maxWidth: '100vw', width: '100vw', color: '#000' }}>
        <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#000' }}>Your Built Resume</h1>
        <PDFDownloadLink document={<ResumePDF data={resumeData} />} fileName="resume.pdf">
          {({ loading }) => (
            <button style={{ marginBottom: 24, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
              {loading ? 'Preparing PDF...' : 'Export as PDF'}
            </button>
          )}
        </PDFDownloadLink>
        <div id="resume-preview-content" style={{ color: '#000', width: '100%' }}>
          <TemplateComponent data={{ ...resumeData, color: '#000' }} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
