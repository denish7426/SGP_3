const express = require('express');
const router = express.Router();
const Resume = require('../models/resume');

// Save resume
router.post('/save', async (req, res) => {
  try {
    const resume = new Resume({ ...req.body });
    await resume.save();
    res.status(201).json({ message: 'Resume saved successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error saving resume', error });
  }
});

// Get all resumes (optional)
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
});

module.exports = router;
