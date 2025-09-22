const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }
});

module.exports = mongoose.model('Contest', contestSchema);
