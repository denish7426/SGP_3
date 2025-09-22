import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernDesign from './ResumeDesigns/ModernDesign';
import ClassicDesign from './ResumeDesigns/ClassicDesign';
import CreativeDesign from './ResumeDesigns/CreativeDesign';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const templates = [
  { name: 'Modern', component: ModernDesign },
  { name: 'Classic', component: ClassicDesign },
  { name: 'Creative', component: CreativeDesign },
];

const defaultData = {
  initials: 'DA',
  name: 'Diya Agarwal',
  location: 'New Delhi, India 110054',
  email: 'd.agarwal@email.com',
  phone: '+91 111 5555 3345',
  summary: 'Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering 5 years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.',
  skills: [
    'Cash register operation', 'POS system operation', 'Sales expertise', 'Teamwork',
    'Inventory management', 'Accurate money handling', 'Documentation and recordkeeping', 'Retail merchandising expertise',
    'Customer service', 'Problem solving', 'Communication', 'Adaptability'
  ],
  experience: [
    {
      title: 'Retail Sales Associate',
      company: 'ZARA - New Delhi, India',
      period: '02/2017 - Current',
      details: [
        'Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.',
        'Proactively reduce losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.',
        'Processed payments and maintained accurate drawers to meet financial targets.',
        'Provided exceptional customer service, resulting in 95% positive feedback ratings.'
      ]
    },
    {
      title: 'Barista',
      company: 'Dunkin\' Donuts - New Delhi, India',
      period: '05/2016 - 01/2017',
      details: [
        'Upsold seasonal drinks and pastries, boosting average store sales by $150 weekly.',
        'Managed morning rush of over 200 customers daily with efficient, levelheaded customer service.',
        'Trained entire staff of 13 baristas in new smoothie program offerings and procedures.',
        'Implemented new inventory tracking system that reduced waste by 15%.'
      ]
    }
  ],
  education: [
    { degree: 'Diploma in Financial Accounting', institution: 'Oxford Software Institute & Oxford School of English - New Delhi, India', year: '2016' },
    { degree: 'Certificate in Customer Service Excellence', institution: 'Retail Skills Academy - New Delhi, India', year: '2018' }
  ],
  languages: ['Hindi: Native speaker', 'English: Proficient', 'Spanish: Basic']
};

const ResumeBuilder = () => {
  const [selected, setSelected] = useState(0);
  const [formData, setFormData] = useState(defaultData);
  const navigate = useNavigate();

  const TemplateComponent = templates[selected].component;
  const [showResume, setShowResume] = useState(false);

  const handleBuildResume = (e) => {
  e.preventDefault();
  localStorage.setItem('resumeData', JSON.stringify(formData));
  localStorage.setItem('resumeTemplate', selected);
  navigate('/resume-preview');
};

  return (
    <div className="min-w-screen" style={{ padding: '0', background: 'linear-gradient(135deg, #FFE8B4 0%, #f8f5f0 100%)', minHeight: '100vh', minWidth: '100vw', display: 'flex' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 8, color: '#6B3226', textShadow: '0 1px 2px rgba(107, 50, 38, 0.1)' }}>Let's Make Your Resume</h1>
        <p style={{ fontSize: 20, marginBottom: 32, color: '#B85D34' }}>Include your full name and multiple ways for employers to reach you.</p>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Left: All Form Sections */}
          <form style={{ minWidth: 500, maxWidth: 600, background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(107, 50, 38, 0.08)', border: '1px solid #FFE8B4' }}>
            {/* Header Section */}
            <div style={{ marginBottom: 24, borderBottom: '2px solid #FFE8B4', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Personal Information</h2>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaUser size={14} /> FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name.split(' ')[0]}
                    onChange={e => setFormData({ ...formData, name: e.target.value + ' ' + (formData.name.split(' ')[1] || '') })}
                    placeholder="First Name"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaUser size={14} /> SURNAME
                  </label>
                  <input
                    type="text"
                    value={formData.name.split(' ')[1] || ''}
                    onChange={e => setFormData({ ...formData, name: (formData.name.split(' ')[0] || '') + ' ' + e.target.value })}
                    placeholder="Surname"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaMapMarkerAlt size={14} /> CITY
                  </label>
                  <input
                    type="text"
                    value={formData.location.split(',')[0]}
                    onChange={e => setFormData({ ...formData, location: e.target.value + ', ' + (formData.location.split(',')[1] || '') })}
                    placeholder="City"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #cbd5e0', fontSize: 16, color: '#2d3748', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaMapMarkerAlt size={14} /> COUNTRY
                  </label>
                  <input
                    type="text"
                    value={formData.location.split(',')[1]?.split(' ')[1] || 'India'}
                    onChange={e => setFormData({ ...formData, location: (formData.location.split(',')[0] || '') + ', ' + e.target.value + ' ' + (formData.location.split(' ')[2] || '') })}
                    placeholder="Country"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #cbd5e0', fontSize: 16, color: '#2d3748', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaMapMarkerAlt size={14} /> PIN CODE
                  </label>
                  <input
                    type="text"
                    value={formData.location.split(' ')[2] || ''}
                    onChange={e => setFormData({ ...formData, location: (formData.location.split(',')[0] || '') + ', ' + (formData.location.split(',')[1]?.split(' ')[1] || 'India') + ' ' + e.target.value })}
                    placeholder="Pin Code"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #cbd5e0', fontSize: 16, color: '#2d3748', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaPhone size={14} /> PHONE
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 11 1234 5677"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #cbd5e0', fontSize: 16, color: '#2d3748', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 'bold', fontSize: 14, color: '#B85D34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaEnvelope size={14} /> EMAIL*
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="d.agarwal@sample.in"
                    style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #cbd5e0', fontSize: 16, color: '#2d3748', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
                  />
                </div>
              </div>
            </div>
            {/* Experience Section */}
            <div style={{ marginBottom: 24, borderBottom: '2px solid #FFE8B4', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Professional Experience</h2>
              {/* You can expand this to allow editing experience entries */}
              <textarea
                value={formData.experience.map(e => `${e.title} at ${e.company} (${e.period})\n${e.details.join('\n')}`).join('\n\n')}
                onChange={e => {/* handle experience editing here */}}
                placeholder="Add your experience details"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', minHeight: 120, fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
              />
            </div>
            {/* Education Section */}
            <div style={{ marginBottom: 24, borderBottom: '2px solid #FFE8B4', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Education</h2>
              <textarea
                value={formData.education.map(e => `${e.degree} - ${e.institution} (${e.year})`).join('\n')}
                onChange={e => {/* handle education editing here */}}
                placeholder="Add your education details"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', minHeight: 80, fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
              />
            </div>
            {/* Skills Section */}
            <div style={{ marginBottom: 24, borderBottom: '2px solid #FFE8B4', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Professional Skills</h2>
              <textarea
                value={formData.skills.join(', ')}
                onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="Add your skills separated by commas"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', minHeight: 80, fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
              />
            </div>
            {/* Summary Section */}
            <div style={{ marginBottom: 24, borderBottom: '2px solid #FFE8B4', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Professional Summary</h2>
              <textarea
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Add your summary"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', minHeight: 80, fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
              />
            </div>
            {/* Additional Details Section */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#6B3226', marginBottom: '16px' }}>Languages</h2>
              <textarea
                value={formData.languages.join(', ')}
                onChange={e => setFormData({ ...formData, languages: e.target.value.split(',').map(l => l.trim()) })}
                placeholder="Add languages separated by commas"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #FFE8B4', minHeight: 80, fontSize: 16, color: '#6B3226', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(107, 50, 38, 0.05)' }}
              />
            </div>
            {/* Finalize Section */}
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <button
                style={{ background: 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)', color: 'white', borderRadius: 8, padding: '14px 36px', fontWeight: 'bold', fontSize: 18, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(184, 93, 52, 0.3)', transition: 'all 0.2s ease' }}
                onClick={handleBuildResume}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #A04B27 0%, #5A2A1F 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #B85D34 0%, #6B3226 100%)'}
              >
                Build Resume
              </button>
            </div>
          </form>
          {/* Right: Live Preview */}
          <div style={{ minWidth: 400, maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: 600, boxShadow: '0 4px 20px rgba(107, 50, 38, 0.12)', borderRadius: 12, background: '#fff', marginBottom: 24, padding: 16, color: '#000', border: '1px solid #FFE8B4' }}>
              <div style={{ color: '#000', width: '100%' }}>
                <TemplateComponent data={{ ...formData, color: '#000' }} />
              </div>
            </div>
            <button
              style={{ background: 'linear-gradient(135deg, #FF9F4F 0%, #B85D34 100%)', color: 'white', borderRadius: 8, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 159, 79, 0.3)', transition: 'all 0.2s ease' }}
              onClick={() => setSelected((selected + 1) % templates.length)}
              onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C2C 0%, #A04B27 100%)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #FF9F4F 0%, #B85D34 100%)'}
            >
              Change template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;