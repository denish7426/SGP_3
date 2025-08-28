const express = require('express');
const router = express.Router();
const { register, login, registerCompany, registerEmployee, loginCompany, 
    loginEmployee , getAllEmployees , companyDashboard, companypostjob,
    employeeapplyjob,companyalljobs} = require('../controller/authControllers');
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

// POST /api/auth/post

router.route('/post').post(companypostjob);

//

router.route('/:jobId/apply').post(employeeapplyjob)

// router.route('/').get(companyalljobs)

router.route('/companyalljobs').get(companyalljobs)

// GET /api/auth/me - Get current user (protected route)
router.route('/me').get(auth, (req, res) => {
    res.json({ user: req.user });
});

// router.post('/post', (req, res) => {
//   res.json({ message: 'Job post API is working!', data: req.body });
// });const express = require('express');
// const router = express.Router();

router.post('/post', (req, res) => {
  res.json({ message: 'Job post API is working!', data: req.body });
});



module.exports = router;
    