const ContestSubmission = require('../../models/contestSubmission');
const Contest = require('../../models/contest');
const Question = require('../../models/question');
const { User, Employee } = require('../models/user');

// Get all submissions for a contest (company view)
exports.getContestResults = async (req, res) => {
  try {
    const { contestId } = req.params;
    const submissions = await ContestSubmission.find({ contestId })
      .populate('employeeId', 'firstName lastName email')
      .populate('contestId', 'title');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user's submission for a contest (employee view)
exports.getMyContestResult = async (req, res) => {
  try {
    const { contestId, employeeId } = req.query;
    const submission = await ContestSubmission.findOne({ contestId, employeeId });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
