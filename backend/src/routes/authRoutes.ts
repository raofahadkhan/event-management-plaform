// =======================================================================
//  THIS FILE HAS ALL OF THE ROUTES OF AUTHENTICATION
// =======================================================================

import express from "express";
import registerUser from "../controllers/auth/register";
import sendOtp from "../controllers/auth/sendOtp";
import verifyUser from "../controllers/auth/verifyUser";
import forgotPassword from "../controllers/auth/forgetPassword";
import resetPassword from "../controllers/auth/reset-password";
import loginUser from "../controllers/auth/login";
import refreshAccessToken from "../controllers/auth/refreshAccessToken";
const router = express.Router();

// =======================================================================
// 1. USER REGISTRATION ROUTE
// =======================================================================

router.post("/register", registerUser);

// =======================================================================
// 2. SEND OTP (ONE TIME PASSWORD) ROUTE
// =======================================================================

router.post("/send-otp", sendOtp);

// =======================================================================
// 3. VERIFY USER ROUTE
// =======================================================================

router.post("/verify-user", verifyUser);

// =======================================================================
// 4. FORGET PASSWORD ROUTE
// =======================================================================

router.post("/forget-password", forgotPassword);

// =======================================================================
// 5. RESET PASSWORD ROUTE
// =======================================================================

router.post("/reset-password", resetPassword);

// =======================================================================
// 6. LOGIN ROUTE
// =======================================================================

router.post("/login", loginUser);

// =======================================================================
// 7. REFRESH ACCESS TOKEN ROUTE
// =======================================================================

router.post("/refresh-access-token", refreshAccessToken)

export default router;
