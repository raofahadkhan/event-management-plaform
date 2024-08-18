// =======================================================================
// AUTHENTICATION MIDDLEWARE FOR CHECKING IS THE USER AUTHENTICATED?
// =======================================================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: string;
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // ==============================================================================
    // GETTING THE TOKEN FROM THE HEADERS IF THE TOKEN DOESN'T EXISTS DENY THE ACCESS
    // ==============================================================================

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied.' });
    }

    // ==============================================================================
    // VERIFY THE ACCESS TOKEN IF VERIFIED THAN PASS THE USER_ID TO THE NEXT FUNCTION
    // ==============================================================================
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
  }
};
