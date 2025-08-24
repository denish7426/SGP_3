const express = require('express');
const router = express.Router();
const adminControllers = require('../controller/adminControllers');
const { adminAuth, requirePermission, requireRole } = require('../middleware/adminMiddleware');

// Admin Authentication
router.post('/login', adminControllers.adminLogin);

// Protected routes - require admin authentication
router.use(adminAuth);

// User Management
router.get('/users', requirePermission('userManagement'), adminControllers.getAllUsers);
router.patch('/users/:id/status', requirePermission('userManagement'), adminControllers.updateUserStatus);

// Company Management
router.get('/companies', requirePermission('companyManagement'), adminControllers.getAllCompanies);

// Content Moderation
router.get('/reports', requirePermission('contentModeration'), adminControllers.getContentReports);

// Analytics
router.get('/analytics', requirePermission('analytics'), adminControllers.getPlatformAnalytics);

module.exports = router;
