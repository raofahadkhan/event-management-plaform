// =======================================================================
//  THIS FILE HAS ALL OF THE ROUTES OF AUTHENTICATION
// =======================================================================

import express from "express";
import { registerUser, sendOtp } from "../controllers/authControllers";

const router = express.Router();

// =======================================================================
// 1. USER REGISTRATION ROUTE
// =======================================================================

router.post("/register", registerUser);

// =======================================================================
// 2. SEND OTP (ONE TIME PASSWORD) ROUTE
// =======================================================================

router.post("/send-otp", sendOtp)

export default router;
