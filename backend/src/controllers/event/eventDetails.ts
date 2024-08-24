import { Request, Response } from "express";
import Event from "../../models/Event";

// ================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR GETTING EVENT DETAILS
// ================================================================

const getEventDetails = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;

    // ================================================================
    // CHECKING IS THE EVENT ID IS PASSED IN THE PARAMS OR NOT.
    // ================================================================

    if (!eventId) {
      return res.status(400).json({ error: "Event Id is required." });
    }

    // ================================================================
    // GETTING THE EVENT FROM DATABASE. IF NOT FOUND THAN RAISING
    // EXCEPTION. IF FOUND THEN SENDING THE RESPONSE TO CLIENT
    // ================================================================

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default getEventDetails;
