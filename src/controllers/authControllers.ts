
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
// 1. THIS CONTROLLER IS RESPONSIBLE TO REGISTER THE USER 
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
// 2. THIS CONTROLLER IS RESPONSIBLE FOR SENDING OTP FOR USER VERIFICATION
// =======================================================================

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // =======================================================================
    // CHECKING IF THE USER EXISTS IN DB
    // =======================================================================

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // =======================================================================
    // GENERATING OTP AND ITS EXPIRY TIME AND SAVING IT TO THE DATABASE
    // =======================================================================

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // =======================================================================
    // SENDING OTP IN EMAIL TO USER THROUGH NODE MAILER
    // =======================================================================

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending OTP email.' });
      }
      return res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};