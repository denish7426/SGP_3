const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const admin = await Admin.findById(decoded.id);

        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: 'Invalid or inactive admin account.' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.admin) {
            return res.status(401).json({ message: 'Admin authentication required.' });
        }

        if (!req.admin.permissions[permission]) {
            return res.status(403).json({ message: 'Insufficient permissions.' });
        }

        next();
    };
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.admin) {
            return res.status(401).json({ message: 'Admin authentication required.' });
        }

        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({ message: 'Insufficient role privileges.' });
        }

        next();
    };
};

module.exports = {
    adminAuth,
    requirePermission,
    requireRole
};
