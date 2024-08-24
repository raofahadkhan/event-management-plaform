import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import Event from "../../models/Event";

// ================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR GETTING USER'S RESERVED EVENTS
// ================================================================

const reservedEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // ================================================================
    // GETTING RESERVED EVENTS TO CLIENT IF NOT FOUND RAISING EXCEPTION
    // ================================================================
    
    const reservedEvents = await Event.find({ reservedBy: userId });

    if (!reservedEvents) {
      return res.status(404).json({ error: "Events not found."})
    }

    // ================================================================
    // SENDING THE RESERVED EVENTS TO CLIENT
    // ================================================================

    return res.status(200).json(reservedEvents);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default reservedEvents;
