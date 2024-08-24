import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
dotenv.config()

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR REFRESHING THE ACCESS TOKEN
// =======================================================================

const refreshAccessToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
  
      // =======================================================================
      // 1. CHECKING IS THE REQUIRED DATA IS PASSED IN THE BODY
      // =======================================================================
      
      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required.' });
      }
        
      // =======================================================================
      // 2. VERIFYING THE REFRESH TOKEN IS VALID JWT TOKEN
      // =======================================================================

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };

      // =======================================================================
      // 3. CHECKING IS THE USER EXISTS IN DATABASE AND THE REFRESH TOKEN IS
      //    ASSOCITATED TO THE USER 
      // =======================================================================
     
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ error: 'Invalid refresh token.' });
      }
      
      // =======================================================================
      // 4. GENERATING NEW ACCESS TOKEN AND SENDING IT TO CLIENT
      // =======================================================================

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error:any) {

      // =======================================================================
      // 5. CHECKING IF THE REFRESH TOKEN IS EXIPRED THAN SEND THE SPECIFIC RESPONSE
      // =======================================================================

      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ error: 'Refresh token is expired. Please re-login.' });
      }

      return res.status(500).json({ error: 'Internal server error.' });
    }
};
  
export default refreshAccessToken