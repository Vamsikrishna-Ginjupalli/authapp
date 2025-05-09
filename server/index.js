import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URI,"======")

const uri = process.env.MONGODB_URI || "empty";

console.log("uri", uri);
// MongoDB Atlas connection
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  createdAt: { type: Date, default: Date.now },
  resetToken: String,
  resetTokenExpiry: Date
});

 

const User = mongoose.model('User', userSchema);

// // Serve static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../dist')));
// }
//mongodb+srv://vamsikrishnatess:Vamsi9999@authapp.rci8odw.mongodb.net/MYAUTHAPP
// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;
    console.log(firstName,"==")
    
    const existingUser = await User.findOne({ email });
    console.log(existingUser,"====")
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile
    });

    console.log(user,"]]")

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to request reset
app.post('/api/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const resetLink = `http://localhost:5173/reset/${token}`;
  console.log(`Reset link: ${resetLink}`); // DEV ONLY

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password and email.</p>`
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to send email' });
    res.json({ message: 'Reset link sent to email' });
  });
});

// Route to reset password using token
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newEmail, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  if (newEmail) user.email = newEmail;

  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Email and password updated successfully' });
});


app.get('/api/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});


// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));