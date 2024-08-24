import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../../models/User';

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR RESETTING THE USER'S PASSWORD
// =======================================================================

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    // =======================================================================
    // 1. CHECKING IF THE REQUIRED DATA PASSED IN THE BODY
    // =======================================================================

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Email, otp and newPassword is required!'})
    }

    // =======================================================================
    // 2. CHECKING IS THE USER WITH THIS EMAIL EXISTS
    // =======================================================================

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // =======================================================================
    // 3. CHECKING IS THE PROVIDED OTP VALID
    // =======================================================================

    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    // =======================================================================
    // 4. HASHING THE NEW PASSWORD AND SAVING IT TO DATABASE
    // =======================================================================
 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default resetPassword