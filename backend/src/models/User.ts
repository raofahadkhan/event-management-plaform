// =======================================================================
// THIS FILE IS CONTAINING THE USER MODEL
// =======================================================================

import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required:  true},
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  refreshToken: {type: String}
}, {
  timestamps: true,
});

const User = model<IUser>('User', userSchema);
export default User;
