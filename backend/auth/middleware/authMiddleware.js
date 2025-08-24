const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
