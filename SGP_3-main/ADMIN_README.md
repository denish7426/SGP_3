# Admin System for SGP Platform

This document describes the comprehensive admin system built for the SGP platform, providing administrators with tools to monitor platform activity, manage users, moderate content, and generate analytics reports.

## Features

### 🔐 Authentication & Authorization
- **Secure Admin Login**: JWT-based authentication with bcrypt password hashing
- **Role-Based Access Control**: Super Admin, Admin, and Moderator roles
- **Permission System**: Granular permissions for different admin functions
- **Session Management**: Secure token-based sessions with expiration

### 👥 User Management
- **User Overview**: View all registered users with search and pagination
- **Status Management**: Activate/deactivate user accounts
- **User Details**: Access comprehensive user information
- **Bulk Operations**: Manage multiple users simultaneously

### 🏢 Company Management
- **Company Directory**: View all registered companies
- **Verification System**: Approve or reject company registrations
- **Profile Monitoring**: Track company profile updates
- **Industry Analytics**: Company distribution by industry

### 🚩 Content Moderation
- **Report Management**: Handle user-reported content
- **Priority System**: Urgent, High, Medium, Low priority levels
- **Assignment System**: Assign reports to specific admins
- **Resolution Tracking**: Track moderation actions and outcomes
- **Content Types**: User profiles, company profiles, job postings, messages, reviews

### 📊 Analytics & Reporting
- **Platform Metrics**: User registrations, company growth, activity levels
- **Time-based Analysis**: 24h, 7d, 30d, 90d reporting periods
- **Trend Analysis**: Growth patterns and platform usage statistics
- **Export Functionality**: Generate reports in various formats

### ⚙️ System Administration
- **Maintenance Mode**: Enable/disable platform access
- **Registration Controls**: Manage user registration settings
- **Security Settings**: Password policies, session timeouts
- **System Monitoring**: Performance and error tracking

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/sgp3
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   ```

4. **Set up initial admin user**:
   ```bash
   npm run setup-admin
   ```
   This creates a default admin account:
   - Email: `admin@sgp.com`
   - Password: `admin123`
   - Role: `super_admin`

5. **Start the backend server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### User Management
- `GET /api/admin/users` - Get all users (with pagination and search)
- `PATCH /api/admin/users/:id/status` - Update user status

### Company Management
- `GET /api/admin/companies` - Get all companies (with pagination and search)

### Content Moderation
- `GET /api/admin/reports` - Get content reports (with filtering)

### Analytics
- `GET /api/admin/analytics` - Get platform analytics

## Database Models

### Admin Model
```javascript
{
  username: String,
  email: String,
  password: String,
  role: ['super_admin', 'admin', 'moderator'],
  permissions: {
    userManagement: Boolean,
    companyManagement: Boolean,
    contentModeration: Boolean,
    analytics: Boolean,
    systemSettings: Boolean
  },
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Content Moderation Model
```javascript
{
  contentType: ['user_profile', 'company_profile', 'job_posting', 'message', 'review'],
  contentId: ObjectId,
  reportedBy: ObjectId,
  reason: ['inappropriate_content', 'spam', 'fake_information', 'harassment', 'copyright_violation', 'other'],
  description: String,
  status: ['pending', 'under_review', 'resolved', 'dismissed'],
  assignedTo: ObjectId,
  priority: ['low', 'medium', 'high', 'urgent'],
  resolution: {
    action: ['warning', 'content_removal', 'account_suspension', 'account_ban', 'no_action'],
    notes: String,
    resolvedBy: ObjectId,
    resolvedAt: Date
  }
}
```

### Analytics Model
```javascript
{
  metric: ['user_registration', 'company_registration', 'login_attempts', 'content_reports', 'moderation_actions', 'platform_usage', 'error_logs'],
  value: Mixed,
  timestamp: Date,
  metadata: Map,
  userId: ObjectId,
  userModel: ['User', 'Company', 'Employee', 'Admin']
}
```

## Usage Guide

### Accessing the Admin Portal

1. Navigate to `/admin/login` in your browser
2. Use the credentials created during setup:
   - Email: `admin@sgp.com`
   - Password: `admin123`

### Dashboard Overview

The admin dashboard provides:
- **Real-time Metrics**: User counts, company registrations, content reports
- **Quick Actions**: Common administrative tasks
- **Recent Activity**: Latest platform events
- **Navigation**: Access to all admin functions

### Managing Users

1. Navigate to the **Users** tab
2. Use search and filters to find specific users
3. Click on user entries to view details
4. Use status controls to activate/deactivate accounts
5. Add notes for moderation actions

### Content Moderation

1. Navigate to the **Moderation** tab
2. Review pending reports by priority
3. Assign reports to team members
4. Take appropriate action (warning, removal, suspension, ban)
5. Document resolution notes

### Generating Reports

1. Navigate to the **Analytics** tab
2. Select desired time period
3. Choose metrics to include
4. Export data in preferred format
5. Schedule recurring reports

## Security Considerations

### Authentication
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt with salt rounds of 12
- Admin sessions are validated on every request

### Authorization
- Role-based access control prevents unauthorized access
- Permission system ensures admins only access allowed functions
- API endpoints are protected by middleware

### Data Protection
- Sensitive user data is filtered in responses
- Admin actions are logged for audit trails
- Rate limiting prevents abuse

## Customization

### Adding New Admin Roles
1. Update the `role` enum in the Admin model
2. Add corresponding permissions
3. Update middleware to handle new roles
4. Modify frontend to display new options

### Extending Permissions
1. Add new permission fields to the Admin model
2. Update the permission middleware
3. Modify controllers to check new permissions
4. Update frontend UI accordingly

### Custom Analytics
1. Add new metric types to the Analytics model
2. Create controllers for new analytics
3. Implement data collection logic
4. Build frontend visualizations

## Troubleshooting

### Common Issues

**Admin login fails**
- Verify MongoDB connection
- Check if admin user exists
- Ensure JWT_SECRET is set

**Permission denied errors**
- Verify admin role and permissions
- Check middleware configuration
- Ensure proper token authentication

**Analytics not loading**
- Check MongoDB indexes
- Verify data collection logic
- Check API endpoint responses

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
NODE_ENV=development
```

## Support

For technical support or feature requests:
- Create an issue in the project repository
- Contact the development team
- Check the troubleshooting section above

## License

This admin system is part of the SGP platform and follows the same licensing terms.

---

**Note**: Always change the default admin password after first login for security purposes.
