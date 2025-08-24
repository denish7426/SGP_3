const {User, Company, Employee} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';

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


