import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import createEvent from "../controllers/event/createEvent";
import listEvents from "../controllers/event/listEvents";
import getEventDetails from "../controllers/event/eventDetails";
import reserveSeat from "../controllers/event/reserverEventSeat";
import reservedEvents from "../controllers/event/reservedEvents";

const router = express.Router();

// =======================================================================
// 1. CREAT EVENT ROUTE
// =======================================================================

router.post("/create-event", isAuthenticated, createEvent);

// =======================================================================
// 2. LIST EVENT ROUTE
// =======================================================================

router.get("/list-events", listEvents);

// =======================================================================
// 3. GET EVENT DETAILS ROUTE
// =======================================================================

router.get("/:id", getEventDetails);

// =======================================================================
// 4. RESERVE EVENT SEAT ROUTE
// =======================================================================

router.post("/:id/reserve", isAuthenticated, reserveSeat);

// =======================================================================
// 5. GET USER'S RESERVED EVENTS ROUTE
// =======================================================================

router.post("/reserved-events", isAuthenticated, reservedEvents);

export default router;
