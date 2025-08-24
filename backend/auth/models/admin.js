const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'moderator'],
        default: 'admin'
    },
    permissions: {
        userManagement: { type: Boolean, default: true },
        companyManagement: { type: Boolean, default: true },
        contentModeration: { type: Boolean, default: true },
        analytics: { type: Boolean, default: true },
        systemSettings: { type: Boolean, default: false }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
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

// Update timestamp on save
adminSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
