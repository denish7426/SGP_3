import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernDesign from './ResumeDesigns/ModernDesign';
import ClassicDesign from './ResumeDesigns/ClassicDesign';
import CreativeDesign from './ResumeDesigns/CreativeDesign';


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
    'Inventory management', 'Accurate money handling', 'Documentation and recordkeeping', 'Retail merchandising expertise'
  ],
  experience: [
    {
      title: 'Retail Sales Associate',
      company: 'ZARA - New Delhi, India',
      period: '02/2017 - Current',
      details: [
        'Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.',
        'Proactively reduce losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.',
        'Processed payments and maintained accurate drawers to meet financial targets.'
      ]
    },
    {
      title: 'Barista',
      company: 'Dunkin’ Donuts - New Delhi, India',
      period: '05/2016 - 01/2017',
      details: [
        'Upsold seasonal drinks and pastries, boosting average store sales by $150 weekly.',
        'Managed morning rush of over 200 customers daily with efficient, levelheaded customer service.',
        'Trained entire staff of 13 baristas in new smoothie program offerings and procedures.'
      ]
    }
  ],
  education: [
    { degree: 'Diploma in Financial Accounting', institution: 'Oxford Software Institute & Oxford School of English - New Delhi, India', year: '2016' }
  ],
  languages: ['Hindi: Native speaker', 'English: Proficient']
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
    <div className="min-w-screen" style={{ padding: '0', background: '#fff', minHeight: '100vh', minWidth: '100vw', display: 'flex' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Let’s Make Your Resume</h1>
  <p style={{ fontSize: 20, marginBottom: 32, color: '#000' }}>Include your full name and multiple ways for employers to reach you.</p>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Left: All Form Sections */}
          <form style={{ minWidth: 500, maxWidth: 600 }}>
            {/* Header Section */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>FIRST NAME</label>
                <input
                  type="text"
                  value={formData.name.split(' ')[0]}
                  onChange={e => setFormData({ ...formData, name: e.target.value + ' ' + (formData.name.split(' ')[1] || '') })}
                  placeholder="First Name"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>SURNAME</label>
                <input
                  type="text"
                  value={formData.name.split(' ')[1] || ''}
                  onChange={e => setFormData({ ...formData, name: (formData.name.split(' ')[0] || '') + ' ' + e.target.value })}
                  placeholder="Surname"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>CITY</label>
                <input
                  type="text"
                  value={formData.location.split(',')[0]}
                  onChange={e => setFormData({ ...formData, location: e.target.value + ', ' + (formData.location.split(',')[1] || '') })}
                  placeholder="City"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>COUNTRY</label>
                <input
                  type="text"
                  value={formData.location.split(',')[1]?.split(' ')[1] || 'India'}
                  onChange={e => setFormData({ ...formData, location: (formData.location.split(',')[0] || '') + ', ' + e.target.value + ' ' + (formData.location.split(' ')[2] || '') })}
                  placeholder="Country"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>PIN CODE</label>
                <input
                  type="text"
                  value={formData.location.split(' ')[2] || ''}
                  onChange={e => setFormData({ ...formData, location: (formData.location.split(',')[0] || '') + ', ' + (formData.location.split(',')[1]?.split(' ')[1] || 'India') + ' ' + e.target.value })}
                  placeholder="Pin Code"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>PHONE</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 11 1234 5677"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>EMAIL*</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="d.agarwal@sample.in"
                  style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', fontSize: 18, color: '#000' }}
                />
              </div>
            </div>
            {/* Experience Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Experience</label>
              {/* You can expand this to allow editing experience entries */}
              <textarea
                value={formData.experience.map(e => `${e.title} at ${e.company} (${e.period})\n${e.details.join('\n')}`).join('\n\n')}
                onChange={e => {/* handle experience editing here */}}
                placeholder="Add your experience details"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', minHeight: 80, fontSize: 16, color: '#000' }}
              />
            </div>
            {/* Education Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Education</label>
              <textarea
                value={formData.education.map(e => `${e.degree} - ${e.institution} (${e.year})`).join('\n')}
                onChange={e => {/* handle education editing here */}}
                placeholder="Add your education details"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', minHeight: 60, fontSize: 16, color: '#000' }}
              />
            </div>
            {/* Skills Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Skills</label>
              <textarea
                value={formData.skills.join(', ')}
                onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="Add your skills separated by commas"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', minHeight: 40, fontSize: 16, color: '#000' }}
              />
            </div>
            {/* Summary Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Summary</label>
              <textarea
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Add your summary"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', minHeight: 40, fontSize: 16, color: '#000' }}
              />
            </div>
            {/* Additional Details Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Additional Details</label>
              <textarea
                value={formData.languages.join(', ')}
                onChange={e => setFormData({ ...formData, languages: e.target.value.split(',').map(l => l.trim()) })}
                placeholder="Add languages separated by commas"
                style={{ width: '100%', marginTop: 4, marginBottom: 12, padding: 12, borderRadius: 4, border: '1px solid #d1d5db', minHeight: 40, fontSize: 16, color: '#000' }}
              />
            </div>
            {/* Finalize Section */}
            <div style={{ marginBottom: 16 }}>
              {/* <label className="text-gray-600" style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>Finalize</label> */}
              <button
                style={{ background: '#2563eb', color: '#0a0a0aff', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 18, border: 'none', cursor: 'pointer' }}
                onClick={handleBuildResume}
              >
                Build Resume
              </button>
            </div>
          </form>
          {/* Right: Live Preview */}
          <div style={{ minWidth: 400, maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: 600, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', borderRadius: 8, background: '#fff', marginBottom: 24, padding: 8, color: '#000' }}>
              <div style={{ color: '#000', width: '100%' }}>
                <TemplateComponent data={{ ...formData, color: '#000' }} />
              </div>
            </div>
            <button
              style={{ background: 'none', color: '#2563eb', border: 'none', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setSelected((selected + 1) % templates.length)}
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