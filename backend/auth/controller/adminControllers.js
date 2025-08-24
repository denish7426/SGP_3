const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { User, Company, Employee } = require('../models/user');
const ContentModeration = require('../models/contentModeration');
const Analytics = require('../models/analytics');

// Admin Authentication
const adminRegister = async (req, res) => {
    try {
        const { username, email, password, role = 'admin' } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingAdmin) {
            return res.status(400).json({ 
                message: 'Admin with this email or username already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create admin user
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            role,
            permissions: {
                userManagement: role === 'super_admin' || role === 'admin',
                companyManagement: role === 'super_admin' || role === 'admin',
                contentModeration: true,
                analytics: role === 'super_admin' || role === 'admin',
                systemSettings: role === 'super_admin'
            },
            isActive: true
        });

        await admin.save();

        // Log analytics
        await Analytics.create({
            metric: 'admin_registration',
            value: { adminId: admin._id, role },
            userId: admin._id,
            userModel: 'Admin'
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                permissions: admin.permissions
            }
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: 'Invalid credentials or inactive account' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        admin.lastLogin = new Date();
        await admin.save();

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        await Analytics.create({
            metric: 'login_attempts',
            value: { success: true, adminId: admin._id },
            userId: admin._id,
            userModel: 'Admin'
        });

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                permissions: admin.permissions
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Management
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        
        let query = {};
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.json({
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { status, reason } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = status === 'active';
        if (reason) {
            user.statusReason = reason;
        }

        await user.save();

        await Analytics.create({
            metric: 'moderation_actions',
            value: { action: 'status_update', userId: user._id, status, reason },
            userId: req.admin._id,
            userModel: 'Admin'
        });

        res.json({ message: 'User status updated successfully', user });
    } catch (error) {
        console.error('Update user status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Company Management
const getAllCompanies = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        
        let query = {};
        if (search) {
            query.$or = [
                { companyName: { $regex: search, $options: 'i' } },
                { contactEmail: { $regex: search, $options: 'i' } }
            ];
        }

        const companies = await Company.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Company.countDocuments(query);

        res.json({
            companies,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get companies error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Content Moderation
const getContentReports = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = 'all' } = req.query;
        
        let query = {};
        if (status !== 'all') {
            query.status = status;
        }

        const reports = await ContentModeration.find(query)
            .populate('reportedBy', 'username email')
            .populate('assignedTo', 'username')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ priority: -1, createdAt: -1 });

        const total = await ContentModeration.countDocuments(query);

        res.json({
            reports,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get content reports error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Analytics
const getPlatformAnalytics = async (req, res) => {
    try {
        const now = new Date();
        const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const yearStart = new Date(now.getFullYear(), 0, 1);

        // Get total counts
        const totalUsers = await User.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalEmployees = await Employee.countDocuments();
        const totalContentReports = await ContentModeration.countDocuments();

        // Get weekly counts
        const weeklyUsers = await User.countDocuments({
            createdAt: { $gte: startDate }
        });
        const weeklyCompanies = await Company.countDocuments({
            createdAt: { $gte: startDate }
        });
        const weeklyEmployees = await Employee.countDocuments({
            createdAt: { $gte: startDate }
        });

        // Get monthly counts
        const monthlyUsers = await User.countDocuments({
            createdAt: { $gte: monthStart }
        });
        const monthlyCompanies = await Company.countDocuments({
            createdAt: { $gte: monthStart }
        });
        const monthlyEmployees = await Employee.countDocuments({
            createdAt: { $gte: monthStart }
        });

        // Get yearly counts
        const yearlyUsers = await User.countDocuments({
            createdAt: { $gte: yearStart }
        });
        const yearlyCompanies = await Company.countDocuments({
            createdAt: { $gte: yearStart }
        });
        const yearlyEmployees = await Employee.countDocuments({
            createdAt: { $gte: yearStart }
        });

        // Get recent registrations (last 10)
        const recentUsers = await User.find()
            .select('username email createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        const recentCompanies = await Company.find()
            .select('companyName industry contactEmail createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        const recentEmployees = await Employee.find()
            .select('firstName lastName email currentRole createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        // Get analytics data
        const analyticsData = await Analytics.aggregate([
            {
                $group: {
                    _id: '$metric',
                    count: { $sum: 1 },
                    lastActivity: { $max: '$timestamp' }
                }
            }
        ]);

        res.json({
            summary: {
                total: {
                    users: totalUsers,
                    companies: totalCompanies,
                    employees: totalEmployees,
                    contentReports: totalContentReports
                },
                weekly: {
                    users: weeklyUsers,
                    companies: weeklyCompanies,
                    employees: weeklyEmployees
                },
                monthly: {
                    users: monthlyUsers,
                    companies: monthlyCompanies,
                    employees: monthlyEmployees
                },
                yearly: {
                    users: yearlyUsers,
                    companies: yearlyCompanies,
                    employees: yearlyEmployees
                }
            },
            recent: {
                users: recentUsers,
                companies: recentCompanies,
                employees: recentEmployees
            },
            analytics: analyticsData
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    adminLogin,
    getAllUsers,
    updateUserStatus,
    getAllCompanies,
    getContentReports,
    getPlatformAnalytics
};
