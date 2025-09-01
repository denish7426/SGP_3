const mongoose = require('mongoose');

const contentModerationSchema = new mongoose.Schema({
    contentType: {
        type: String,
        enum: ['user_profile', 'company_profile', 'job_posting', 'message', 'review'],
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'reportedByModel',
        required: true
    },
    reportedByModel: {
        type: String,
        enum: ['User', 'Company', 'Employee', 'Admin'],
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: [
            'inappropriate_content',
            'spam',
            'fake_information',
            'harassment',
            'copyright_violation',
            'other'
        ]
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    status: {
        type: String,
        enum: ['pending', 'under_review', 'resolved', 'dismissed'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    resolution: {
        action: {
            type: String,
            enum: ['warning', 'content_removal', 'account_suspension', 'account_ban', 'no_action']
        },
        notes: String,
        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        resolvedAt: Date
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

contentModerationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ContentModeration = mongoose.model('ContentModeration', contentModerationSchema);
module.exports = ContentModeration;
