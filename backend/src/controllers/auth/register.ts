import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import User from '../../models/User';
dotenv.config();

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE TO REGISTER THE USER 
// =======================================================================

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // =======================================================================
    // 1. CHECKING IS REQUIRED DATA IS PASSED IN THE BODY
    // =======================================================================

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, role and password are required.' });
    }

    // =======================================================================
    // 2. CHECKING IS USER ALREADY EXISTS IN DATABASE 
    // =======================================================================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // =======================================================================
    // 3. HASHING THE PASSWORD FOR ADDED SECURITY
    // =======================================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =======================================================================
    // 4. CREATING OR SAVING THE USER IN THE DATABASE
    // =======================================================================

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role
    });
    await user.save();

    // =======================================================================
    // 5. SENDING THE SUCCESS RESPONSE: USER REGISTERED SUCCESSFULLY
    // =======================================================================

    return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default registerUser