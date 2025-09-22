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

// Get all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
});

// Get resumes by username
router.get('/user/:username', async (req, res) => {
  try {
    const resumes = await Resume.find({ username: req.params.username });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user resumes', error });
  }
});

// Get resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error });
  }
});

module.exports = router;