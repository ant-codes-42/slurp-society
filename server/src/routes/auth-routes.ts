import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

//  REGISTER USER + SEND CONFIRMATION EMAIL
router.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into PostgreSQL
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    //  Send confirmation email
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM, // Verified SendGrid sender email
      subject: 'Welcome to Our App!',
      text: `Thank you for registering, ${email}!`,
      html: `<strong>Thank you for registering, ${email}!</strong>`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: 'User registered successfully! Check your email.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
