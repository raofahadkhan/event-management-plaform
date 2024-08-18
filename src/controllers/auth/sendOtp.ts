import dotenv from 'dotenv';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import User from "../../models/User";
import generateOTP from "../../utils/generateOtp";
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
  // THIS CONTROLLER IS RESPONSIBLE FOR SENDING OTP FOR USER VERIFICATION
  // =======================================================================
  
  const sendOtp = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // =======================================================================
      // 1. CHECKING IS REQUIRED DATA IS PASSED IN THE BODY
      // =======================================================================

      if (!email) {
        return res.status(400).json({ error: 'email is required.' });
      }
  
      // =======================================================================
      // 2. CHECKING IF THE USER EXISTS IN DB
      // =======================================================================
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User with this email does not exist.' });
      }
  
      // =======================================================================
      // 3. GENERATING OTP AND ITS EXPIRY TIME AND SAVING IT TO THE DATABASE
      // =======================================================================
  
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
  
      // =======================================================================
      // 4. SENDING OTP IN EMAIL TO USER THROUGH NODE MAILER
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

  export default sendOtp