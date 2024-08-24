// ====================================================================
// THIS FUNCTION IS RESPONSIBLE FOR GENERATING OTP (ONE TIME PASSWORD)
// ====================================================================

import crypto from "crypto";

const generateOTP = (length: number = 6): string => {
  return crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};

export default generateOTP