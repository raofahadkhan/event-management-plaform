import { Request, Response } from "express";
import Event from "../../models/Event";

// =======================================================================
// THIS CONTROLLER IS RESPONSIBLE FOR GETTING THE LIST OF EVENTS
// =======================================================================

const listEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default listEvents