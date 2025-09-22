const mongoose = require('mongoose');

const contestSubmissionSchema = new mongoose.Schema({
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: String, required: true }
  }],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

contestSubmissionSchema.index({ contestId: 1, employeeId: 1 }, { unique: true });

module.exports = mongoose.model('ContestSubmission', contestSubmissionSchema);
