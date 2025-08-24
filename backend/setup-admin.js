const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./auth/models/admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sgp3';

async function setupAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@sgp.com' });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists');
            console.log('📧 Email: admin@sgp.com');
            console.log('🔑 Password: admin123');
            process.exit(0);
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 12);

        const admin = new Admin({
            username: 'superadmin',
            email: 'admin@sgp.com',
            password: hashedPassword,
            role: 'super_admin',
            permissions: {
                userManagement: true,
                companyManagement: true,
                contentModeration: true,
                analytics: true,
                systemSettings: true
            },
            isActive: true
        });

        await admin.save();
        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@sgp.com');
        console.log('🔑 Password: admin123');
        console.log('⚠️  Please change the password after first login!');

    } catch (error) {
        console.error('❌ Error setting up admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

setupAdmin();
