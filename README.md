# Authentication App with React Frontend and Node.js Backend

A complete authentication system with login and registration functionality built with React frontend and Node.js/Express backend.

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Protected routes
- ✅ Modern UI with Tailwind CSS
- ✅ MongoDB database integration
- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd sgp-sem5
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (optional):
```env
MONGO_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system. If using MongoDB Atlas, update the connection string in the backend.

### 2. Start the Backend Server
```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000`

### 3. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Test Route
- `GET /test` - Test if server is running

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. You'll see the login page
3. Click "Sign Up" to create a new account
4. Fill in the registration form with:
   - Username
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
5. After successful registration, you'll be redirected to the dashboard
6. You can also login with existing credentials
7. Use the logout button to sign out

## Project Structure

```
├── backend/
│   ├── auth/
│   │   ├── controller/
│   │   │   └── authControllers.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   └── user.js
│   │   └── routes/
│   │       └── authroutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── pages/
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── Register/
│   │   │   └── register.jsx
│   │   └── Dashboard/
│   │       └── Dashboard.jsx
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- cors for cross-origin requests

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Vite for build tooling

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS configuration
- Protected routes

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **Port Already in Use**: Change the PORT in the .env file or kill the process using the port
3. **CORS Error**: The backend is configured to allow requests from `http://localhost:5173`

## License

This project is for educational purposes.