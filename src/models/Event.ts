// =======================================================================
// THIS IS EVENT SCHEMA WHERE WE'LL STORE ALL OF THE EVENTS RELATED
// =======================================================================

import { Schema, model, Document, Types } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  seatsAvailable: number;
  createdBy: Types.ObjectId;
  reservedSeats: number;
  reservedBy: Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    reservedSeats: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reservedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Event = model<IEvent>("Event", eventSchema);
export default Event;
