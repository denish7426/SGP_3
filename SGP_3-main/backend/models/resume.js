const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  username: String, // Add this field to store the profile/user who created the resume
  location: String,
  email: String,
  phone: String,
  summary: String,
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      period: String,
      details: [String]
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  languages: [String],
  template: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
