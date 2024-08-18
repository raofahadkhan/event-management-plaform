import { Response } from 'express';
import Event from '../../models/Event';
import mongoose from 'mongoose';
import { AuthRequest } from '../../middleware/authMiddleware';

// ================================================================
// THIS CONTROLLER IS REPONSIBLE FOR RESERVING A EVENT SEAT
// ================================================================

const reserveSeat = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId;

    // ================================================================
    // CHECK IS EVENT ID IS PASSED IN THE PARAMS
    // ================================================================

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    // ================================================================
    // GETTING THE EVENT FROM DATABASE
    // ================================================================

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const event = await Event.findById(eventId);

    // ================================================================
    // IF EVENT NOT FOUND RAISE EXCEPTION
    // ================================================================

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // ================================================================
    // CHECKING ARE THERE AVAIALBE SEATS IN THIS EVENT.
    // ================================================================

    if (event.totalSeats <= event.reservedSeats) {
      return res.status(400).json({ error: 'No seats available for this event.' });
    }

    // ================================================================
    // CHECKING IS USER ALREADY RESERVED A SEAT IN THIS EVENT.
    // ================================================================
    
    if (event.reservedBy.includes(userObjectId)) {
      return res.status(400).json({ error: 'You have already reserved a seat for this event.' });
    }

    // ================================================================
    // RESERVING A SEAT AND SAVING TO DATABASE
    // ================================================================
    event.reservedSeats += 1;
    event.reservedBy.push(userObjectId);
    await event.save();

    return res.status(200).json({ message: 'Seat reserved successfully.', event });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export default reserveSeat