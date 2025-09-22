const express = require('express');
const router = express.Router();
const { register, login, registerCompany, registerEmployee, loginCompany, 
  loginEmployee , getAllEmployees , companyDashboard, companypostjob,
  applyToJob,companyalljobs,Applicants, createContest, getAllQuestions, getAllContests, getContestById, submitContestAnswers } = require('../controller/authControllers');
const { getContestResults, getMyContestResult } = require('../controller/contestControllers');
// Company: Get all submissions for a contest
router.get('/contests/:id/results', getContestResults);
// Employee: Get my submission for a contest
router.get('/contests/:id/myresult', getMyContestResult);
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




// GET /api/auth/notifications - fetch notifications for logged-in employee
router.get('/notifications', auth, async (req, res) => {
  try {
  console.log('Fetching notifications for user:', req.user.id);
  const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
  console.log('Notifications found:', notifications.length);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.route('/applicants/:jobId').get(Applicants);

// router.route('/').get(companyalljobs)

router.route('/companyalljobs').get(companyalljobs)

router.post('/apply', applyToJob);


// GET /api/auth/me - Get current user (protected route)
router.route('/me').get(auth, (req, res) => {
    res.json({ user: req.user });
});



router.get('/notifications', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Company creates a contest
router.post('/createContest', createContest);

// Get all questions
router.get('/questions', getAllQuestions);
// Get all contests
router.get('/contests', getAllContests);
// Get contest by ID
router.get('/contests/:id', getContestById);

// Employee submits contest answers
router.post('/contests/:id/submit', submitContestAnswers);

// router.post('/post', (req, res) => {
//   res.json({ message: 'Job post API is working!', data: req.body });
// });const express = require('express');
// const router = express.Router();

// router.post('/post', (req, res) => {
//   res.json({ message: 'Job post API is working!', data: req.body });
// });



module.exports = router;
