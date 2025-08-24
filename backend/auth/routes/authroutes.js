const express = require('express');
const router = express.Router();
const { register, login, registerCompany, registerEmployee, loginCompany, loginEmployee , getAllEmployees , companyDashboard} = require('../controller/authControllers');
const auth = require('../middleware/authMiddleware');

// POST /api/auth/register
router.route('/register').post(register);

// POST /api/auth/login
router.route('/login').post(login);

// POST /api/auth/registerCompany
router.route('/registerCompany').post(registerCompany);

// POST /api/auth/loginCompany
router.route('/loginCompany').post(loginCompany);

// POST /api/auth/registerEmployee
router.route('/registerEmployee').post(registerEmployee);

// POST /api/auth/loginEmployee
router.route('/loginEmployee').post(loginEmployee);

//post /api/auth/comapnyDashboard
router.route('/companyDashboard').post(companyDashboard)

router.get('/employees', getAllEmployees);

// GET /api/auth/me - Get current user (protected route)
router.route('/me').get(auth, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
    