const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    metric: {
        type: String,
        required: true,
        enum: [
            'user_registration',
            'company_registration',
            'employee_registration',
            'login_attempts',
            'content_reports',
            'moderation_actions',
            'platform_usage',
            'error_logs',
            'admin_registration'
        ]
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    },
    userModel: {
        type: String,
        enum: ['User', 'Company', 'Employee', 'Admin']
    },
    sessionId: String,
    ipAddress: String,
    userAgent: String
});

// Index for efficient querying
analyticsSchema.index({ metric: 1, timestamp: -1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
