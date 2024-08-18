// =======================================================================
//  THIS FILE HAS ALL OF THE ROUTES OF AUTHENTICATION
// =======================================================================

import express from "express";
import { registerUser } from "../controllers/authControllers";

const router = express.Router();

router.post("/register", registerUser);

export default router;
