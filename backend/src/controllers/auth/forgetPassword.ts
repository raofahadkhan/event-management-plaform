import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import User from '../../models/User';
import generateOTP from '../../utils/generateOtp';

// =======================================================================
// CREATED TRANSPORTER FOR SENDING EMAIL WITH NODE MAILER
// =======================================================================

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR FORGET PASSWORD
// =======================================================================

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // =======================================================================
    // 1. CHECKING IS REQUIRED DATA PASSED IN THE BODY
    // =======================================================================

    if (!email) {
      return res.status(400).json({error: 'Email is required!'})
    }

    // =======================================================================
    // 2. CHECKING IS USER WITH THE EMAIL EXISTS
    // =======================================================================

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // =======================================================================
    // 3. GENERATING OTP AND EXPIRY TIME AND SAVING IT TO DATABASE
    // =======================================================================

    const resetToken = generateOTP(6);

    const resetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = resetToken;
    user.otpExpiry = resetTokenExpiry;
    await user.save();

    // =======================================================================
    // 4. SENDING EMAIL WITH OTP FOR RESET PASSWORD
    // =======================================================================

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your Password Reset Code',
      text: `Your password reset code is ${resetToken}. It is valid for 15 minutes.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending reset token email.' });
      }
      return res.status(200).json({ message: 'Password reset code sent. Please check your email.' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default forgotPassword