const {User, Company, Employee, Job} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
const { Notification } = require('../models/user');
const Contest = require('../../models/contest');
const Question = require('../../models/question');
const { sendMail } = require('../../utils/mailer');

exports.register = async (req, res) => {
    const {username, password, email} = req.body;
    
    // Validation
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    try {
        // Check if user already exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this username or email' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        user = new User({ username, password: hashedPassword, email });
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    
    // Validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    try {
        // Find user by username or email
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }] 
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.registerCompany = async (req, res) => {
    try {
        const { companyName, password, contactEmail, ...otherData } = req.body;
        
        // Check if company already exists
        let existingCompany = await Company.findOne({ 
            $or: [{ companyName }, { contactEmail }] 
        });
        if (existingCompany) {
            return res.status(400).json({ 
                message: 'Company already exists with this name or email' 
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new Company instance with hashed password
        const newCompany = new Company({
            ...otherData,
            companyName,
            contactEmail,
            password: hashedPassword
        });

        // Save the new company to the database
        const savedCompany = await newCompany.save();

        // Send a success response with the saved company data
        res.status(201).json({
            message: 'Company registered successfully!',
            company: {
                id: savedCompany._id,
                companyName: savedCompany.companyName,
                contactEmail: savedCompany.contactEmail
            }
        });
    } catch (error) {
        // Handle validation errors (e.g., required fields missing, unique constraint violated)
        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors
            });
        }
        // Handle duplicate key errors (e.g., unique companyName or contactEmail)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
            return res.status(409).json({
                message: `Duplicate entry: A company with that ${field} '${value}' already exists.`,
                errors: { [field]: `This ${field} is already taken.` }
            });
        }
        // Handle other server errors
        console.error('Error registering company:', error);
        res.status(500).json({ message: 'Server error: Failed to register company.' });
    }
};

exports.registerEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, password, ...otherData } = req.body;
        
        // Check if employee already exists
        let existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ 
                message: 'Employee already exists with this email' 
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new employee with hashed password
        const newEmployee = new Employee({
            ...otherData,
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        
        const savedEmployee = await newEmployee.save();

        res.status(201).json({
            message: 'Employee registered successfully!',
            employee: {
                id: savedEmployee._id,
                firstName: savedEmployee.firstName,
                lastName: savedEmployee.lastName,
                email: savedEmployee.email
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors
            });
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
            return res.status(409).json({
                message: `Duplicate entry: An employee with that ${field} '${value}' already exists.`,
                errors: { [field]: `This ${field} is already registered.` }
            });
        }
        console.error('Error registering employee:', error);
        res.status(500).json({ message: 'Server error: Failed to register employee.' });
    }
};

exports.loginCompany = async (req, res) => {
    const {email, password} = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
        // Find company by email
        const company = await Company.findOne({ contactEmail: email });
        
        if (!company) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: company._id, type: 'company' }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
            company: {
                id: company._id,
                companyName: company.companyName,
                contactEmail: company.contactEmail
            }
        });
    } catch (error) {
        console.error('Company login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginEmployee = async (req, res) => {
    const {email, password} = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
        // Find employee by email
        const employee = await Employee.findOne({ email: email });
        
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: employee._id, type: 'employee' }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
            employee: {
                id: employee._id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email
            }
        });
    } catch (error) {
        console.error('Employee login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees
    res.json(employees);
    
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.companyDashboard = (req, res) => {
  res.json({ message: "Company dashboard endpoint" });
};

// Example job posting 

exports.companypostjob = async (req, res) => {
  const { title, description, location, salary, companyId } = req.body;
  if (!title || !description || !location || !companyId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    // Save the job
    const job = new Job({ title, description, location, salary, companyId });
    await job.save();

    // Get company name
    let companyName = 'Unknown Company';
    const company = await Company.findById(companyId);
    if (company && company.companyName) companyName = company.companyName;

    // Fetch all employees
    const employees = await Employee.find({});
    // Create notifications for each employee
    const notifications = employees.map(emp => ({
      userId: emp._id,
      message: `New job posted: ${job.title} at ${companyName}`,
      read: false,
      createdAt: new Date()
    }));
    await Notification.insertMany(notifications);

    res.json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//list of all jobs
exports.companyalljobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs) {
      return res.status(404).json({ error: "No jobs found" });
    }

    const populatedJobs = await Promise.all(jobs.map(async (job) => {
      const jobObj = job.toObject();

      // Populate company information
      if (job.companyId) {
        try {
          const company = await Company.findById(job.companyId);
          jobObj.companyName = company ? company.companyName : 'Unknown Company';
        } catch (error) {
          console.error('Error fetching company:', error);
          jobObj.companyName = 'Unknown Company';
        }
      } else {
        jobObj.companyName = 'Unknown Company';
      }

      // Unique applicants
      if (job.applicants && job.applicants.length > 0) {
  const uniqueApplicantIds = new Set(
    job.applicants
      .filter(id => id) // <-- This line fixes the error
      .map(id => id.toString())
  );
  jobObj.applicants = Array.from(uniqueApplicantIds).map(id => ({ _id: id }));
} else {
  jobObj.applicants = [];
}

      return jobObj;
    }));

    res.json(populatedJobs);
  } catch (err) {
    console.error('Error in companyalljobs:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};


// Employee applies for a job
exports.applyToJob = async (req, res) => {
  const { jobId, employeeId } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.applicants.includes(employeeId)) {
      return res.status(400).json({ error: "Already applied" });
    }
    job.applicants.push(employeeId);
    await job.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//total applicants
exports.Applicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('applicants');
    console.log('Requested jobId:', jobId);
     if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    
    // Remove duplicate applicants by creating a Set of unique IDs
    const uniqueApplicants = [];
    const applicantIds = new Set();
    
    if (job.applicants && job.applicants.length > 0) {
      job.applicants.forEach(applicant => {
        const applicantId = applicant._id.toString();
        if (!applicantIds.has(applicantId)) {
          applicantIds.add(applicantId);
          uniqueApplicants.push(applicant);
        }
      });
    }
    
    res.json({
      applicants: uniqueApplicants,
      title: job.title
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Company creates a contest from stored questions
exports.createContest = async (req, res) => {
  try {
    const { title, description, companyId, jobId, questionIds, startTime, endTime } = req.body;
    if (!title || !companyId || !jobId || !Array.isArray(questionIds) || questionIds.length === 0 || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Validate questions exist
    const questions = await Question.find({ _id: { $in: questionIds } });
    if (questions.length !== questionIds.length) {
      return res.status(400).json({ error: 'Some questions not found' });
    }
    const contest = new Contest({
      title,
      description,
      companyId,
      jobId,
      questions: questionIds,
      startTime,
      endTime
    });
    await contest.save();

    // Fetch applicants for the job
    const job = await Job.findById(jobId).populate('applicants');
    if (job && job.applicants && job.applicants.length > 0) {
      for (const applicant of job.applicants) {
        if (applicant.email) {
          await sendMail({
            to: applicant.email,
            subject: `New Contest: ${title}`,
            text: `A new contest has been created for the job you applied to. Contest: ${title}. Please check the platform for details.`
          });
        }
      }
    }

    res.status(201).json({ message: 'Contest created and emails sent to applicants', contest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions (for contest creation UI)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    console.log('[DEBUG] getAllQuestions found', questions.length, 'questions');
    if (questions.length === 0) {
      console.log('[DEBUG] No questions found. Check DB connection and seeding.');
    }
    res.json(questions);
  } catch (err) {
    console.error('[DEBUG] Error in getAllQuestions:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all contests (for admin/company view)
exports.getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate('questions').populate('companyId', 'companyName');
    res.json(contests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get contest by ID (for employee to participate)
exports.getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate('questions').populate('companyId', 'companyName');
    if (!contest) return res.status(404).json({ error: 'Contest not found' });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ContestSubmission = require('../../models/contestSubmission');
// Employee submits answers for a contest
exports.submitContestAnswers = async (req, res) => {
  try {
    const { contestId, employeeId, answers } = req.body;
    // answers: { [questionId]: selectedOption }
    if (!contestId || !employeeId || !answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const contest = await Contest.findById(contestId).populate('questions');
    if (!contest) return res.status(404).json({ error: 'Contest not found' });
    // Prevent multiple submissions
    const existing = await ContestSubmission.findOne({ contestId, employeeId });
    if (existing) {
      return res.status(400).json({ error: 'You have already submitted this contest.' });
    }
    // Calculate score
    let score = 0;
    const results = contest.questions.map(q => {
      const userAnswer = answers[q._id.toString()];
      const correct = userAnswer && userAnswer === q.answer;
      if (correct) score++;
      return {
        questionId: q._id,
        selectedOption: userAnswer || null,
        correctAnswer: q.answer,
        isCorrect: correct
      };
    });
    // Save submission
    await ContestSubmission.create({
      contestId,
      employeeId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
      score
    });
    res.json({ score, total: contest.questions.length, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

