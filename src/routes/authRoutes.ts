// =======================================================================
//  THIS FILE HAS ALL OF THE ROUTES OF AUTHENTICATION
// =======================================================================

import express from "express";
import registerUser from "../controllers/auth/register";
import sendOtp from "../controllers/auth/sendOtp";
import verifyUser from "../controllers/auth/verifyUser";
const router = express.Router();

// =======================================================================
// 1. USER REGISTRATION ROUTE
// =======================================================================

router.post("/register", registerUser);

// =======================================================================
// 2. SEND OTP (ONE TIME PASSWORD) ROUTE
// =======================================================================

router.post("/send-otp", sendOtp)

// =======================================================================
// 3. VERIFY USER ROUTE
// =======================================================================

router.post("/verify-user", verifyUser)

export default router;
