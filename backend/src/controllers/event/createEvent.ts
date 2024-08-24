import { Response } from 'express';
import Event from '../../models/Event';
import { AuthRequest } from '../../middleware/authMiddleware';

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR CREATE EVENT OPERATION
// =======================================================================

const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, totalSeats } = req.body;
    
    // =======================================================================
    // 1. CHECKING THE REQUIRED DATA IS PASSED IN THE BODY OR NOT.
    // =======================================================================

    if (!title || !description || !date || !totalSeats) {
      return res.status(400).json({ error: "Required data is missing."})
    }

    // =======================================================================
    // 2. GETTING THE USER_ID FROM REQUEST PASSED BY THE AUTHENTICATION
    //    MIDDLEWARE AND SAVING THE EVENT TO DATABASE
    // =======================================================================

    const userId = req.userId;

    const event = new Event({
      title,
      description,
      date,
      totalSeats,
      createdBy: userId,
    });

    await event.save();

    return res.status(201).json({ message: 'Event created successfully.', event });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default createEvent