const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true, // Remove whitespace from both ends of a string
        unique: true // Ensure company names are unique
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    website: {
        type: String,
        trim: true,
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please fill a valid website URL']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    address: {
        street: { type: String, required: [true, 'Street address is required'], trim: true },
        city: { type: String, required: [true, 'City is required'], trim: true },
        state: { type: String, required: [true, 'State/Province is required'], trim: true },
        postalCode: { type: String, required: [true, 'Postal code is required'], trim: true },
        country: { type: String, required: [true, 'Country is required'], trim: true }
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
        trim: true,
        lowercase: true, // Store emails in lowercase
        unique: true, // Ensure email addresses are unique
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        // Optional: Add regex for phone number validation if needed
    },
    // Add timestamps for automatic creation and update dates
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true, // Ensure employee emails are unique
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    currentRole: {
        type: String,
        trim: true
    },
    yearsOfExperience: {
        type: Number,
        min: [0, 'Years of experience cannot be negative']
    },
    skills: {
        type: [String], // Array of strings for skills
        default: []
    },
    preferredDomains: {
        type: [String], // Array of strings for preferred job domains
        default: []
    },
    resumeLink: { // If you plan to store resume URLs (e.g., from AWS S3/Cloudinary)
        type: String,
        trim: true
    },
    // You could add a reference to the company if an employee belongs to one
    // company: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Company'
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Example Job Schema (if needed for job postings)

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  salary: String,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true
  },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  createdAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);
const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Job = mongoose.model('Job', jobSchema)
module.exports = {User, Company, Employee, Job};