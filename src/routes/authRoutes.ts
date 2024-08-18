// =======================================================================
//  THIS FILE HAS ALL OF THE ROUTES OF AUTHENTICATION
// =======================================================================

import express from "express";
import registerUser from "../controllers/auth/register";
import sendOtp from "../controllers/auth/sendOtp";
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
