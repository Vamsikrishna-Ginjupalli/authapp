# Secure Authentication System

A full-stack authentication system built with Svelte, Express, and MongoDB.

## Features

- User Authentication (Login/Register)
- Password Reset
- Dashboard with Multiple Pages
- Profile Management
- Responsive Design

## Tech Stack

- Frontend: Svelte + Vite
- Backend: Express.js
- Database: MongoDB
- Authentication: JWT
- Password Hashing: bcrypt

## Project Structure

```
├── src/
│   ├── components/     # UI components
│   ├── lib/           # Utilities and API
│   └── utils/         # Helper functions
├── server/            # Backend API
└── public/            # Static assets
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Start the backend server:
   ```bash
   npm run server
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=your_jwt_secret
```"# authapp" 
"# authapp" 
