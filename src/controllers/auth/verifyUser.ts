import { Request, Response } from 'express';
import User from '../../models/User';

// =======================================================================
// THIS CONTROLLER IS REPONSIBLE FOR USER VERIFICATION
// =======================================================================

const verifyUser = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // =======================================================================
    // CHECKING IS REQUIRED DATA IS PASSED IN THE BODY
    // =======================================================================

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and otp are required.' });
    }

    // =======================================================================
    // CHECKING IS USER EXIST IN DATABASE
    // =======================================================================
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // =======================================================================
    // CHECKING IS USER ALREADY VERIFIED
    // =======================================================================

    if (user.isVerified){
      return res.status(400).json({ error: "User us already verified!"})
    }

    // =======================================================================
    // CHECKING THE OTP EXPIRY
    // =======================================================================

    // Check if the OTP is correct and not expired
    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    // =======================================================================
    // MARKING THE USER AS VERIFIED AND DELETING THE OTP AND ITS EXPIRY TIME
    // =======================================================================
  
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: 'User verified successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default verifyUser