import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../../models/User';
import dotenv from 'dotenv'
dotenv.config()

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR LOGIN FLOW
// =======================================================================

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // =======================================================================
    // 1. CHECKING IS THE REQUIRED DATA IS PASSED IN THE BODY
    // =======================================================================

    if (!email || !password) {
      return res.status(400).json({error: 'Email and password both are required.'})
    }

    // =======================================================================
    // 2. CHECKING IS THE USER WITH THIS EMAIL EXISTS
    // =======================================================================

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User with this email does not exist.' });
    }

    // =======================================================================
    // 3. CHECKING IS USER EMAIL IS VERIFIED
    // =======================================================================

    if (!user.isVerified) {
      return res.status(400).json({ error: 'Verify your email.' });
    }

    // =======================================================================
    // 4. COMPARING THE PASSWORD PROVIDED BY THE USER WITH THE SAVED IN DB
    // =======================================================================

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // =======================================================================
    // 5. GENERATING ACCESS TOKEN AND REFRESH TOKEN
    // =======================================================================

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

    // =======================================================================
    // 6. SAVING THE REFRESH TOKEN IN DATABASE
    // =======================================================================

    user.refreshToken = refreshToken;
    await user.save();

    // =======================================================================
    // 7. SENDING USER'S DATA WITH ACCESS TOKEN AND REFRESH TOKEN TO CLIENT
    // =======================================================================

    const { _id: user_id, name, email: user_email, role} = user;

    let user_response = { user_id, name, email: user_email, role }
    
    return res.status(200).json({ user: user_response, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default loginUser