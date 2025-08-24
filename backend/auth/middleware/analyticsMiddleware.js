const Analytics = require('../models/analytics');

// Middleware to track user registrations
const trackUserRegistration = async (req, res, next) => {
    try {
        if (req.body && req.body.email) {
            await Analytics.create({
                metric: 'user_registration',
                value: { email: req.body.email, timestamp: new Date() },
                userModel: 'User'
            });
        }
    } catch (error) {
        console.error('Error tracking user registration:', error);
    }
    next();
};

// Middleware to track company registrations
const trackCompanyRegistration = async (req, res, next) => {
    try {
        if (req.body && req.body.contactEmail) {
            await Analytics.create({
                metric: 'company_registration',
                value: { 
                    companyName: req.body.companyName,
                    email: req.body.contactEmail, 
                    industry: req.body.industry,
                    timestamp: new Date() 
                },
                userModel: 'Company'
            });
        }
    } catch (error) {
        console.error('Error tracking company registration:', error);
    }
    next();
};

// Middleware to track employee registrations
const trackEmployeeRegistration = async (req, res, next) => {
    try {
        if (req.body && req.body.email) {
            await Analytics.create({
                metric: 'employee_registration',
                value: { 
                    email: req.body.email, 
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    timestamp: new Date() 
                },
                userModel: 'Employee'
            });
        }
    } catch (error) {
        console.error('Error tracking employee registration:', error);
    }
    next();
};

module.exports = {
    trackUserRegistration,
    trackCompanyRegistration,
    trackEmployeeRegistration
};
