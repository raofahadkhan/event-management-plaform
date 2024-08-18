
// =======================================================================
// THIS FILE CONTAINS ALL OF THE CONTROLLERS FOR AUTH
// =======================================================================

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User';
import generateOTP from '../utils/generateOtp';
dotenv.config();

// =======================================================================
// TRANSPORTED FOR NODE_MAILER FOR SENDING EMAILS TO USERS
// =======================================================================

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE TO REGISTER THE USER 
// =======================================================================

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // =======================================================================
    // CHECKING IS REQUIRED DATA IS PASSED IN THE BODY
    // =======================================================================

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // =======================================================================
    // CHECKING IS USER ALREADY EXISTS IN DATABASE 
    // =======================================================================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // =======================================================================
    // HASHING THE PASSWORD FOR ADDED SECURITY
    // =======================================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =======================================================================
    // CREATING OR SAVING THE USER IN THE DATABASE
    // =======================================================================

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // =======================================================================
    // SENDING THE SUCCESS RESPONSE: USER REGISTERED SUCCESSFULLY
    // =======================================================================

    return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
