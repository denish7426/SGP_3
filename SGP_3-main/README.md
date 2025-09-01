# DomaiNetHire Admin System

A comprehensive admin dashboard for monitoring platform activity, managing users and companies, and generating analytics reports.

## Features

### 🔐 **Admin Authentication**
- **Login Only**: Single admin login (no public registration)
- **Role-Based Access**: Super Admin, Admin, and Moderator roles
- **Permission System**: Granular control over admin capabilities

### 📊 **Dynamic Analytics Dashboard**
- **Real-Time Counts**: Live tracking of users, companies, and employees
- **Registration Tracking**: Automatic logging of all new registrations
- **Time-Based Metrics**: Weekly, monthly, and yearly statistics
- **Recent Activity**: Latest registrations and platform activity

### 👥 **User Management**
- View all registered users
- Update user status (active/suspended)
- Search and filter users
- User activity monitoring

### 🏢 **Company Management**
- Monitor company registrations
- Company profile verification
- Industry and contact information tracking
- Approval/rejection workflows

### 🚨 **Content Moderation**
- Content report management
- Priority-based sorting
- Action tracking (remove, suspend, dismiss)
- Assignment and resolution workflows

### 📈 **Advanced Analytics**
- Registration trends over time
- Platform usage statistics
- Error logging and monitoring
- Custom metric tracking

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/sgp3
JWT_SECRET=your-secret-key-here
PORT=3000
```

## Initial Admin Setup

### Option 1: Using the Setup Script
```bash
cd backend
npm run setup-admin
```

This will create a default admin user:
- **Email**: admin@sgp.com
- **Password**: admin123
- **Role**: super_admin

### Option 2: Manual Database Setup
```bash
# Connect to MongoDB
mongosh

# Use your database
use sgp3

# Insert admin user (password will be hashed)
db.admins.insertOne({
  username: "superadmin",
  email: "admin@sgp.com",
  password: "hashed-password-here",
  role: "super_admin",
  permissions: {
    userManagement: true,
    companyManagement: true,
    contentModeration: true,
    analytics: true,
    systemSettings: true
  },
  isActive: true,
  createdAt: new Date()
})
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Access Admin Panel
Navigate to `/admin/login` and use the credentials from the setup.

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login

### Protected Routes (require admin token)
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/status` - Update user status
- `GET /api/admin/companies` - Get all companies
- `GET /api/admin/reports` - Get content reports
- `GET /api/admin/analytics` - Get platform analytics

## Database Models

### Admin Model
- Username, email, password
- Role-based permissions
- Activity tracking

### Analytics Model
- Metric tracking (registrations, logins, reports)
- Timestamp and metadata
- User association

### Content Moderation Model
- Report categorization
- Priority levels
- Resolution tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for all passwords
- **Permission Validation**: Middleware-based access control
- **Input Validation**: Request data sanitization
- **Rate Limiting**: Protection against brute force attacks

## Customization

### Adding New Metrics
1. Update the `analytics.js` model enum
2. Add tracking middleware to relevant routes
3. Update the admin controller to include new metrics
4. Modify the dashboard UI to display new data

### Role Permissions
Modify the permission structure in `adminControllers.js`:
```javascript
permissions: {
    userManagement: true,
    companyManagement: true,
    contentModeration: true,
    analytics: true,
    systemSettings: true,
    // Add new permissions here
    customFeature: true
}
```

## Troubleshooting

### Common Issues

1. **Server Error 500**
   - Check MongoDB connection
   - Verify environment variables
   - Check server logs

2. **Admin Login Fails**
   - Ensure admin user exists in database
   - Verify password hash
   - Check JWT secret configuration

3. **Analytics Not Loading**
   - Verify database collections exist
   - Check middleware integration
   - Ensure proper error handling

### Debug Mode
Enable detailed logging by setting:
```env
DEBUG=true
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For technical support or questions:
- Check the troubleshooting section
- Review server logs
- Verify database connectivity
- Ensure all dependencies are installed

---

**Note**: This admin system is designed for internal use only. Ensure proper security measures are in place before deploying to production.